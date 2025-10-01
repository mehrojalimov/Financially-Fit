// Vercel serverless function for user registration
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(process.cwd(), 'financially_fit.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDB = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (username.length < 3) {
    return res.status(400).json({ error: 'Username too short' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password too short' });
  }

  const password_hash = Buffer.from(password).toString('base64');

  db.run(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, password_hash],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ 
        message: 'User registered successfully',
        userId: this.lastID 
      });
    }
  );
}
