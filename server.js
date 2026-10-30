import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createDbPool, ensurePostgresSchema } from "./db.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const defaultDataFile = process.env.DATA_FILE || path.join(root, "data", "app-data.json");
const scryptAsync = promisify(scrypt);
const sessionLifetime = 7 * 24 * 60 * 60 * 1000;
const sessionCookie = "customer_session";
const statuses = new Set(["pending", "preparing", "ready", "served"]);
const statusTransitions = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
};
const categories = new Set(["Pâtisseries", "Viennoiseries", "Boissons", "Autres douceurs"]);
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};
const PUBLIC_FILES = new Set(["index.html", "styles.css", "app.js", "Menu.jpeg", "guide-utilisation.pdf"]);

const initialProducts = [
  { id: "eclair", name: "Éclair chocolat", category: "Pâtisseries", price: 2100, description: "Choux garni d'une crème au chocolat noir et glaçage fondant.", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85", available: true, popular: true },
  { id: "fraise", name: "Tarte aux fraises", category: "Pâtisseries", price: 2950, description: "Crème légère à la vanille, fraises fraîches de saison.", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=85", available: true, popular: true },
  { id: "macaron", name: "Macaron framboise", category: "Pâtisseries", price: 1300, description: "Biscuit délicat, ganache framboise et cœur fruité.", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=85", available: true, popular: false },
  { id: "cheesecake", name: "Cheesecake framboise", category: "Pâtisseries", price: 2750, description: "Fromage frais onctueux, biscuit spéculoos et coulis maison.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85", available: true, popular: true },
  { id: "croissant", name: "Croissant pur beurre", category: "Viennoiseries", price: 1050, description: "Feuilletage doré et croustillant, pur beurre AOP.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85", available: true, popular: false },
  { id: "pain-chocolat", name: "Pain au chocolat", category: "Viennoiseries", price: 1200, description: "Pâte feuilletée pur beurre et chocolat noir intense.", image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=85", available: true, popular: false },
  { id: "cappuccino", name: "Cappuccino", category: "Boissons", price: 2300, description: "Double espresso, lait velouté et cacao délicat.", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=85", available: true, popular: true },
  { id: "earl-grey", name: "Thé Earl Grey", category: "Boissons", price: 1850, description: "Thé noir délicat aux notes fraîches de bergamote.", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85", available: true, popular: false },
  { id: "limonade", name: "Citronnade maison", category: "Boissons", price: 2100, description: "Citron pressé, menthe fraîche et une pointe de miel.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=85", available: true, popular: false },
];

const initialOrders = [
  { id: "DX-1042", table: 7, items: [{ productId: "eclair", name: "Éclair chocolat", quantity: 2, price: 2100 }, { productId: "fraise", name: "Tarte aux fraises", quantity: 1, price: 2950 }, { productId: "cappuccino", name: "Cappuccino", quantity: 1, price: 2300 }], status: "pending", time: "10:42", note: "" },
  { id: "DX-1041", table: 3, items: [{ productId: "cheesecake", name: "Cheesecake framboise", quantity: 1, price: 2750 }, { productId: "earl-grey", name: "Thé Earl Grey", quantity: 2, price: 1850 }], status: "preparing", time: "10:39", note: "Un peu de lait à part" },
  { id: "DX-1040", table: 2, items: [{ productId: "croissant", name: "Croissant pur beurre", quantity: 2, price: 1050 }], status: "ready", time: "10:35", note: "" },
  { id: "DX-1039", table: 9, items: [{ productId: "fraise", name: "Tarte aux fraises", quantity: 1, price: 2950 }, { productId: "macaron", name: "Macaron framboise", quantity: 2, price: 1300 }], status: "served", time: "10:28", note: "" },
  { id: "DX-1038", table: 5, items: [{ productId: "pain-chocolat", name: "Pain au chocolat", quantity: 2, price: 1200 }, { productId: "cappuccino", name: "Cappuccino", quantity: 1, price: 2300 }], status: "served", time: "10:17", note: "" },
];

function createInitialData() {
  return {
    version: 1,
    currency: "XAF",
    restaurant: { name: "ANA MARIE PATISSERIE", open: true },
    products: structuredClone(initialProducts),
    orders: structuredClone(initialOrders),
    tableStatuses: {},
    customers: [],
    sessions: [],
    updatedAt: new Date().toISOString(),
  };
}

async function loadStore(dataFile) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  try {
    const parsed = JSON.parse(await readFile(dataFile, "utf8"));
    if (parsed.version !== 1 || parsed.currency !== "XAF" || !Array.isArray(parsed.products) || !Array.isArray(parsed.orders)) {
      throw new Error("Le fichier de données ne respecte pas le schéma XAF attendu.");
    }
    parsed.customers ??= [];
    parsed.sessions ??= [];
    if (!Array.isArray(parsed.customers) || !Array.isArray(parsed.sessions)) {
      throw new Error("Les comptes clients du fichier de données sont invalides.");
    }
    return parsed;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const initialData = createInitialData();
    await writeFile(dataFile, JSON.stringify(initialData, null, 2), { flag: "wx" });
    return initialData;
  }
}

function validatePrice(price) {
  if (!Number.isSafeInteger(price) || price < 50 || price > 100000000) {
    throw new HttpError(400, "Le prix doit être un montant entier en XAF, compris entre 50 et 100 000 000.");
  }
}

function sanitizeProduct(input, productId) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const category = input.category;
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const image = typeof input.image === "string" ? input.image.trim() : "";
  validatePrice(input.price);
  if (!name || name.length > 60) throw new HttpError(400, "Le nom du produit doit contenir entre 1 et 60 caractères.");
  if (!categories.has(category)) throw new HttpError(400, "Cette catégorie n'est pas reconnue.");
  if (description.length > 180) throw new HttpError(400, "La description ne peut pas dépasser 180 caractères.");
  const isValidUrl = /^https:\/\/\S+$/i.test(image);
  const isValidDataUri = /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/\s=]+$/i.test(image) || /^data:image\/[a-zA-Z0-9.+-]+,[\s\S]+$/i.test(image);
  if (image && !(isValidUrl || isValidDataUri)) throw new HttpError(400, "L'image doit utiliser une adresse HTTPS ou un fichier image téléchargé.");
  return {
    id: productId || `produit-${randomUUID()}`,
    name,
    category,
    price: input.price,
    description,
    image: image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
    available: typeof input.available === "boolean" ? input.available : true,
    popular: Boolean(input.popular),
  };
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  const maxBodySize = 5 * 1024 * 1024;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodySize) throw new HttpError(413, "La requête dépasse la taille maximale autorisée.");
    chunks.push(chunk);
  }
  try {
    const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new HttpError(400, "Le corps de la requête doit être un objet JSON.");
    }
    return payload;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, "Le corps de la requête doit être un JSON valide.");
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").map((part) => {
    const separator = part.indexOf("=");
    return separator < 0 ? ["", ""] : [part.slice(0, separator).trim(), part.slice(separator + 1).trim()];
  }).filter(([name]) => name));
}

