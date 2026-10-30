const iconPaths = {
  cake: '<path d="M4 13h16v7H4z"/><path d="M4 13a4 4 0 0 1 8 0 4 4 0 0 1 8 0"/><path d="M8 5v2m4-4v3m4-1v2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  receipt: '<path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-2z"/><path d="M9 8h6m-6 4h6m-6 4h4"/>',
  tables: '<path d="M3 9h18M5 9v10m14-10v10M8 9V5h8v4"/><path d="M8 19v2m8-2v2"/>',
  menu: '<path d="M4 4h16v16H4z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
  chart: '<path d="M4 19V5m0 14h17"/><path d="m7 15 4-4 3 2 5-6"/><path d="M16 7h3v3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1-.1 1.8z"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  plus: '<path d="M12 5v14m-7-7h14"/>',
  arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bag: '<path d="M5 8h14l1 12H4L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  utensils: '<path d="M7 3v7m-3-7v4a3 3 0 0 0 6 0V3m-3 7v11m9-18v18m0-18c3 2 3 6 0 8"/>',
  money: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M12 9v6m2-4c0-1-1-2-2-2s-2 1-2 2 1 2 2 2 2 1 2 2-1 2-2 2-2-1-2-2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9m-1-12a4 4 0 0 1 0 7.8"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  heart: '<path d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6z"/>',
  trash: '<path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6"/>',
  printer: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z"/>',
  coffee: '<path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M17 10h2a2 2 0 1 1 0 4h-2M8 4v2m4-2v2"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
};

const icon = (name, className = "icon") =>
  `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.sparkles}</svg>`;

const productSeed = [
  {
    id: "eclair",
    name: "Éclair chocolat",
    category: "Pâtisseries",
    price: 2100,
    description: "Choux garni d'une crème au chocolat noir et glaçage fondant.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: true,
  },
  {
    id: "fraise",
    name: "Tarte aux fraises",
    category: "Pâtisseries",
    price: 2950,
    description: "Crème légère à la vanille, fraises fraîches de saison.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: true,
  },
  {
    id: "macaron",
    name: "Macaron framboise",
    category: "Pâtisseries",
    price: 1300,
    description: "Biscuit délicat, ganache framboise et cœur fruité.",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: false,
  },
  {
    id: "cheesecake",
    name: "Cheesecake framboise",
    category: "Pâtisseries",
    price: 2750,
    description: "Fromage frais onctueux, biscuit spéculoos et coulis maison.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: true,
  },
  {
    id: "croissant",
    name: "Croissant pur beurre",
    category: "Viennoiseries",
    price: 1050,
    description: "Feuilletage doré et croustillant, pur beurre AOP.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: false,
  },
  {
    id: "pain-chocolat",
    name: "Pain au chocolat",
    category: "Viennoiseries",
    price: 1200,
    description: "Pâte feuilletée pur beurre et chocolat noir intense.",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: false,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Boissons",
    price: 2300,
    description: "Double espresso, lait velouté et cacao délicat.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: true,
  },
  {
    id: "earl-grey",
    name: "Thé Earl Grey",
    category: "Boissons",
    price: 1850,
    description: "Thé noir délicat aux notes fraîches de bergamote.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: false,
  },
  {
    id: "limonade",
    name: "Citronnade maison",
    category: "Boissons",
    price: 2100,
    description: "Citron pressé, menthe fraîche et une pointe de miel.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=85",
    available: true,
    popular: false,
  },
];

const seededOrders = [
  { id: "DX-1042", table: 7, items: [{ productId: "eclair", name: "Éclair chocolat", quantity: 2, price: 2100 }, { productId: "fraise", name: "Tarte aux fraises", quantity: 1, price: 2950 }, { productId: "cappuccino", name: "Cappuccino", quantity: 1, price: 2300 }], status: "pending", time: "10:42", note: "" },
  { id: "DX-1041", table: 3, items: [{ productId: "cheesecake", name: "Cheesecake framboise", quantity: 1, price: 2750 }, { productId: "earl-grey", name: "Thé Earl Grey", quantity: 2, price: 1850 }], status: "preparing", time: "10:39", note: "Un peu de lait à part" },
  { id: "DX-1040", table: 2, items: [{ productId: "croissant", name: "Croissant pur beurre", quantity: 2, price: 1050 }], status: "ready", time: "10:35", note: "" },
  { id: "DX-1039", table: 9, items: [{ productId: "fraise", name: "Tarte aux fraises", quantity: 1, price: 2950 }, { productId: "macaron", name: "Macaron framboise", quantity: 2, price: 1300 }], status: "served", time: "10:28", note: "" },
  { id: "DX-1038", table: 5, items: [{ productId: "pain-chocolat", name: "Pain au chocolat", quantity: 2, price: 1200 }, { productId: "cappuccino", name: "Cappuccino", quantity: 1, price: 2300 }], status: "served", time: "10:17", note: "" },
];

const navItems = [
  { id: "dashboard", label: "Vue d'ensemble", icon: "grid" },
  { id: "orders", label: "Commandes", icon: "receipt" },
  { id: "tables", label: "Tables", icon: "tables" },
  { id: "menu", label: "Ma carte", icon: "menu" },
  { id: "analytics", label: "Statistiques", icon: "chart" },
  { id: "settings", label: "Paramètres", icon: "settings" },
];

const pageTitles = {
  dashboard: ["Bonjour, Sophie 👋", "Voici ce qui se passe dans votre pâtisserie aujourd'hui."],
  orders: ["Les commandes", "Suivez et gérez les commandes en temps réel."],
  tables: ["Plan de salle", "Un aperçu clair de toutes vos tables."],
  menu: ["Votre carte", "Gérez vos douceurs et leur disponibilité."],
  analytics: ["Vos statistiques", "Les performances de votre pâtisserie en un coup d'œil."],
  settings: ["Paramètres", "Personnalisez votre espace et votre expérience client."],
};

const statusLabels = {
  pending: "En attente",
  preparing: "En préparation",
  ready: "Prête",
  served: "Servie",
};

const statusFlow = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
};

const formatPrice = (price) =>
  `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(price)} XAF`;

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Impossible de lire les données « ${key} » du navigateur.`, error);
    return fallback;
  }
}

const saved = readStorage("douceur-saas-state", {});
const currencyVersion = "XAF-1";
const convertLegacyPrice = (price) =>
  Number.isFinite(price) ? Math.round((price * 655.957) / 50) * 50 : 0;
if (saved.currencyVersion !== currencyVersion) {
  if (Array.isArray(saved.products)) {
    saved.products = saved.products.map((product) => ({ ...product, price: convertLegacyPrice(product.price) }));
  }
  if (Array.isArray(saved.orders)) {
    saved.orders = saved.orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({ ...item, price: convertLegacyPrice(item.price) })),
    }));
  }
}
const requestedTable = new URLSearchParams(window.location.search).get("table");
const hasCustomerTable = requestedTable !== null && Number.isInteger(Number(requestedTable)) && Number(requestedTable) >= 1 && Number(requestedTable) <= 12;
const customerTable = hasCustomerTable ? Number(requestedTable) : 7;
const forceCustomerMenu = hasCustomerTable;
const state = {
  page: "dashboard",
  customerMode: true,
  customer: null,
  customerOrders: [],
  customerPage: forceCustomerMenu ? "menu" : "login",
  authReturn: "menu",
  tableNumber: customerTable,
  customerCategory: "Tout",
  customerSearch: "",
  orderFilter: "all",
  orderSearch: "",
  menuCategory: "Tout",
  menuSearch: "",
  modal: null,
  detailProductId: null,
  detailQuantity: 1,
  cart: [],
  confirmation: null,
  backendConnected: false,
  adminAuthenticated: false,
  restaurantOpen: saved.restaurantOpen !== false,
  restaurantName: !saved.restaurantName || saved.restaurantName === "Douceur Pâtisserie"
    ? "ANA MARIE PATISSERIE"
    : saved.restaurantName,
  products: Array.isArray(saved.products) ? saved.products : productSeed,
  orders: Array.isArray(saved.orders) ? saved.orders : seededOrders,
  tableStatuses: saved.tableStatuses || {},
};

function persist() {
  try {
    localStorage.setItem(
      "douceur-saas-state",
      JSON.stringify({
        currencyVersion,
        restaurantOpen: state.restaurantOpen,
        restaurantName: state.restaurantName,
        products: state.products,
        orders: state.orders,
        tableStatuses: state.tableStatuses,
      }),
    );
  } catch (error) {
    console.error("La sauvegarde locale a échoué.", error);
    showToast("La sauvegarde locale a échoué. Vérifiez l'espace disponible de votre navigateur.", true);
  }
}

const API_BASE = (typeof window !== "undefined" && window.__APP_API_BASE__) || "";

async function apiRequest(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body === undefined ? {} : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    state.backendConnected = false;
    renderConnectionStatus();
    throw new Error("Impossible de joindre le serveur. Vérifiez qu'il est démarré.");
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Erreur serveur (${response.status}).`);
  state.backendConnected = true;
  renderConnectionStatus();
  return payload;
}

