const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
initDatabase().catch(console.error);

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// User registration
app.post('/api/register', (req, res) => {
  console.log('Registration attempt:', { username: req.body.username, email: req.body.email });
  
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    console.log('Registration failed: Missing fields');
    return res.status(400).json({ 
      error: 'All fields are required',
      details: 'Username, email, and password must be provided',
      received: { username: !!username, email: !!email, password: !!password }
    });
  }

  // Validate input
  if (username.length < 3) {
    return res.status(400).json({ 
      error: 'Username too short',
      details: 'Username must be at least 3 characters long'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      error: 'Password too short',
      details: 'Password must be at least 6 characters long'
    });
  }

  // Simple password hashing (in production, use bcrypt)
  const password_hash = Buffer.from(password).toString('base64');

  db.run(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, password_hash],
    function(err) {
      if (err) {
        console.error('Registration error:', err);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ 
            error: 'Username or email already exists',
            details: 'Please choose a different username or email',
            suggestion: 'Try adding numbers or changing the username'
          });
        }
        return res.status(500).json({ 
          error: 'Database error during registration',
          details: err.message,
          code: err.code
        });
      }
      console.log('Registration successful:', { userId: this.lastID, username });
      res.json({ 
        message: 'User registered successfully',
        userId: this.lastID,
        username: username
      });
    }
  );
});

// User login
app.post('/api/login', (req, res) => {
  console.log('Login attempt:', { username: req.body.username });
  
  const { username, password } = req.body;
  
  if (!username || !password) {
    console.log('Login failed: Missing credentials');
    return res.status(400).json({ 
      error: 'Username and password are required',
      details: 'Both username and password must be provided',
      received: { username: !!username, password: !!password }
    });
  }

  const password_hash = Buffer.from(password).toString('base64');

  db.get(
    'SELECT * FROM users WHERE username = ? AND password_hash = ?',
    [username, password_hash],
    (err, row) => {
      if (err) {
        console.error('Login database error:', err);
        return res.status(500).json({ 
          error: 'Database error during login',
          details: err.message,
          code: err.code
        });
      }
      if (!row) {
        console.log('Login failed: Invalid credentials for username:', username);
        return res.status(401).json({ 
          error: 'Invalid credentials',
          details: 'Username or password is incorrect',
          suggestion: 'Check your username and password, or register a new account'
        });
      }
      console.log('Login successful:', { userId: row.id, username: row.username });
      res.json({ 
        message: 'Login successful',
        userId: row.id,
        username: row.username
      });
    }
  );
});

// Get user expenses
app.get('/api/expenses/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Add expense
app.post('/api/expenses', (req, res) => {
  const { userId, description, amount, category, date } = req.body;

  if (!userId || !description || !amount || !category || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO expenses (user_id, description, amount, category, date) VALUES (?, ?, ?, ?, ?)',
    [userId, description, amount, category, date],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ 
        message: 'Expense added successfully',
        expenseId: this.lastID 
      });
    }
  );
});

// Update budget
app.post('/api/budget', (req, res) => {
  const { userId, monthlyIncome, needsPercentage, wantsPercentage, savingsPercentage } = req.body;

  if (!userId || !monthlyIncome) {
    return res.status(400).json({ error: 'User ID and monthly income are required' });
  }

  // Check if budget exists
  db.get(
    'SELECT * FROM budgets WHERE user_id = ?',
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (row) {
        // Update existing budget
        db.run(
          'UPDATE budgets SET monthly_income = ?, needs_percentage = ?, wants_percentage = ?, savings_percentage = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
          [monthlyIncome, needsPercentage || 50, wantsPercentage || 30, savingsPercentage || 20, userId],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Budget updated successfully' });
          }
        );
      } else {
        // Create new budget
        db.run(
          'INSERT INTO budgets (user_id, monthly_income, needs_percentage, wants_percentage, savings_percentage) VALUES (?, ?, ?, ?, ?)',
          [userId, monthlyIncome, needsPercentage || 50, wantsPercentage || 30, savingsPercentage || 20],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Budget created successfully' });
          }
        );
      }
    }
  );
});

// Get user budget
app.get('/api/budget/:userId', (req, res) => {
  const { userId } = req.params;

  db.get(
    'SELECT * FROM budgets WHERE user_id = ?',
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(row || {});
    }
  );
});

// Save loan calculation
app.post('/api/loans', (req, res) => {
  const { userId, loanAmount, interestRate, loanPeriod, monthlyPayment, totalPayment } = req.body;

  if (!userId || !loanAmount || !interestRate || !loanPeriod || !monthlyPayment || !totalPayment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO loans (user_id, loan_amount, interest_rate, loan_period, monthly_payment, total_payment) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, loanAmount, interestRate, loanPeriod, monthlyPayment, totalPayment],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ 
        message: 'Loan calculation saved successfully',
        loanId: this.lastID 
      });
    }
  );
});

// Get user loans
app.get('/api/loans/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM loans WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'FinanciallyFit API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