function tokenDigest(token) {
  return createHash("sha256").update(token).digest("hex");
}

function publicCustomer(customer) {
  return { id: customer.id, name: customer.name, email: customer.email };
}

function publicOrder(order) {
  const { customerId, ...visibleOrder } = order;
  return visibleOrder;
}

function adminBootstrap(data) {
  return {
    version: data.version,
    currency: data.currency,
    restaurant: data.restaurant,
    products: data.products,
    orders: data.orders.map(publicOrder),
    tableStatuses: data.tableStatuses,
    updatedAt: data.updatedAt,
  };
}

function setSessionCookie(response, request, token, maxAge = Math.floor(sessionLifetime / 1000)) {
  const forwardedProtocol = request.headers["x-forwarded-proto"]?.split(",")[0].trim();
  const secure = request.socket.encrypted || forwardedProtocol === "https" ? "; Secure" : "";
  response.setHeader("set-cookie", `${sessionCookie}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`);
}

async function passwordDigest(password, salt) {
  return (await scryptAsync(password, salt, 64)).toString("hex");
}

function sessionForRequest(request, data) {
  const token = parseCookies(request)[sessionCookie];
  return data.sessions.find((item) => item.tokenHash === tokenDigest(token || "") && item.expiresAt > Date.now());
}

function requireAdmin(request, data) {
  const session = sessionForRequest(request, data);
  if (session?.role !== "admin") throw new HttpError(401, "Connectez-vous avec un compte équipe pour continuer.");
  return session;
}