function installServerState(serverState) {
  state.products = serverState.products;
  state.orders = serverState.orders || [];
  state.tableStatuses = serverState.tableStatuses || {};
  state.restaurantName = serverState.restaurant.name;
  state.restaurantOpen = serverState.restaurant.open;
  state.backendConnected = true;
  persist();
}

function renderConnectionStatus() {
  const chip = document.querySelector(".live-chip");
  if (!chip) return;
  chip.innerHTML = `<span class="live-dot ${state.backendConnected ? "" : "offline"}"></span>${state.backendConnected ? "Serveur connecté" : "Mode local"}`;
  chip.title = state.backendConnected ? "Les modifications sont enregistrées sur le serveur." : "Démarrez le serveur Node.js pour activer la persistance partagée.";
}

async function connectToBackend() {
  if (window.location.protocol === "file:") {
    renderConnectionStatus();
    showToast("Mode local : lancez npm.cmd start pour activer le serveur et les données partagées.");
    return;
  }
  try {
    const publicState = await apiRequest("/api/bootstrap");
    const [customerSession, adminSession] = await Promise.all([
      apiRequest("/api/customer/session"),
      apiRequest("/api/admin/session"),
    ]);
    state.customer = customerSession.customer;
    state.adminAuthenticated = adminSession.authenticated;
    const serverState = state.adminAuthenticated
      ? await apiRequest("/api/admin/bootstrap")
      : publicState;
    installServerState(serverState);
    render();
    window.setInterval(async () => {
      if (!state.backendConnected || state.modal) return;
      try {
        const latest = await apiRequest(state.adminAuthenticated ? "/api/admin/bootstrap" : "/api/bootstrap");
        if (latest.updatedAt !== serverState.updatedAt) {
          installServerState(latest);
          if (state.customer && state.customerPage === "orders") {
            state.customerOrders = await apiRequest("/api/customer/orders");
          }
          render();
          serverState.updatedAt = latest.updatedAt;
        }
      } catch (error) {
        showToast(error.message, true);
      }
    }, 10000);
  } catch (error) {
    renderConnectionStatus();
    showToast(error.message, true);
  }
}

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const moneyForOrder = (order) =>
  order.items.reduce((total, item) => total + item.price * item.quantity, 0);

const orderCount = (order) =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const liveOrders = () => state.orders.filter((order) => order.status !== "served");

function showToast(message, isError = false) {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `${icon(isError ? "close" : "check")}<span>${escapeHTML(message)}</span>`;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3400);
}

function statusBadge(status) {
  return `<span class="badge ${status}">${escapeHTML(statusLabels[status] || status)}</span>`;
}

function navMarkup(mobile = false) {
  const items = mobile ? navItems.slice(0, 5) : navItems;
  return items
    .map(
      (item) => `<button class="nav-link ${state.page === item.id ? "active" : ""}" data-page="${item.id}" aria-label="${item.label}">
        ${icon(item.icon)}<span>${item.label}</span>${item.id === "orders" && liveOrders().length ? `<span class="nav-count">${liveOrders().length}</span>` : ""}
      </button>`,
    )
    .join("");
}

function appChrome() {
  const [title] = pageTitles[state.page] || pageTitles.dashboard;
  return `<div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">${icon("cake")}</div>
        <div class="brand-copy"><div class="brand-name">${escapeHTML(state.restaurantName)}</div><div class="brand-caption">Pâtisserie artisanale</div></div>
      </div>
      <div class="workspace-label">Espace de travail</div>
      <nav class="nav-list" aria-label="Navigation principale">${navMarkup()}</nav>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-promo">
        <div class="promo-icon">${icon("sparkles")}</div>
        <strong>Un service aux petits soins</strong>
        <p>Les commandes arrivent directement dans votre espace.</p>
      </div>
      <div class="user-card"><div class="avatar">SB</div><div class="user-copy"><div class="user-name">Sophie Bernard</div><div class="user-role">Gérante</div></div>${icon("more")}</div>
    </aside>
    <main class="main-shell">
      <header class="topbar">
        <div><div class="topbar-title">${escapeHTML(title)}</div><div class="topbar-subtitle">Mardi 27 octobre · Service du midi</div></div>
        <div class="topbar-actions">
          <div class="live-chip" title="${state.backendConnected ? "Les modifications sont enregistrées sur le serveur." : "Démarrez le serveur Node.js pour activer la persistance partagée."}"><span class="live-dot ${state.backendConnected ? "" : "offline"}"></span>${state.backendConnected ? "Serveur connecté" : "Mode local"}</div>
          <button class="icon-button" data-action="notify" aria-label="Notifications">${icon("bell")}</button>
          <button class="button secondary" data-action="customer-mode">${icon("heart")}<span class="desktop-only">Vue client</span></button>
          <button class="button secondary" data-action="admin-logout">Se déconnecter</button>
        </div>
      </header>
      <section id="page-content" class="page-content"></section>
      <nav class="mobile-nav" aria-label="Navigation mobile">${navMarkup(true)}</nav>
    </main>
    <a class="guide-fab" href="/guide-utilisation.pdf" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le guide d'utilisation au format PDF">
      ${icon("printer")}<span>Guide PDF</span>
    </a>
  </div>`;
}

function statCard(label, value, note, iconName, color, positive = true) {
  return `<article class="stat-card">
    <div class="stat-top"><span>${label}</span><span class="stat-icon ${color}">${icon(iconName)}</span></div>
    <div class="stat-value">${value}</div>
    <div class="stat-foot"><span class="${positive ? "stat-positive" : ""}">${positive ? "↗" : "•"} ${note}</span></div>
  </article>`;
}

function todayOrders() {
  return state.orders.length;
}

function dailyRevenue() {
  return state.orders.reduce((total, order) => total + moneyForOrder(order), 0);
}

function weekChart() {
  const values = [42, 63, 49, 77, 58, 88, 70];
  const labels = ["Mer", "Jeu", "Ven", "Sam", "Dim", "Lun", "Aujourd'hui"];
  return `<div class="chart-wrap">
    <div class="chart-grid"><span></span><span></span><span></span><span></span></div>
    <div class="chart-columns">${values.map((value, index) => `<div class="chart-column ${index === 6 ? "today" : ""}">
      <div class="chart-bar" style="height:${value}%"></div><span class="chart-label">${labels[index]}</span>
    </div>`).join("")}</div>
  </div>`;
}

function dashboardOrderCard(order) {
  return `<div class="order-card">
    <div class="order-table">T${order.table}</div>
    <div><div class="order-card-title">Table ${order.table} · ${orderCount(order)} article${orderCount(order) > 1 ? "s" : ""}</div><div class="order-card-sub">${order.items.map((item) => `${item.quantity} × ${escapeHTML(item.name)}`).join(", ")}</div></div>
    <div><div class="order-card-price">${formatPrice(moneyForOrder(order))}</div><div style="margin-top:5px">${statusBadge(order.status)}</div></div>
  </div>`;
}

function tableStatus(table) {
  const orders = liveOrders().filter((order) => order.table === table);
  if (orders.some((order) => order.status === "ready")) return "ready";
  if (orders.some((order) => order.status === "preparing")) return "preparing";
  if (orders.some((order) => order.status === "pending")) return "occupied";
  return state.tableStatuses[table] || "free";
}

