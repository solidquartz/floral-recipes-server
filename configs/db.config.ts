// Database connections
import { Pool, PoolConfig } from "pg";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_URL } = process.env;

export const poolConfig: PoolConfig =
  process.env.NODE_ENV === 'production'
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
    : {
    user: DB_USER || "postgres",
    host: DB_HOST || "localhost",
    password: DB_PASSWORD || "sp0ck",
    port: Number(DB_PORT ?? 0) || 5432,
    database: DB_DATABASE || "floralrecipes",
  };

export const db = new Pool(poolConfig);
