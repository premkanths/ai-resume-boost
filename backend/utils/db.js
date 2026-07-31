import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Open database connection
const dbPath = path.resolve(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Helper wrapper to run query inside Promise
export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Helper wrapper to fetch all rows
export const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize schema
export const initDb = async () => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      job_description TEXT,
      score INTEGER DEFAULT 0,
      result_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id TEXT DEFAULT 'Guest'
    );
  `;
  const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await run(createTableSql);
    await run(createUsersTableSql);
    
    // Safely migrate existing databases by appending user_id column if it is missing
    try {
      await run("ALTER TABLE resumes ADD COLUMN user_id TEXT DEFAULT 'Guest'");
      console.log("Database schema migrated: user_id column added to resumes table.");
    } catch (e) {
      // Column already exists, safe to ignore
    }
    
    console.log("Database tables initialized successfully.");
  } catch (err) {
    console.error("Error creating database tables:", err.message);
  }
};
export default db;