function tableTile(table, detailed = false) {
  const status = tableStatus(table);
  const statusText = { free: "Libre", occupied: "En attente", preparing: "En préparation", ready: "Prête", reserved: "Réservée" }[status] || "Libre";
  const order = liveOrders().find((item) => item.table === table);
  if (!detailed) {
    return `<button class="table-tile ${status}" data-table="${table}" aria-label="Table ${table}, ${statusText}">
      <span class="table-number">${table}</span><span class="table-status">${statusText}</span>
    </button>`;
  }
  return `<article class="table-detail-card">
    <div class="table-detail-top"><div><div class="table-detail-number">Table ${table}</div><div class="panel-caption">${order ? `${orderCount(order)} article${orderCount(order) > 1 ? "s" : ""} · ${formatPrice(moneyForOrder(order))}` : statusText}</div></div>${statusBadge(order?.status || status)}</div>
    ${order ? `<div class="table-secondary" style="margin-top:12px">${order.items.map((item) => `${item.quantity} × ${escapeHTML(item.name)}`).join("<br>")}</div>` : ""}
    <div class="table-detail-actions">${order ? `<button class="button secondary small" data-order-detail="${order.id}">Voir la commande</button>` : `<button class="button secondary small" data-table-toggle="${table}">${status === "reserved" ? "Libérer la table" : status === "free" ? "Marquer réservée" : "Voir la table"}</button>`}<button class="button ghost small" data-table-qr="${table}">QR client</button></div>
  </article>`;
}

function dashboardView() {
  const active = liveOrders();
  const average = state.orders.length ? dailyRevenue() / state.orders.length : 0;
  const popular = state.products.filter((product) => product.popular).slice(0, 3);
  return `<div class="page-heading"><div><h1>Le service en un coup d'œil</h1><p>Une belle journée pour régaler vos clients.</p></div><div class="heading-actions"><div class="date-chip">${icon("clock")} Aujourd'hui</div><button class="button" data-page="orders">${icon("receipt")} Toutes les commandes</button></div></div>
    <div class="stats-grid">
      ${statCard("Chiffre d'affaires", formatPrice(dailyRevenue()), "+12,8 % vs. hier", "money", "green")}
      ${statCard("Commandes aujourd'hui", todayOrders(), `${active.length} à traiter`, "bag", "blue")}
      ${statCard("Panier moyen", formatPrice(average), "sur le service", "chart", "")}
      ${statCard("Tables occupées", `${[...Array(12)].filter((_, index) => tableStatus(index + 1) !== "free").length} / 12`, "salle en activité", "users", "amber")}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><div><div class="panel-title">Votre activité</div><div class="panel-caption">Chiffre d'affaires cette semaine</div></div><button class="button secondary small" data-page="analytics">Voir le rapport ${icon("arrow")}</button></div><div class="panel-body">${weekChart()}</div></section>
      <section class="panel"><div class="panel-header"><div><div class="panel-title">À préparer maintenant</div><div class="panel-caption">${active.length} commande${active.length > 1 ? "s" : ""} en cours</div></div><span class="badge pending">${active.length} en cours</span></div><div class="panel-body"><div class="order-stack">${active.slice(0, 3).map(dashboardOrderCard).join("") || `<div class="empty-state">${icon("check")}<strong>Tout est à jour !</strong><span>Aucune commande en attente.</span></div>`}</div></div></section>
    </div>
    <section class="panel" style="margin-bottom:16px"><div class="panel-header"><div><div class="panel-title">Votre salle</div><div class="panel-caption">État des 12 tables · cliquez sur une table pour gérer son service</div></div><button class="button secondary small" data-page="tables">Plan complet ${icon("arrow")}</button></div><div class="panel-body"><div class="table-overview">${Array.from({ length: 12 }, (_, index) => tableTile(index + 1)).join("")}</div></div></section>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-header"><div><div class="panel-title">Les douceurs préférées</div><div class="panel-caption">Vos incontournables du moment</div></div><button class="button ghost small" data-page="menu">Voir la carte</button></div><div class="panel-body"><div class="order-stack">${popular.map((product) => `<div class="order-card"><img src="${product.image}" alt="" style="width:39px;height:39px;border-radius:9px;object-fit:cover"><div><div class="order-card-title">${escapeHTML(product.name)}</div><div class="order-card-sub">${escapeHTML(product.category)}</div></div><div class="order-card-price">${formatPrice(product.price)}</div></div>`).join("")}</div></div></section>
      <section class="panel"><div class="panel-header"><div><div class="panel-title">Votre accueil client</div><div class="panel-caption">Le menu digital est prêt à être partagé</div></div><span class="stat-icon green">${icon("heart")}</span></div><div class="panel-body"><p style="margin:3px 0 15px;color:var(--muted);font-size:11px;line-height:1.6">Vos clients consultent la carte et commandent directement depuis leur table. Testez le parcours en un clic.</p><button class="button" data-action="customer-mode">${icon("arrow")} Ouvrir le menu client</button></div></section>
    </div>`;
}

function ordersView() {
  const filtered = state.orders.filter((order) => {
    const matchesStatus = state.orderFilter === "all" || order.status === state.orderFilter;
    const query = state.orderSearch.trim().toLowerCase();
    const matchesQuery = !query || order.id.toLowerCase().includes(query) || String(order.table).includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });
  return `<div class="page-heading"><div><h1>Toutes les commandes</h1><p>Traitez les commandes, du premier clic au service à table.</p></div><div class="heading-actions"><span class="badge ${state.restaurantOpen ? "ready" : "served"}"><span class="live-dot"></span>${state.restaurantOpen ? "Commandes ouvertes" : "Commandes fermées"}</span></div></div>
    <div class="toolbar"><label class="search-field">${icon("search")}<input type="search" data-input="orderSearch" value="${escapeHTML(state.orderSearch)}" placeholder="Rechercher une commande, une table…"></label><select class="filter-select" data-select="orderFilter"><option value="all" ${state.orderFilter === "all" ? "selected" : ""}>Tous les statuts</option><option value="pending" ${state.orderFilter === "pending" ? "selected" : ""}>En attente</option><option value="preparing" ${state.orderFilter === "preparing" ? "selected" : ""}>En préparation</option><option value="ready" ${state.orderFilter === "ready" ? "selected" : ""}>Prêtes</option><option value="served" ${state.orderFilter === "served" ? "selected" : ""}>Servies</option></select><button class="button secondary" data-action="export">${icon("printer")} Exporter</button></div>
    <section class="panel"><div class="table-wrap"><table class="data-table"><thead><tr><th>Commande</th><th>Table</th><th>Articles</th><th class="hide-mobile">Heure</th><th>Total</th><th>Statut</th><th>Action</th></tr></thead><tbody>${filtered.length ? filtered.map((order) => `<tr><td><div class="table-main-text">#${escapeHTML(order.id)}</div><div class="table-secondary">${orderCount(order)} article${orderCount(order) > 1 ? "s" : ""}</div></td><td><span class="badge">Table ${order.table}</span></td><td><div class="table-main-text">${escapeHTML(order.items.map((item) => `${item.quantity}× ${item.name}`).join(", "))}</div>${order.note ? `<div class="table-secondary">Note : ${escapeHTML(order.note)}</div>` : ""}</td><td class="hide-mobile">${escapeHTML(order.time)}</td><td class="table-main-text">${formatPrice(moneyForOrder(order))}</td><td>${statusBadge(order.status)}</td><td>${order.status !== "served" ? `<button class="button small ${order.status === "ready" ? "success" : ""}" data-advance="${order.id}">${order.status === "pending" ? "Préparer" : order.status === "preparing" ? "Marquer prête" : "Servie"}</button>` : `<button class="button secondary small" data-order-detail="${order.id}">Détail</button>`}</td></tr>`).join("") : `<tr><td colspan="7"><div class="empty-state">${icon("search")}<strong>Aucune commande trouvée</strong><span>Essayez un autre filtre ou une autre recherche.</span></div></td></tr>`}</tbody></table></div></section>`;
}

