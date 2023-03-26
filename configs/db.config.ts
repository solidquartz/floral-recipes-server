// Database connections
import { Pool } from "pg";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_URL } = process.env;

export const poolConfig = {
  user: DB_USER || "postgres",
  host: DB_HOST || "localhost",
  password: DB_PASSWORD || "sp0ck",
  port: Number(DB_PORT ?? 0) || 5432,
  database: DB_DATABASE || "floralrecipes",
};

export const db = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
