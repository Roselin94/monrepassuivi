import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { createAppServer } from "../server.js";

let server;
let baseUrl;
let temporaryDirectory;
let adminCookie;
let customerCookie;

before(async () => {
  temporaryDirectory = await mkdtemp(path.join(tmpdir(), "douceur-backend-"));
  server = await createAppServer({
    dataFile: path.join(temporaryDirectory, "app-data.json"),
    adminEmail: "manager@example.com",
    adminPassword: "team-password-123",
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "manager@example.com", password: "team-password-123" }),
  });
  adminCookie = loginResponse.headers.get("set-cookie").split(";")[0];
  const customerResponse = await fetch(`${baseUrl}/api/customer/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Table Client", email: "table-client@example.com", password: "table-password-123" }),
  });
  customerCookie = customerResponse.headers.get("set-cookie").split(";")[0];
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await rm(temporaryDirectory, { recursive: true, force: true });
});

test("publishes XAF data and serves the application", async () => {
  const [bootstrapResponse, pageResponse, privateFileResponse] = await Promise.all([
    fetch(`${baseUrl}/api/bootstrap`),
    fetch(baseUrl),
    fetch(`${baseUrl}/server.js`),
  ]);
  const bootstrap = await bootstrapResponse.json();

  assert.equal(bootstrapResponse.status, 200);
  assert.equal(bootstrap.currency, "XAF");
  assert.equal(bootstrap.restaurant.name, "ANA MARIE PATISSERIE");
  assert.equal(bootstrap.products.find((product) => product.id === "eclair").price, 2100);
  assert.equal("orders" in bootstrap, false);
  assert.equal("tableStatuses" in bootstrap, false);
  assert.equal("sessions" in bootstrap, false);
  const unauthorizedAdminState = await fetch(`${baseUrl}/api/admin/bootstrap`);
  assert.equal(unauthorizedAdminState.status, 401);
  const adminState = await fetch(`${baseUrl}/api/admin/bootstrap`, { headers: { cookie: adminCookie } });
  assert.equal(adminState.status, 200);
  assert.ok(Array.isArray((await adminState.json()).orders));
  assert.equal(pageResponse.status, 200);
  assert.match(await pageResponse.text(), /ANA MARIE PATISSERIE/);
  assert.equal(privateFileResponse.status, 404);
});

test("prices orders from the server and persists allowed status changes", async () => {
  const createResponse = await fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: customerCookie },
    body: JSON.stringify({
      table: 7,
      items: [{ productId: "eclair", quantity: 2, price: 1 }],
      note: "Sans sucre",
    }),
  });
  const order = await createResponse.json();

  assert.equal(createResponse.status, 201);
  assert.equal(order.items[0].price, 2100);
  assert.equal(order.items[0].quantity, 2);

  const invalidTransition = await fetch(`${baseUrl}/api/orders/${order.id}/status`, {
    method: "PATCH",
    headers: { "content-type": "application/json", cookie: adminCookie },
    body: JSON.stringify({ status: "ready" }),
  });
  assert.equal(invalidTransition.status, 409);

  const transition = await fetch(`${baseUrl}/api/orders/${order.id}/status`, {
    method: "PATCH",
    headers: { "content-type": "application/json", cookie: adminCookie },
    body: JSON.stringify({ status: "preparing" }),
  });
  assert.equal((await transition.json()).status, "preparing");
});

test("lets a customer register, sign in, and see only their own orders", async () => {
  const registerResponse = await fetch(`${baseUrl}/api/customer/register`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-proto": "https" },
    body: JSON.stringify({ name: "Client Test", email: "client@example.com", password: "motdepasse123" }),
  });
  const sessionCookie = registerResponse.headers.get("set-cookie");
  const cookie = sessionCookie.split(";")[0];
  const customer = await registerResponse.json();

  assert.equal(registerResponse.status, 201);
  assert.equal(customer.customer.email, "client@example.com");
  assert.equal("passwordHash" in customer.customer, false);
  assert.match(sessionCookie, /HttpOnly/);
  assert.match(sessionCookie, /Secure/);

  const createResponse = await fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: JSON.stringify({ table: 4, items: [{ productId: "eclair", quantity: 1 }], note: "" }),
  });
  const order = await createResponse.json();
  const ownOrdersResponse = await fetch(`${baseUrl}/api/customer/orders`, { headers: { cookie } });
  const ownOrders = await ownOrdersResponse.json();
  const unauthorizedResponse = await fetch(`${baseUrl}/api/customer/orders`);
  const customerAdminStateResponse = await fetch(`${baseUrl}/api/admin/bootstrap`, { headers: { cookie } });
  const customerMutationResponse = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "content-type": "application/json", cookie },
    body: JSON.stringify({ name: "Intrusion" }),
  });

  assert.equal(createResponse.status, 201);
  assert.equal("customerId" in order, false);
  assert.equal(ownOrdersResponse.status, 200);
  assert.deepEqual(ownOrders.map((item) => item.id), [order.id]);
  assert.equal(unauthorizedResponse.status, 401);
  assert.equal(customerAdminStateResponse.status, 401);
  assert.equal(customerMutationResponse.status, 401);

  const secondRegisterResponse = await fetch(`${baseUrl}/api/customer/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Second Client", email: "second@example.com", password: "motdepasse123" }),
  });
  const secondCookie = secondRegisterResponse.headers.get("set-cookie").split(";")[0];
  const secondOrdersResponse = await fetch(`${baseUrl}/api/customer/orders`, { headers: { cookie: secondCookie } });
  assert.deepEqual(await secondOrdersResponse.json(), []);

  const loginResponse = await fetch(`${baseUrl}/api/customer/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "client@example.com", password: "motdepasse123" }),
  });
  assert.equal(loginResponse.status, 200);

  const logoutResponse = await fetch(`${baseUrl}/api/customer/logout`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: "{}",
  });
  const sessionResponse = await fetch(`${baseUrl}/api/customer/session`, { headers: { cookie } });
  assert.equal(logoutResponse.status, 200);
  assert.equal((await sessionResponse.json()).customer, null);

  const duplicateResponse = await fetch(`${baseUrl}/api/customer/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Autre Client", email: "CLIENT@example.com", password: "motdepasse123" }),
  });
  assert.equal(duplicateResponse.status, 409);
});