function tablesView() {
  return `<div class="page-heading"><div><h1>Tables & service</h1><p>Consultez la salle et gardez un œil sur les commandes en cours.</p></div><div class="heading-actions"><div class="date-chip"><span class="live-dot"></span>12 tables</div></div></div>
    <div class="stats-grid">${statCard("Tables libres", [...Array(12)].filter((_, index) => tableStatus(index + 1) === "free").length, "prêtes à accueillir", "tables", "green", false)}${statCard("En attente", state.orders.filter((order) => order.status === "pending").length, "à prendre en compte", "clock", "amber", false)}${statCard("En préparation", state.orders.filter((order) => order.status === "preparing").length, "en cuisine", "utensils", "blue", false)}${statCard("Prêtes à servir", state.orders.filter((order) => order.status === "ready").length, "à apporter en salle", "check", "green", false)}</div>
    <div class="table-list-view">${Array.from({ length: 12 }, (_, index) => tableTile(index + 1, true)).join("")}</div>`;
}

function productCard(product, customer = false) {
  return `<article class="${customer ? "customer-product" : "menu-card"}">
    <div class="menu-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.style.display='none'">${product.popular ? `<span class="badge">${icon("sparkles")} Best-seller</span>` : ""}</div>
    <div class="${customer ? "customer-product-body" : "menu-card-body"}">
      ${customer ? `<h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.description)}</p><div class="customer-product-bottom"><span class="customer-product-price">${formatPrice(product.price)}</span><button class="customer-add-button" data-product-detail="${product.id}" aria-label="Ajouter ${escapeHTML(product.name)}">${icon("plus")}</button></div>` :
        `<div class="menu-card-title-row"><h3>${escapeHTML(product.name)}</h3><span class="menu-card-price">${formatPrice(product.price)}</span></div><p>${escapeHTML(product.description)}</p><div class="menu-card-footer"><label class="toggle" aria-label="Disponibilité de ${escapeHTML(product.name)}"><input type="checkbox" data-availability="${product.id}" ${product.available ? "checked" : ""}><span class="toggle-track"></span></label><button class="button secondary small" data-product-detail="${product.id}">Modifier</button></div>`}
    </div>
  </article>`;
}