function secureStringEqual(candidate, expected) {
  const candidateDigest = createHash("sha256").update(candidate).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}

function validTable(table) {
  if (!Number.isInteger(table) || table < 1 || table > 12) {
    throw new HttpError(400, "La table doit être comprise entre 1 et 12.");
  }
}

function productResponse(data, productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) throw new HttpError(404, "Produit introuvable.");
  return product;
}

export async function createAppServer({
  dataFile = defaultDataFile,
  publicDir = root,
  adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "",
  adminPassword = process.env.ADMIN_PASSWORD || "",
} = {}) {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
  const dbPool = createDbPool(databaseUrl);
  let dbState = { enabled: false, type: "json" };

  if (dbPool) {
    try {
      await ensurePostgresSchema(dbPool);
      dbState = { enabled: true, type: "postgres" };
    } catch (error) {
      console.warn("PostgreSQL unavailable, fallback on JSON legacy persistence.", error.message || error);
      await dbPool.end().catch(() => undefined);
    }
  }

  let data = await loadStore(dataFile);
  let writeQueue = Promise.resolve();

  const save = async () => {
    const tempFile = `${dataFile}.${process.pid}.tmp`;
    try {
      await writeFile(tempFile, JSON.stringify(data, null, 2), "utf8");
      await rename(tempFile, dataFile);
    } catch (error) {
      await rm(tempFile, { force: true }).catch(() => undefined);
      throw error;
    }
  };

  const mutate = (operation) => {
    const pending = writeQueue.then(async () => {
      const result = await operation();
      data.updatedAt = new Date().toISOString();
      await save();
      return result;
    });
    writeQueue = pending.then(() => undefined, () => undefined);
    return pending;
  };

  const handler = async (request, response) => {
    response.setHeader("x-content-type-options", "nosniff");
    response.setHeader("referrer-policy", "same-origin");
    const requestUrl = new URL(request.url, "http://localhost");
    let pathname;
    try {
      pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
      return sendJson(response, 400, { error: "L'adresse demandée est invalide." });
    }

    try {
      if (request.method === "GET" && pathname === "/api/health") {
        return sendJson(response, 200, {
          ok: true,
          currency: data.currency,
          updatedAt: data.updatedAt,
          storage: dbState.enabled ? "postgres" : "json",
        });
      }

      if (request.method === "GET" && pathname === "/api/bootstrap") {
        return sendJson(response, 200, {
          version: data.version,
          currency: data.currency,
          restaurant: data.restaurant,
          products: data.products,
          updatedAt: data.updatedAt,
          storage: dbState.enabled ? "postgres" : "json",
        });
      }

      if (request.method === "GET" && pathname === "/api/admin/session") {
        return sendJson(response, 200, { authenticated: sessionForRequest(request, data)?.role === "admin" });
      }

      if (request.method === "POST" && pathname === "/api/admin/login") {
        if (!adminEmail || adminPassword.length < 12) {
          throw new HttpError(503, "Configurez ADMIN_EMAIL et un ADMIN_PASSWORD d'au moins 12 caractères sur le serveur.");
        }
        const payload = await readJson(request);
        const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
        const password = typeof payload.password === "string" ? payload.password : "";
        const validEmail = secureStringEqual(email, adminEmail);
        const validPassword = secureStringEqual(password, adminPassword);
        if (!validEmail || !validPassword) throw new HttpError(401, "Adresse e-mail ou mot de passe incorrect.");
        const token = randomBytes(32).toString("hex");
        await mutate(() => {
          data.sessions = data.sessions.filter((item) => item.expiresAt > Date.now());
          data.sessions.push({ role: "admin", customerId: null, tokenHash: tokenDigest(token), expiresAt: Date.now() + sessionLifetime });
        });
        setSessionCookie(response, request, token);
        return sendJson(response, 200, { authenticated: true });
      }

      if (request.method === "POST" && pathname === "/api/admin/logout") {
        const token = parseCookies(request)[sessionCookie];
        const digest = tokenDigest(token || "");
        await mutate(() => {
          data.sessions = data.sessions.filter((item) => item.tokenHash !== digest);
        });
        setSessionCookie(response, request, "", 0);
        return sendJson(response, 200, { ok: true });
      }

      if (request.method === "GET" && pathname === "/api/admin/bootstrap") {
        requireAdmin(request, data);
        return sendJson(response, 200, adminBootstrap(data));
      }

      if (request.method === "GET" && pathname === "/api/customer/session") {
        const session = sessionForRequest(request, data);
        const customer = session && data.customers.find((item) => item.id === session.customerId);
        return sendJson(response, 200, { customer: customer ? publicCustomer(customer) : null });
      }

      if (request.method === "POST" && pathname === "/api/customer/register") {
        const payload = await readJson(request);
        const name = typeof payload.name === "string" ? payload.name.trim() : "";
        const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
        const password = typeof payload.password === "string" ? payload.password : "";
        if (name.length < 2 || name.length > 80) throw new HttpError(400, "Le nom doit contenir entre 2 et 80 caractères.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new HttpError(400, "Saisissez une adresse e-mail valide.");
        if (password.length < 8 || password.length > 128) throw new HttpError(400, "Le mot de passe doit contenir entre 8 et 128 caractères.");
        const salt = randomBytes(16).toString("hex");
        const passwordHash = await passwordDigest(password, salt);
        const token = randomBytes(32).toString("hex");
        const customer = await mutate(() => {
          if (data.customers.some((item) => item.email === email)) throw new HttpError(409, "Un compte existe déjà avec cette adresse e-mail.");
          const created = { id: randomUUID(), name, email, passwordHash, salt };
          data.customers.push(created);
          data.sessions = data.sessions.filter((item) => item.expiresAt > Date.now());
          data.sessions.push({ role: "customer", customerId: created.id, tokenHash: tokenDigest(token), expiresAt: Date.now() + sessionLifetime });
          return created;
        });
        setSessionCookie(response, request, token);
        return sendJson(response, 201, { customer: publicCustomer(customer) });
      }

      if (request.method === "POST" && pathname === "/api/customer/login") {
        const payload = await readJson(request);
        const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
        const password = typeof payload.password === "string" ? payload.password : "";
        const customer = data.customers.find((item) => item.email === email);
        const suppliedHash = await passwordDigest(password, customer?.salt || "invalid-account-salt");
        const expectedHash = customer?.passwordHash || "0".repeat(128);
        const valid = timingSafeEqual(Buffer.from(suppliedHash, "hex"), Buffer.from(expectedHash, "hex"));
        if (!customer || !valid) throw new HttpError(401, "Adresse e-mail ou mot de passe incorrect.");
        const token = randomBytes(32).toString("hex");
        await mutate(() => {
          data.sessions = data.sessions.filter((item) => item.expiresAt > Date.now());
          data.sessions.push({ role: "customer", customerId: customer.id, tokenHash: tokenDigest(token), expiresAt: Date.now() + sessionLifetime });
        });
        setSessionCookie(response, request, token);
        return sendJson(response, 200, { customer: publicCustomer(customer) });
      }

      if (request.method === "POST" && pathname === "/api/customer/logout") {
        const token = parseCookies(request)[sessionCookie];
        const digest = tokenDigest(token || "");
        await mutate(() => {
          data.sessions = data.sessions.filter((item) => item.tokenHash !== digest);
        });
        setSessionCookie(response, request, "", 0);
        return sendJson(response, 200, { ok: true });
      }

      if (request.method === "GET" && pathname === "/api/customer/orders") {
        const session = sessionForRequest(request, data);
        if (!session || session.role === "admin" || !session.customerId) throw new HttpError(401, "Connectez-vous pour consulter vos commandes.");
        return sendJson(response, 200, data.orders.filter((order) => order.customerId === session.customerId).map(publicOrder));
      }

      if (request.method === "POST" && pathname === "/api/orders") {
        const customerSession = sessionForRequest(request, data);
        if (!customerSession || customerSession.role !== "customer") {
          throw new HttpError(401, "Connectez-vous ou créez un compte avant de commander.");
        }
        const payload = await readJson(request);
        validTable(payload.table);
        if (!data.restaurant.open) throw new HttpError(409, "La pâtisserie est fermée aux nouvelles commandes.");
        if (!Array.isArray(payload.items) || payload.items.length < 1 || payload.items.length > 50) {
          throw new HttpError(400, "Une commande doit contenir entre 1 et 50 lignes.");
        }
        if (typeof payload.note !== "string" || payload.note.length > 500) {
          throw new HttpError(400, "La note de commande ne peut pas dépasser 500 caractères.");
        }
        const order = await mutate(() => {
          const session = sessionForRequest(request, data);
          if (!session || session.role !== "customer") throw new HttpError(401, "Votre session client a expiré. Reconnectez-vous.");
          const aggregated = new Map();
          for (const line of payload.items) {
            if (typeof line.productId !== "string" || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 30) {
              throw new HttpError(400, "Chaque article doit avoir un produit valide et une quantité comprise entre 1 et 30.");
            }
            const product = data.products.find((item) => item.id === line.productId);
            if (!product || !product.available) {
              throw new HttpError(409, "Un article de votre panier n'est plus disponible.");
            }
            const existing = aggregated.get(product.id);
            const quantity = (existing?.quantity || 0) + line.quantity;
            if (quantity > 30) throw new HttpError(400, "La quantité maximale par produit est de 30.");
            aggregated.set(product.id, { productId: product.id, name: product.name, quantity, price: product.price });
          }
          const nextNumber = Math.max(1042, ...data.orders.map((item) => Number(item.id.split("-")[1]) || 0)) + 1;
          const newOrder = {
            id: `DX-${nextNumber}`,
            table: payload.table,
            items: [...aggregated.values()],
            status: "pending",
            time: new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
            note: payload.note.trim(),
            customerId: session.customerId,
          };
          data.orders.unshift(newOrder);
          return newOrder;
        });
        return sendJson(response, 201, publicOrder(order));
      }

      const statusMatch = pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
      if (request.method === "PATCH" && statusMatch) {
        requireAdmin(request, data);
        const payload = await readJson(request);
        const order = await mutate(() => {
          const found = data.orders.find((item) => item.id === statusMatch[1]);
          if (!found) throw new HttpError(404, "Commande introuvable.");
          if (payload.status !== statusTransitions[found.status]) {
            throw new HttpError(409, `Transition impossible depuis le statut « ${found.status} ».`);
          }
          found.status = payload.status;
          return found;
        });
        return sendJson(response, 200, publicOrder(order));
      }

      if (request.method === "POST" && pathname === "/api/products") {
        requireAdmin(request, data);
        const payload = await readJson(request);
        const product = await mutate(() => {
          const created = sanitizeProduct(payload);
          data.products.push(created);
          return created;
        });
        return sendJson(response, 201, product);
      }

      const availabilityMatch = pathname.match(/^\/api\/products\/([^/]+)\/availability$/);
      if (request.method === "PATCH" && availabilityMatch) {
        requireAdmin(request, data);
        const payload = await readJson(request);
        if (typeof payload.available !== "boolean") throw new HttpError(400, "La disponibilité doit être un booléen.");
        const product = await mutate(() => {
          const found = productResponse(data, availabilityMatch[1]);
          found.available = payload.available;
          return found;
        });
        return sendJson(response, 200, product);
      }

      const productMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
      if (request.method === "PATCH" && productMatch) {
        requireAdmin(request, data);
        const payload = await readJson(request);
        const product = await mutate(() => {
          const current = productResponse(data, productMatch[1]);
          const updated = sanitizeProduct({ ...current, ...payload, available: current.available, popular: current.popular }, current.id);
          Object.assign(current, updated);
          return current;
        });
        return sendJson(response, 200, product);
      }

      if (request.method === "PATCH" && pathname === "/api/settings") {
        requireAdmin(request, data);
        const payload = await readJson(request);
        if (payload.name !== undefined && (typeof payload.name !== "string" || payload.name.trim().length < 1 || payload.name.trim().length > 80)) {
          throw new HttpError(400, "Le nom de l'établissement doit contenir entre 1 et 80 caractères.");
        }
        if (payload.open !== undefined && typeof payload.open !== "boolean") {
          throw new HttpError(400, "L'état d'ouverture doit être un booléen.");
        }
        const restaurant = await mutate(() => {
          if (payload.name !== undefined) data.restaurant.name = payload.name.trim();
          if (payload.open !== undefined) data.restaurant.open = payload.open;
          return data.restaurant;
        });
        return sendJson(response, 200, restaurant);
      }

      const tableMatch = pathname.match(/^\/api\/tables\/(\d+)$/);
      if (request.method === "PATCH" && tableMatch) {
        requireAdmin(request, data);
        const table = Number(tableMatch[1]);
        validTable(table);
        const payload = await readJson(request);
        if (!["free", "reserved"].includes(payload.status)) {
          throw new HttpError(400, "Une table sans commande peut être libre ou réservée.");
        }
        const tableStatuses = await mutate(() => {
          data.tableStatuses[table] = payload.status;
          return data.tableStatuses;
        });
        return sendJson(response, 200, tableStatuses);
      }

      if (request.method === "POST" && pathname === "/api/demo/reset") {
        requireAdmin(request, data);
        const customers = data.customers;
        const sessions = data.sessions;
        data = createInitialData();
        data.customers = customers;
        data.sessions = sessions;
        await mutate(async () => undefined);
        return sendJson(response, 200, adminBootstrap(data));
      }

      if (request.method === "GET") return await serveStatic(pathname, publicDir, response);
      return sendJson(response, 404, { error: "Ressource introuvable." });
    } catch (error) {
      if (error instanceof HttpError) return sendJson(response, error.status, { error: error.message });
      console.error("Erreur du serveur :", error);
      return sendJson(response, 500, { error: "Une erreur interne est survenue. Consultez les journaux du serveur." });
    }
  };

  return createServer((request, response) => {
    void handler(request, response);
  });
}

async function serveStatic(pathname, publicDir, response) {
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  if (!PUBLIC_FILES.has(relativePath)) throw new HttpError(404, "Fichier introuvable.");
  const filePath = path.resolve(publicDir, relativePath);
  const normalizedRoot = path.resolve(publicDir) + path.sep;
  if (filePath !== path.resolve(publicDir, "index.html") && !filePath.startsWith(normalizedRoot)) {
    throw new HttpError(403, "Accès interdit.");
  }
  let contents;
  try {
    contents = await readFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") throw new HttpError(404, "Fichier introuvable.");
    throw error;
  }
  response.writeHead(200, {
    "content-type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(contents);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await createAppServer();
  const host = process.env.HOST || "127.0.0.1";
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT doit être un entier compris entre 1 et 65535.");
  }
  const databaseMode = process.env.DATABASE_URL || process.env.POSTGRES_URL ? "postgres" : "json";
  server.listen(port, host, () => {
    console.log(`ANA MARIE PATISSERIE est disponible sur http://${host}:${port}`);
    console.log(`Persistance active · Mode ${databaseMode} · Devise XAF.`);
    if (!process.env.ADMIN_EMAIL?.trim() || (process.env.ADMIN_PASSWORD || "").length < 12) {
      console.warn("Espace équipe désactivé : configurez ADMIN_EMAIL et ADMIN_PASSWORD (12 caractères minimum).");
    }
  });
}
