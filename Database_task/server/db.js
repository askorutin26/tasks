import * as pg from "pg";

const { Pool } = pg.default;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "films_simple",
});

export default pool;