function menuView() {
  const categories = ["Tout", ...new Set(state.products.map((product) => product.category))];
  const products = state.products.filter((product) => {
    const matchesCategory = state.menuCategory === "Tout" || product.category === state.menuCategory;
    const query = state.menuSearch.toLowerCase().trim();
    return matchesCategory && (!query || `${product.name} ${product.description}`.toLowerCase().includes(query));
  });
  return `<div class="page-heading"><div><h1>La carte de la maison</h1><p>${state.products.filter((product) => product.available).length} produits disponibles sur ${state.products.length} références.</p></div><div class="heading-actions"><button class="button" data-action="add-product">${icon("plus")} Ajouter un produit</button></div></div>
    <div class="toolbar"><label class="search-field">${icon("search")}<input type="search" data-input="menuSearch" value="${escapeHTML(state.menuSearch)}" placeholder="Rechercher dans votre carte…"></label><div class="category-tabs">${categories.map((category) => `<button class="category-tab ${state.menuCategory === category ? "active" : ""}" data-menu-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div></div>
    <div class="menu-grid">${products.map((product) => productCard(product)).join("") || `<div class="empty-state" style="grid-column:1/-1">${icon("search")}<strong>Aucun produit trouvé</strong><span>Modifiez votre recherche ou ajoutez un produit.</span></div>`}</div>`;
}

function analyticsView() {
  const productTotals = new Map();
  state.orders.forEach((order) => order.items.forEach((item) => {
    const current = productTotals.get(item.productId) || { name: item.name, units: 0, sales: 0 };
    current.units += item.quantity;
    current.sales += item.price * item.quantity;
    productTotals.set(item.productId, current);
  }));
  const rankings = [...productTotals.values()].sort((a, b) => b.units - a.units).slice(0, 5);
  const barValues = [52, 69, 45, 80, 60, 92, 75];
  const days = ["Mer", "Jeu", "Ven", "Sam", "Dim", "Lun", "Mar"];
  return `<div class="page-heading"><div><h1>Les chiffres de la maison</h1><p>Une semaine gourmande et de belles habitudes qui s'installent.</p></div><div class="heading-actions"><select class="filter-select" aria-label="Période"><option>Cette semaine</option><option>Ce mois-ci</option><option>Cette année</option></select></div></div>
    <div class="stats-grid">${statCard("Ventes cette semaine", formatPrice(dailyRevenue() * 5.6), "+12,8 % vs. semaine passée", "money", "green")}${statCard("Commandes", `${Math.round(todayOrders() * 5.6)}`, "+8,2 % vs. semaine passée", "receipt", "blue")}${statCard("Panier moyen", formatPrice(dailyRevenue() / Math.max(todayOrders(), 1)), "+4,1 % vs. semaine passée", "chart", "")}${statCard("Meilleure heure", "11h – 12h", "votre heure en or", "clock", "amber")}</div>
    <div class="analytics-layout"><section class="panel"><div class="panel-header"><div><div class="panel-title">Évolution des ventes</div><div class="panel-caption">Chiffre d'affaires journalier · cette semaine</div></div><span class="badge ready">+12,8 %</span></div><div class="panel-body"><div class="analytics-bars">${barValues.map((value, index) => `<div class="analytics-bar-group"><span class="analytics-bar-value">${formatPrice(dailyRevenue() * value / 350)}</span><div class="analytics-bar" style="height:${value}%"></div><span class="chart-label">${days[index]}</span></div>`).join("")}</div></div></section>
    <section class="panel"><div class="panel-header"><div><div class="panel-title">Vos meilleures ventes</div><div class="panel-caption">Les préférées de vos clients</div></div>${icon("sparkles")}</div><div class="panel-body"><div class="product-ranking">${rankings.map((item, index) => `<div class="ranking-row"><div class="ranking-number">0${index + 1}</div><div><div class="ranking-name">${escapeHTML(item.name)}</div><div class="ranking-units">${item.units} vendus</div></div><div class="ranking-sales">${formatPrice(item.sales)}</div></div>`).join("") || `<div class="empty-state"><strong>Pas encore de ventes</strong><span>Vos chiffres apparaîtront ici.</span></div>`}</div></div></section></div>`;
}

function settingsView() {
  return `<div class="page-heading"><div><h1>Les petits réglages</h1><p>Votre espace, votre identité, votre manière de recevoir.</p></div></div><div class="settings-layout">
    <section class="panel"><div class="panel-header"><div><div class="panel-title">Votre établissement</div><div class="panel-caption">Les informations visibles par vos clients</div></div></div><div class="panel-body">
      <div class="setting-row"><div><div class="setting-label">Nom de la pâtisserie</div><div class="setting-help">Le nom affiché sur votre menu</div></div><input class="settings-input" data-setting="restaurantName" value="${escapeHTML(state.restaurantName)}"></div>
      <div class="setting-row"><div><div class="setting-label">Commandes en ligne</div><div class="setting-help">Accepter de nouvelles commandes à table</div></div><label class="toggle"><input type="checkbox" data-setting-open ${state.restaurantOpen ? "checked" : ""}><span class="toggle-track"></span></label></div>
      <div class="setting-row"><div><div class="setting-label">Numéro de tables</div><div class="setting-help">Votre salle est prête pour 12 tables</div></div><span class="badge ready">12 actives</span></div>
      <button class="button" data-action="save-settings" style="margin-top:14px">${icon("check")} Enregistrer les modifications</button>
    </div></section>
    <section class="panel"><div class="panel-header"><div><div class="panel-title">Votre menu digital</div><div class="panel-caption">Un accès simple et rapide pour vos clients</div></div></div><div class="panel-body">
      <div class="setting-row"><div><div class="setting-label">Menu à la table</div><div class="setting-help">Carte, panier et commandes sur mobile</div></div><span class="badge ready">Activé</span></div>
      <div class="setting-row"><div><div class="setting-label">Mode de démonstration</div><div class="setting-help">Essayez le parcours client complet</div></div><button class="button secondary small" data-action="customer-mode">Prévisualiser</button></div>
      <div class="setting-row"><div><div class="setting-label">Données de démonstration</div><div class="setting-help">Effacer les commandes et revenir à la démo</div></div><button class="button secondary small" data-action="reset-demo">${icon("trash")} Réinitialiser</button></div>
      <p class="panel-caption" style="line-height:1.6;margin-top:12px">Les données de cette démonstration restent enregistrées uniquement dans ce navigateur.</p>
    </div></section></div>`;
}

function renderPage() {
  const page = document.getElementById("page-content");
  const views = { dashboard: dashboardView, orders: ordersView, tables: tablesView, menu: menuView, analytics: analyticsView, settings: settingsView };
  page.innerHTML = (views[state.page] || dashboardView)();
}

function renderCustomer() {
  if (state.customerPage === "login" || state.customerPage === "register") {
    renderCustomerAuth(state.customerPage);
    return;
  }
  if (state.customerPage === "orders") {
    renderCustomerOrders();
    return;
  }
  const categories = ["Tout", ...new Set(state.products.map((product) => product.category))];
  const products = state.products.filter((product) => {
    if (!product.available) return false;
    const categoryMatch = state.customerCategory === "Tout" || product.category === state.customerCategory;
    const search = state.customerSearch.trim().toLowerCase();
    return categoryMatch && (!search || `${product.name} ${product.description}`.toLowerCase().includes(search));
  });
  const count = state.cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("app").innerHTML = `<div class="customer-mode">
    <header class="customer-header"><div class="customer-brand"><div class="brand-mark">${icon("cake")}</div><div><div class="brand-name">${escapeHTML(state.restaurantName)}</div><div class="brand-caption">Pâtisserie artisanale</div></div></div><div class="customer-header-actions"><span class="badge ${state.restaurantOpen ? "ready" : "served"}">${state.restaurantOpen ? "Ouvert" : "Fermé"}</span>${state.customer ? `<button class="button secondary" data-action="customer-orders">${icon("receipt")} Commandes</button><button class="button secondary" data-action="customer-logout">Se déconnecter</button>` : `<button class="button secondary" data-action="customer-account">${icon("users")} Mon compte</button>`}<button class="button secondary" data-action="back-office">${icon("grid")} Espace équipe</button></div></header>
    <main class="customer-content">
      <section class="customer-welcome"><div class="welcome-copy"><div class="eyebrow">Une pause tout en douceur</div><h1>Le bonheur se déguste ici.</h1><p>Découvrez nos créations maison et commandez depuis votre table.</p></div><div class="welcome-art"><img src="${productSeed[1].image}" alt="Tarte gourmande aux fruits"></div></section>
      <div class="table-notice"><div class="table-notice-icon">${state.tableNumber}</div><div><strong>Vous êtes à la table ${state.tableNumber}</strong><span>Votre commande nous parvient directement. Installez-vous, on s'occupe du reste.</span></div></div>
      <div class="customer-section-head"><div><h2>Faites-vous plaisir</h2><p>Des douceurs préparées avec amour ce matin.</p></div></div>
      <div class="customer-menu-toolbar"><label class="search-field">${icon("search")}<input type="search" data-input="customerSearch" value="${escapeHTML(state.customerSearch)}" placeholder="Une envie en particulier ?"></label><div class="category-tabs">${categories.map((category) => `<button class="category-tab ${state.customerCategory === category ? "active" : ""}" data-customer-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div></div>
      <div class="customer-menu-grid">${products.map((product) => productCard(product, true)).join("") || `<div class="empty-state" style="grid-column:1/-1"><strong>Aucune gourmandise trouvée</strong><span>Essayez un autre mot-clé ou une autre catégorie.</span></div>`}</div>
    </main>
    ${count ? `<button class="floating-cart" data-action="open-cart">${icon("bag")} Voir mon panier <span class="cart-count">${count}</span></button>` : ""}
  </div>`;
}

function renderCustomerAuth(mode) {
  const registering = mode === "register";
  const form = `<form id="customer-account-form" data-mode="${mode}">
    ${registering ? `<div class="form-field"><label for="customer-name">Nom complet</label><input id="customer-name" name="name" autocomplete="name" required minlength="2" maxlength="80"></div>` : ""}
    <div class="form-field"><label for="customer-email">Adresse e-mail</label><input id="customer-email" name="email" type="email" autocomplete="email" required maxlength="254"></div>
    <div class="form-field"><label for="customer-password">Mot de passe</label><input id="customer-password" name="password" type="password" autocomplete="${registering ? "new-password" : "current-password"}" required minlength="8" maxlength="128">${registering ? `<span class="form-help">8 caractères minimum</span>` : ""}</div>
    <button class="button customer-auth-submit" type="submit">${registering ? "Créer mon compte" : "Se connecter"}</button>
  </form>`;
  document.getElementById("app").innerHTML = `<div class="customer-mode">
    <header class="customer-header"><div class="customer-brand"><div class="brand-mark">${icon("cake")}</div><div><div class="brand-name">${escapeHTML(state.restaurantName)}</div><div class="brand-caption">Espace client</div></div></div><div class="customer-header-actions"><button class="button secondary" data-action="back-office">${icon("grid")} Espace équipe</button><button class="button secondary" data-action="customer-menu">${icon("arrow")} Retour à la carte</button></div></header>
    <main class="customer-auth-page"><div class="customer-auth-image" role="img" aria-label="Pâtisserie fraîchement préparée"></div><section class="customer-auth-panel"><div class="eyebrow">Votre espace gourmand</div><h1>${registering ? "Créer votre compte" : "Connexion client"}</h1><p>${registering ? "Retrouvez facilement le suivi de toutes vos commandes." : "Connectez-vous pour retrouver et suivre vos commandes."}</p>${form}<div class="customer-auth-switch">${registering ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}<button class="text-button" data-action="switch-account-mode" data-mode="${registering ? "login" : "register"}">${registering ? "Se connecter" : "Créer un compte"}</button></div></section></main>
  </div>`;
}

function renderCustomerOrders() {
  const orders = state.customerOrders;
  const orderCards = orders.map((order) => `<article class="customer-order">
    <div class="customer-order-head"><div><strong>Commande #${escapeHTML(order.id)}</strong><span>${escapeHTML(order.time)} · Table ${order.table}</span></div>${statusBadge(order.status)}</div>
    <div class="customer-order-items">${order.items.map((item) => `<div><span>${item.quantity} × ${escapeHTML(item.name)}</span><strong>${formatPrice(item.quantity * item.price)}</strong></div>`).join("")}</div>
    ${order.note ? `<p class="customer-order-note">Votre note : ${escapeHTML(order.note)}</p>` : ""}
    <div class="customer-order-total"><span>Total</span><strong>${formatPrice(moneyForOrder(order))}</strong></div>
  </article>`).join("");
  document.getElementById("app").innerHTML = `<div class="customer-mode">
    <header class="customer-header"><div class="customer-brand"><div class="brand-mark">${icon("cake")}</div><div><div class="brand-name">${escapeHTML(state.restaurantName)}</div><div class="brand-caption">Espace client · ${escapeHTML(state.customer.name)}</div></div></div><div class="customer-header-actions"><button class="button secondary" data-action="customer-menu">${icon("menu")} La carte</button><button class="button secondary" data-action="customer-logout">Se déconnecter</button></div></header>
    <main class="customer-content customer-orders-page"><div class="customer-section-head"><div><div class="eyebrow">Votre espace</div><h1>Mes commandes</h1><p>Le statut se met à jour automatiquement pendant la préparation.</p></div></div>
      <div class="customer-order-list">${orderCards || `<div class="customer-order-empty"><strong>Pas encore de commande</strong><span>Votre prochaine douceur apparaîtra ici après validation.</span><button class="button" data-action="customer-menu">${icon("menu")} Découvrir la carte</button></div>`}</div>
    </main>
  </div>`;
}

function render() {
  if (forceCustomerMenu && state.customerPage !== "menu") {
    state.customerPage = "menu";
  }
  if (state.customerMode) {
    renderCustomer();
    return;
  }
  if (!state.adminAuthenticated) {
    renderAdminLogin();
    return;
  }
  document.getElementById("app").innerHTML = appChrome();
  renderPage();
}

function renderAdminLogin() {
  document.getElementById("app").innerHTML = `<div class="customer-mode">
    <header class="customer-header"><div class="customer-brand"><div class="brand-mark">${icon("cake")}</div><div><div class="brand-name">${escapeHTML(state.restaurantName)}</div><div class="brand-caption">Espace équipe</div></div></div><div class="customer-header-actions"><button class="button secondary" data-action="customer-mode">${icon("arrow")} Espace client</button></div></header>
    <main class="customer-auth-page"><div class="customer-auth-image" role="img" aria-label="Pâtisserie de la maison"></div><section class="customer-auth-panel"><div class="eyebrow">Accès réservé</div><h1>Connexion équipe</h1><p>Connectez-vous pour gérer les commandes, les produits et les paramètres.</p><form id="admin-login-form"><div class="form-field"><label for="admin-email">Adresse e-mail</label><input id="admin-email" name="email" type="email" autocomplete="username" required></div><div class="form-field"><label for="admin-password">Mot de passe</label><input id="admin-password" name="password" type="password" autocomplete="current-password" required></div><button class="button customer-auth-submit" type="submit">Ouvrir l'espace équipe</button></form></section></main>
  </div>`;
}

function openModal(title, subtitle, body, className = "") {
  state.modal = true;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<section class="modal ${className}" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}">
    <div class="modal-header"><div><h2>${escapeHTML(title)}</h2>${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ""}</div><button class="icon-button" data-action="close-modal" aria-label="Fermer">${icon("close")}</button></div><div class="modal-body">${body}</div>
  </section>`;
  document.body.append(backdrop);
  backdrop.querySelector(".modal")?.focus();
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
  state.modal = null;
  state.detailProductId = null;
}

function addToCart(product, quantity = 1) {
  const existing = state.cart.find((item) => item.productId === product.id);
  if (existing) existing.quantity += quantity;
  else state.cart.push({ productId: product.id, name: product.name, price: product.price, image: product.image, quantity });
  if (state.customerMode) {
    renderCustomer();
    showToast(`${product.name} ajouté au panier`);
  } else {
    render();
    showToast("Produit ajouté à la commande");
  }
}

function openProductDetail(productId, customer) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) {
    showToast("Ce produit n'est plus disponible.", true);
    return;
  }
  state.detailProductId = product.id;
  state.detailQuantity = 1;
  const body = `<img class="product-detail-image" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}"><p class="product-detail-description">${escapeHTML(product.description)}</p><div style="display:flex;align-items:center;justify-content:space-between;margin-top:17px"><span style="font-family:'Playfair Display',serif;font-size:21px;font-weight:600">${formatPrice(product.price)}</span><div class="quantity-control"><button data-action="quantity-minus" aria-label="Diminuer">−</button><span id="detail-quantity">1</span><button data-action="quantity-plus" aria-label="Augmenter">+</button></div></div><div class="modal-actions"><button class="button" data-action="add-detail" data-customer="${customer}">${icon("plus")} ${customer ? "Ajouter au panier" : "Ajouter à la commande"}</button></div>`;
  openModal(product.name, product.category, body);
}

