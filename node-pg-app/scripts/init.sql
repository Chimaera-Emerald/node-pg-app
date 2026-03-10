-- Run this once per environment to create the database
-- Replace <db_name> with the appropriate value: app_dev, app_release, or app_prod

CREATE DATABASE app_dev;
CREATE DATABASE app_release;
CREATE DATABASE app_prod;

-- The users table is created automatically on app startup via user.model.js
-- But you can also run this manually:

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
