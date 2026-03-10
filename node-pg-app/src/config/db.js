const { Pool } = require("pg");
const config = require("./env");

const pool = new Pool(config.db);

pool.on("connect", () => {
  console.log(`[db] Connected to PostgreSQL (${config.env}): ${config.db.database}`);
});

pool.on("error", (err) => {
  console.error("[db] Unexpected database error:", err.message);
});

module.exports = pool;