function openCart() {
  if (!state.cart.length) {
    openModal("Votre panier", `Table ${state.tableNumber}`, `<div class="cart-empty">${icon("bag")}<br>Votre panier est encore vide.<br>Il ne manque qu'une petite douceur !</div>`);
    return;
  }
  const items = state.cart.map((item, index) => `<div class="cart-item"><img src="${escapeHTML(item.image)}" alt=""><div><div class="cart-item-name">${escapeHTML(item.name)}</div><div class="cart-item-sub">${item.quantity} × ${formatPrice(item.price)}</div></div><div style="text-align:right"><div class="cart-item-name">${formatPrice(item.price * item.quantity)}</div><button class="cart-remove" data-remove-cart="${index}" aria-label="Retirer">${icon("trash")}</button></div></div>`).join("");
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const body = `<div>${items}</div><div class="cart-total"><span>Total</span><span>${formatPrice(total)}</span></div><div class="form-field" style="margin-top:15px"><label for="order-note">Un petit mot pour l'équipe ? (facultatif)</label><textarea id="order-note" placeholder="Sans sucre, allergie, une petite attention…"></textarea></div><div class="modal-actions"><button class="button secondary" data-action="close-modal">Continuer mes envies</button><button class="button" data-action="submit-order">${icon("check")} Valider la commande</button></div>`;
  openModal("Votre panier", `Table ${state.tableNumber} · Un dernier coup d'œil avant de régaler vos papilles`, body);
}

function openTableQr(table) {
  const menuUrl = new URL(window.location.href);
  menuUrl.searchParams.set("table", String(table));
  const isLocalPreview = window.location.protocol === "file:";
  const qrUrl = isLocalPreview ? "" : `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(menuUrl.href)}`;
  const qrContent = isLocalPreview
    ? `<div class="qr-placeholder">${icon("tables")}<strong>Votre menu est prêt à être partagé</strong><span>Hébergez cette application pour générer un QR code accessible depuis les téléphones de vos clients.</span></div>`
    : `<img class="qr-image" src="${qrUrl}" alt="QR code du menu pour la table ${table}">`;
  const body = `<div class="qr-card">${qrContent}<p>${isLocalPreview ? "Chaque QR code ouvrira le menu sur sa table dédiée dès que l'application sera hébergée." : `Scannez ce code pour ouvrir le menu digital directement à la table ${table}.`}</p>${isLocalPreview ? "" : `<div class="qr-url">${escapeHTML(menuUrl.href)}</div><div class="modal-actions"><button class="button secondary" data-action="close-modal">Fermer</button><button class="button" data-action="print-qr">${icon("printer")} Imprimer le QR</button></div>`}</div>`;
  openModal(`QR code · Table ${table}`, "Un menu, une table, une commande simplifiée.", body);
}

function showConfirmation(order) {
  closeModal();
  state.confirmation = order;
  openModal("Commande envoyée", "", `<div class="confirmation-content"><div class="confirmation-check">${icon("check")}</div><h2>C'est noté, merci !</h2><p>Votre commande <strong>#${escapeHTML(order.id)}</strong> est bien partie en cuisine. Nous revenons vous voir à la table ${order.table} dès qu'elle est prête.</p><span class="badge pending">En attente</span><div style="margin-top:16px;font-size:12px;font-weight:700">Total : ${formatPrice(moneyForOrder(order))}</div><div class="modal-actions" style="justify-content:center">${state.customer ? `<button class="button secondary" data-action="customer-orders">Suivre ma commande</button>` : ""}<button class="button" data-action="close-confirmation">Retour à la carte</button></div></div>`);
}

function openCustomerAccount(mode = "login") {
  if (!state.backendConnected) {
    showToast("Démarrez le serveur pour créer un compte client.", true);
    return;
  }
  if (state.modal) closeModal();
  state.customerPage = mode;
  renderCustomer();
}

async function advanceOrder(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order || !statusFlow[order.status]) return;
  if (state.backendConnected) {
    const updated = await apiRequest(`/api/orders/${encodeURIComponent(orderId)}/status`, {
      method: "PATCH",
      body: { status: statusFlow[order.status] },
    });
    order.status = updated.status;
  } else {
    order.status = statusFlow[order.status];
  }
  persist();
  render();
  showToast(`Commande ${orderId} · ${statusLabels[order.status].toLowerCase()}`);
}

function exportOrders() {
  const rows = [["Commande", "Table", "Heure", "Articles", "Total", "Statut"], ...state.orders.map((order) => [
    order.id,
    order.table,
    order.time,
    order.items.map((item) => `${item.quantity}x ${item.name}`).join(" | "),
    moneyForOrder(order),
    statusLabels[order.status],
  ])];
  const csv = rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "douceur-commandes.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Votre export des commandes est prêt.");
}

function addProduct() {
  const body = `<form id="product-form"><div class="form-field"><label for="new-name">Nom du produit</label><input id="new-name" name="name" required maxlength="60" placeholder="Ex. Tarte au citron"></div><div class="form-grid"><div class="form-field"><label for="new-price">Prix (XAF)</label><input id="new-price" name="price" type="number" min="50" max="100000000" step="50" required placeholder="2 500"></div><div class="form-field"><label for="new-category">Catégorie</label><select id="new-category" name="category"><option>Pâtisseries</option><option>Viennoiseries</option><option>Boissons</option><option>Autres douceurs</option></select></div></div><div class="form-field"><label for="new-description">Description</label><textarea id="new-description" name="description" maxlength="180" placeholder="Décrivez cette délicieuse création…"></textarea></div><div class="form-field"><label for="new-image">Photo du produit</label><input id="new-image" name="image" type="url" placeholder="https://… ou choisissez un fichier ci-dessous"></div><div class="form-field"><label for="new-image-file">Télécharger une image</label><input id="new-image-file" name="imageFile" type="file" accept="image/*" data-image-target="new-image"></div><div class="modal-actions"><button type="button" class="button secondary" data-action="close-modal">Annuler</button><button class="button" type="submit">${icon("plus")} Ajouter à la carte</button></div></form>`;
  openModal("Une nouvelle douceur", "Faites une belle place à votre nouvelle création", body);
}

