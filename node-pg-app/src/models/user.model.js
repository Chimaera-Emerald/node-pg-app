const db = require("../config/db");

const User = {
  /**
   * Creates the users table if it does not already exist.
   */
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id        SERIAL PRIMARY KEY,
        name      VARCHAR(100) NOT NULL,
        email     VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await db.query(query);
    console.log("[model] Users table ready.");
  },
};

module.exports = User;
