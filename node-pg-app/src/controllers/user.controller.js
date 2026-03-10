const UserService = require("../services/user.service");

const UserController = {
  async create(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required." });
    }
    try {
      const user = await UserService.create(name, email);
      res.status(201).json(user);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({ error: "Email already in use." });
      }
      console.error("[controller] create error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async findAll(req, res) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (err) {
      console.error("[controller] findAll error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async findById(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await UserService.findById(id);
      if (!user) return res.status(404).json({ error: "User not found." });
      res.json(user);
    } catch (err) {
      console.error("[controller] findById error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required." });
    }
    try {
      const user = await UserService.update(id, name, email);
      if (!user) return res.status(404).json({ error: "User not found." });
      res.json(user);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({ error: "Email already in use." });
      }
      console.error("[controller] update error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async delete(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const deleted = await UserService.delete(id);
      if (!deleted) return res.status(404).json({ error: "User not found." });
      res.status(204).send();
    } catch (err) {
      console.error("[controller] delete error:", err.message);
      res.status(500).json({ error: "Internal server error." });
    }
  },
};

module.exports = UserController;
