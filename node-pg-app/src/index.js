const express = require("express");
const config = require("./config/env");
const db = require("./config/db");
const User = require("./models/user.model");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: config.env });
});

// Routes
app.use("/api/users", userRoutes);

// Start server after ensuring the DB table exists
async function start() {
  try {
    await db.query("SELECT 1"); // verify connection
    await User.createTable();

    app.listen(config.port, () => {
      console.log(`[server] Running in '${config.env}' mode on port ${config.port}`);
    });
  } catch (err) {
    console.error("[server] Failed to start:", err.message);
    process.exit(1);
  }
}

start();
