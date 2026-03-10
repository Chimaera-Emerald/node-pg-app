const db = require("../config/db");

const UserService = {
  /**
   * Create a new user.
   * @param {string} name
   * @param {string} email
   * @returns {Promise<Object>} The created user row.
   */
  async create(name, email) {
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  },

  /**
   * Retrieve all users.
   * @returns {Promise<Array>}
   */
  async findAll() {
    const result = await db.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
  },

  /**
   * Retrieve a single user by ID.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  /**
   * Update a user's name and/or email.
   * @param {number} id
   * @param {string} name
   * @param {string} email
   * @returns {Promise<Object|null>} The updated user row, or null if not found.
   */
  async update(id, name, email) {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    return result.rows[0] || null;
  },

  /**
   * Delete a user by ID.
   * @param {number} id
   * @returns {Promise<boolean>} True if a row was deleted.
   */
  async delete(id) {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rowCount > 0;
  },
};

module.exports = UserService;
