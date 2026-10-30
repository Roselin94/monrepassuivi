import pg from "pg";

const { Pool } = pg;

export function createDbPool(connectionString) {
  if (!connectionString) return null;
  return new Pool({
    connectionString,
    ssl: connectionString.includes("render") || connectionString.includes("supabase") ? { rejectUnauthorized: false } : false,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}

export async function ensurePostgresSchema(pool) {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      available BOOLEAN NOT NULL DEFAULT TRUE,
      popular BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      table_number INTEGER NOT NULL,
      items JSONB NOT NULL,
      status TEXT NOT NULL,
      note TEXT,
      time TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      customer_id TEXT,
      expires_at TIMESTAMPTZ NOT NULL
    );
  `);
}
