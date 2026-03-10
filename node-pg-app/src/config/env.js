const path = require("path");
const fs = require("fs");

/**
 * Loads the correct .env file based on the NODE_ENV variable.
 * Defaults to "dev" if NODE_ENV is not set.
 * Falls back gracefully if the file is missing.
 */
function loadEnv() {
  const env = process.env.NODE_ENV || "dev";
  const envFile = path.resolve(process.cwd(), `.env.${env}`);

  if (!fs.existsSync(envFile)) {
    console.warn(`[config] Warning: ${envFile} not found. Relying on existing environment variables.`);
    return;
  }

  require("dotenv").config({ path: envFile });
  console.log(`[config] Loaded environment: ${env} (${envFile})`);
}

loadEnv();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

module.exports = config;