function openProductForm(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  const body = `<form id="edit-product-form" data-product-id="${product.id}"><div class="form-field"><label for="edit-name">Nom du produit</label><input id="edit-name" name="name" required maxlength="60" value="${escapeHTML(product.name)}"></div><div class="form-grid"><div class="form-field"><label for="edit-price">Prix (XAF)</label><input id="edit-price" name="price" type="number" min="50" max="100000000" step="50" required value="${product.price}"></div><div class="form-field"><label for="edit-category">Catégorie</label><select id="edit-category" name="category">${["Pâtisseries", "Viennoiseries", "Boissons", "Autres douceurs"].map((category) => `<option ${product.category === category ? "selected" : ""}>${category}</option>`).join("")}</select></div></div><div class="form-field"><label for="edit-description">Description</label><textarea id="edit-description" name="description" maxlength="180">${escapeHTML(product.description)}</textarea></div><div class="form-field"><label for="edit-image">Photo du produit</label><input id="edit-image" name="image" type="url" value="${escapeHTML(product.image)}"></div><div class="form-field"><label for="edit-image-file">Télécharger une image</label><input id="edit-image-file" name="imageFile" type="file" accept="image/*" data-image-target="edit-image"></div><div class="modal-actions"><button type="button" class="button secondary" data-action="close-modal">Annuler</button><button class="button" type="submit">${icon("check")} Enregistrer</button></div></form>`;
  openModal("Modifier le produit", product.name, body);
}

function orderDetail(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const items = order.items.map((item) => `<div class="cart-item"><div class="order-table">${item.quantity}×</div><div><div class="cart-item-name">${escapeHTML(item.name)}</div><div class="cart-item-sub">${formatPrice(item.price)} l'unité</div></div><div class="cart-item-name">${formatPrice(item.quantity * item.price)}</div></div>`).join("");
  openModal(`Commande #${order.id}`, `Table ${order.table} · ${order.time}`, `${items}<div class="cart-total"><span>Total</span><span>${formatPrice(moneyForOrder(order))}</span></div>${order.note ? `<p class="panel-caption" style="margin-top:10px">Note : ${escapeHTML(order.note)}</p>` : ""}<div style="margin-top:10px">${statusBadge(order.status)}</div>`);
}