test("rejects invalid XAF prices, unavailable products, and malformed bodies", async () => {
  const badProduct = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: adminCookie },
    body: JSON.stringify({ name: "Produit incorrect", category: "Boissons", price: 2.5 }),
  });
  assert.equal(badProduct.status, 400);

  const badOrder = await fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: customerCookie },
    body: JSON.stringify({ table: 99, items: [{ productId: "eclair", quantity: 1 }], note: "" }),
  });
  assert.equal(badOrder.status, 400);

  const malformed = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "content-type": "application/json", cookie: adminCookie },
    body: "null",
  });
  assert.equal(malformed.status, 400);

  const anonymousProduct = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Accès interdit", category: "Boissons", price: 500 }),
  });
  assert.equal(anonymousProduct.status, 401);

  const anonymousOrder = await fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ table: 7, items: [{ productId: "eclair", quantity: 1 }], note: "" }),
  });
  assert.equal(anonymousOrder.status, 401);

  const protectedMutations = await Promise.all([
    fetch(`${baseUrl}/api/orders/DX-1042/status`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status: "preparing" }) }),
    fetch(`${baseUrl}/api/products/eclair/availability`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ available: false }) }),
    fetch(`${baseUrl}/api/products/eclair`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Intrusion" }) }),
    fetch(`${baseUrl}/api/tables/1`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status: "reserved" }) }),
    fetch(`${baseUrl}/api/demo/reset`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }),
  ]);
  assert.deepEqual(protectedMutations.map((response) => response.status), [401, 401, 401, 401, 401]);
});

test("rejects bad admin credentials and revokes logged-out admin sessions", async () => {
  const invalidLogin = await fetch(`${baseUrl}/api/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "manager@example.com", password: "incorrect-password" }),
  });
  assert.equal(invalidLogin.status, 401);

  const login = await fetch(`${baseUrl}/api/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "manager@example.com", password: "team-password-123" }),
  });
  const cookie = login.headers.get("set-cookie").split(";")[0];
  assert.equal(login.status, 200);

  const logout = await fetch(`${baseUrl}/api/admin/logout`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: "{}",
  });
  const session = await fetch(`${baseUrl}/api/admin/session`, { headers: { cookie } });
  const protectedState = await fetch(`${baseUrl}/api/admin/bootstrap`, { headers: { cookie } });
  assert.equal(logout.status, 200);
  assert.equal((await session.json()).authenticated, false);
  assert.equal(protectedState.status, 401);
});

test("demo reset keeps customer accounts and never returns credential data", async () => {
  const reset = await fetch(`${baseUrl}/api/demo/reset`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: adminCookie },
    body: "{}",
  });
  const resetState = await reset.json();
  const customerSession = await fetch(`${baseUrl}/api/customer/session`, { headers: { cookie: customerCookie } });

  assert.equal(reset.status, 200);
  assert.equal("customers" in resetState, false);
  assert.equal("sessions" in resetState, false);
  assert.equal((await customerSession.json()).customer.email, "table-client@example.com");
});
