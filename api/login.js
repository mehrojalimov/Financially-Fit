// Vercel serverless function for user login
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(process.cwd(), 'financially_fit.db');
const db = new sqlite3.Database(dbPath);

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

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const password_hash = Buffer.from(password).toString('base64');

  db.get(
    'SELECT * FROM users WHERE username = ? AND password_hash = ?',
    [username, password_hash],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ 
        message: 'Login successful',
        userId: row.id,
        username: row.username 
      });
    }
  );
}