async function handleAction(action, target) {
  switch (action) {
    case "customer-mode":
      state.customerMode = true;
      state.customerSearch = "";
      state.customerPage = forceCustomerMenu ? "menu" : "menu";
      render();
      window.scrollTo(0, 0);
      break;
    case "back-office":
      state.customerMode = false;
      state.adminAuthenticated = (await apiRequest("/api/admin/session")).authenticated;
      if (state.adminAuthenticated) {
        installServerState(await apiRequest("/api/admin/bootstrap"));
        state.page = "dashboard";
      }
      render();
      window.scrollTo(0, 0);
      break;
    case "admin-logout":
      await apiRequest("/api/admin/logout", { method: "POST", body: {} });
      state.adminAuthenticated = false;
      state.customer = null;
      state.customerMode = true;
      state.customerPage = "login";
      render();
      showToast("Vous êtes déconnecté de l'espace équipe.");
      break;
    case "customer-account":
      state.authReturn = "menu";
      openCustomerAccount();
      break;
    case "customer-orders":
      if (!state.customer) {
        state.authReturn = "orders";
        openCustomerAccount();
        break;
      }
      state.customerOrders = await apiRequest("/api/customer/orders");
      state.customerPage = "orders";
      closeModal();
      renderCustomer();
      window.scrollTo(0, 0);
      break;
    case "customer-menu":
      state.customerPage = "menu";
      closeModal();
      renderCustomer();
      window.scrollTo(0, 0);
      break;
    case "customer-logout":
      await apiRequest("/api/customer/logout", { method: "POST", body: {} });
      state.customer = null;
      state.customerOrders = [];
      state.customerPage = "menu";
      renderCustomer();
      showToast("Vous êtes déconnecté.");
      break;
    case "switch-account-mode":
      openCustomerAccount(target.dataset.mode);
      break;
    case "open-cart":
      openCart();
      break;
    case "close-modal":
      closeModal();
      break;
    case "close-confirmation":
      closeModal();
      state.cart = [];
      state.confirmation = null;
      renderCustomer();
      window.scrollTo(0, 0);
      break;
    case "quantity-minus":
      state.detailQuantity = Math.max(1, state.detailQuantity - 1);
      document.getElementById("detail-quantity").textContent = state.detailQuantity;
      break;
    case "quantity-plus":
      state.detailQuantity += 1;
      document.getElementById("detail-quantity").textContent = state.detailQuantity;
      break;
    case "add-detail": {
      const product = state.products.find((item) => item.id === state.detailProductId);
      if (product) addToCart(product, state.detailQuantity);
      closeModal();
      break;
    }
    case "submit-order": {
      if (!state.restaurantOpen) {
        showToast("La pâtisserie est fermée aux nouvelles commandes.", true);
        return;
      }
      if (!state.cart.length) {
        showToast("Ajoutez au moins une gourmandise avant de valider.", true);
        return;
      }
      if (!state.customer) {
        state.authReturn = "checkout";
        closeModal();
        openCustomerAccount();
        showToast("Connectez-vous ou créez un compte pour suivre votre commande.");
        return;
      }
      const payload = {
        table: state.tableNumber,
        items: state.cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        note: document.getElementById("order-note")?.value.trim() || "",
      };
      let order;
      if (state.backendConnected) {
        order = await apiRequest("/api/orders", { method: "POST", body: payload });
        state.orders.unshift(order);
      } else {
        const id = `DX-${Math.max(1042, ...state.orders.map((item) => Number(item.id.split("-")[1]) || 0)) + 1}`;
        order = {
          id,
          table: payload.table,
          items: state.cart.map((item) => ({ productId: item.productId, name: item.name, quantity: item.quantity, price: item.price })),
          status: "pending",
          time: new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
          note: payload.note,
        };
        state.orders.unshift(order);
      }
      persist();
      showConfirmation(order);
      break;
    }
    case "notify":
      showToast(liveOrders().length ? `${liveOrders().length} commande${liveOrders().length > 1 ? "s" : ""} attend${liveOrders().length > 1 ? "ent" : ""} votre attention.` : "Aucune nouvelle commande pour le moment.");
      break;
    case "export":
      exportOrders();
      break;
    case "print-qr":
      window.print();
      break;
    case "add-product":
      addProduct();
      break;
    case "save-settings": {
      const input = document.querySelector('[data-setting="restaurantName"]');
      const name = input?.value.trim() || state.restaurantName;
      if (state.backendConnected) {
        const updated = await apiRequest("/api/settings", { method: "PATCH", body: { name } });
        state.restaurantName = updated.name;
      } else {
        state.restaurantName = name;
      }
      persist();
      render();
      showToast("Vos paramètres ont bien été enregistrés.");
      break;
    }
    case "reset-demo":
      if (state.backendConnected) {
        const resetState = await apiRequest("/api/demo/reset", { method: "POST" });
        installServerState(resetState);
      } else {
        state.orders = seededOrders.map((order) => ({ ...order, items: order.items.map((item) => ({ ...item })) }));
        state.products = productSeed.map((product) => ({ ...product }));
        state.tableStatuses = {};
        state.restaurantName = "ANA MARIE PATISSERIE";
        state.restaurantOpen = true;
        persist();
      }
      state.cart = [];
      render();
      showToast("La démonstration est revenue à son état initial.");
      break;
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-backdrop")) {
    closeModal();
    return;
  }
  const target = event.target.closest("button, [data-action], [data-page], [data-product-detail], [data-advance], [data-order-detail], [data-remove-cart], [data-table], [data-table-toggle], [data-table-qr], [data-menu-category], [data-customer-category]");
  if (!target) return;

  if (target.dataset.page) {
    state.customerMode = false;
    state.page = target.dataset.page;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (target.dataset.action) {
    void handleAction(target.dataset.action, target).catch((error) => showToast(error.message, true));
    return;
  }
  if (target.dataset.productDetail) {
    if (state.customerMode) openProductDetail(target.dataset.productDetail, true);
    else openProductForm(target.dataset.productDetail);
    return;
  }
  if (target.dataset.advance) {
    void advanceOrder(target.dataset.advance).catch((error) => showToast(error.message, true));
    return;
  }
  if (target.dataset.orderDetail) {
    orderDetail(target.dataset.orderDetail);
    return;
  }
  if (target.dataset.removeCart !== undefined) {
    state.cart.splice(Number(target.dataset.removeCart), 1);
    closeModal();
    render();
    if (state.customerMode) renderCustomer();
    else showToast("Produit retiré du panier.");
    if (state.customerMode) showToast("Produit retiré du panier.");
    return;
  }
  if (target.dataset.table) {
    state.page = "tables";
    render();
    showToast(`État de la table ${target.dataset.table} affiché.`);
    return;
  }
  if (target.dataset.tableToggle) {
    void (async () => {
      const table = target.dataset.tableToggle;
      const status = tableStatus(Number(table)) === "reserved" ? "free" : "reserved";
      if (state.backendConnected) {
        const tableStatuses = await apiRequest(`/api/tables/${table}`, { method: "PATCH", body: { status } });
        state.tableStatuses = tableStatuses;
      } else {
        state.tableStatuses[table] = status;
      }
      persist();
      render();
      showToast(`Table ${table} mise à jour.`);
    })().catch((error) => showToast(error.message, true));
    return;
  }
  if (target.dataset.tableQr) {
    openTableQr(Number(target.dataset.tableQr));
    return;
  }
  if (target.dataset.menuCategory !== undefined) {
    state.menuCategory = target.dataset.menuCategory;
    renderPage();
    return;
  }
  if (target.dataset.customerCategory !== undefined) {
    state.customerCategory = target.dataset.customerCategory;
    renderCustomer();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.matches('input[type="file"][data-image-target]')) {
    const file = target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      showToast("Sélectionnez un fichier image valide.", true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageInput = document.getElementById(target.dataset.imageTarget);
      if (imageInput) imageInput.value = String(reader.result || "");
    };
    reader.readAsDataURL(file);
    return;
  }
  if (target.matches('[data-select="orderFilter"]')) {
    state.orderFilter = target.value;
    renderPage();
  }
  if (target.matches("[data-availability]")) {
    void (async () => {
      const product = state.products.find((item) => item.id === target.dataset.availability);
      if (!product) return;
      if (state.backendConnected) {
        const updated = await apiRequest(`/api/products/${encodeURIComponent(product.id)}/availability`, {
          method: "PATCH",
          body: { available: target.checked },
        });
        product.available = updated.available;
      } else {
        product.available = target.checked;
      }
      persist();
      renderPage();
      showToast(`${product.name} ${product.available ? "est de nouveau disponible" : "a été retiré de la carte"}.`);
    })().catch((error) => {
      target.checked = !target.checked;
      showToast(error.message, true);
    });
  }
  if (target.matches("[data-setting-open]")) {
    void (async () => {
      if (state.backendConnected) {
        const updated = await apiRequest("/api/settings", { method: "PATCH", body: { open: target.checked } });
        state.restaurantOpen = updated.open;
      } else {
        state.restaurantOpen = target.checked;
      }
      persist();
      render();
      showToast(state.restaurantOpen ? "Les commandes sont ouvertes." : "Les commandes sont maintenant fermées.");
    })().catch((error) => {
      target.checked = !target.checked;
      showToast(error.message, true);
    });
  }
  if (target.id === "product-form") return;
  if (target.matches('input[data-setting="restaurantName"]')) {
    state.restaurantName = target.value.trim() || "ANA MARIE PATISSERIE";
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.dataset.input === "orderSearch") {
    const position = target.selectionStart;
    state.orderSearch = target.value;
    renderPage();
    const next = document.querySelector('[data-input="orderSearch"]');
    next?.focus();
    next?.setSelectionRange(position, position);
  }
  if (target.dataset.input === "menuSearch") {
    const position = target.selectionStart;
    state.menuSearch = target.value;
    renderPage();
    const next = document.querySelector('[data-input="menuSearch"]');
    next?.focus();
    next?.setSelectionRange(position, position);
  }
  if (target.dataset.input === "customerSearch") {
    const position = target.selectionStart;
    state.customerSearch = target.value;
    renderCustomer();
    const next = document.querySelector('[data-input="customerSearch"]');
    next?.focus();
    next?.setSelectionRange(position, position);
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "admin-login-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const body = { email: String(form.get("email")).trim(), password: String(form.get("password")) };
    void (async () => {
      await apiRequest("/api/admin/login", { method: "POST", body });
      state.adminAuthenticated = true;
      state.customer = null;
      state.customerMode = false;
      installServerState(await apiRequest("/api/admin/bootstrap"));
      render();
      showToast("Connexion équipe réussie.");
    })().catch((error) => showToast(error.message, true));
  }
  if (event.target.id === "customer-account-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const mode = event.target.dataset.mode;
    const endpoint = mode === "register" ? "/api/customer/register" : "/api/customer/login";
    const body = {
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
      ...(mode === "register" ? { name: String(form.get("name")).trim() } : {}),
    };
    void (async () => {
      const result = await apiRequest(endpoint, { method: "POST", body });
      state.customer = result.customer;
      state.customerOrders = await apiRequest("/api/customer/orders");
      state.customerPage = state.authReturn === "checkout" ? "menu" : "orders";
      renderCustomer();
      showToast(mode === "register" ? "Votre compte est prêt." : "Vous êtes connecté.");
      if (state.authReturn === "checkout") openCart();
      state.authReturn = "menu";
    })().catch((error) => showToast(error.message, true));
  }
  if (event.target.id === "product-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = String(form.get("name")).trim();
    const price = Number(form.get("price"));
    if (!name || !Number.isFinite(price) || price <= 0) {
      showToast("Saisissez un nom et un prix valides.", true);
      return;
    }
    const customImage = String(form.get("image") || "").trim();
    const productPayload = {
      name,
      category: String(form.get("category")),
      price,
      description: String(form.get("description") || "").trim() || "Une création artisanale préparée avec amour.",
      image: customImage || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
    };
    void (async () => {
      const product = state.backendConnected
        ? await apiRequest("/api/products", { method: "POST", body: productPayload })
        : { ...productPayload, id: `produit-${Date.now()}`, available: true, popular: false };
      state.products.push(product);
      persist();
      closeModal();
      render();
      showToast(`${name} a été ajouté à votre carte.`);
    })().catch((error) => showToast(error.message, true));
  }
  if (event.target.id === "edit-product-form") {
    event.preventDefault();
    const product = state.products.find((item) => item.id === event.target.dataset.productId);
    if (!product) return;
    const form = new FormData(event.target);
    const price = Number(form.get("price"));
    if (!String(form.get("name")).trim() || !Number.isFinite(price) || price <= 0) {
      showToast("Saisissez un nom et un prix valides.", true);
      return;
    }
    const updatedProduct = {
      name: String(form.get("name")).trim(),
      price,
      category: String(form.get("category")),
      description: String(form.get("description") || "").trim(),
      image: String(form.get("image") || "").trim() || product.image,
    };
    void (async () => {
      if (state.backendConnected) {
        Object.assign(product, await apiRequest(`/api/products/${encodeURIComponent(product.id)}`, { method: "PATCH", body: updatedProduct }));
      } else {
        Object.assign(product, updatedProduct);
      }
      persist();
      closeModal();
      render();
      showToast("Votre produit a bien été modifié.");
    })().catch((error) => showToast(error.message, true));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.modal) closeModal();
});

render();
void connectToBackend();
