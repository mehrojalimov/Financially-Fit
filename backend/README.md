# FinanciallyFit Backend API

This is the backend API for the FinanciallyFit application, built with Node.js, Express, and SQLite.

## Features

- User authentication (register/login)
- Expense tracking
- Budget management
- Loan calculations
- SQLite database for data persistence

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Expenses
- `GET /api/expenses/:userId` - Get user expenses
- `POST /api/expenses` - Add new expense

### Budget
- `GET /api/budget/:userId` - Get user budget
- `POST /api/budget` - Save/update budget

### Loans
- `GET /api/loans/:userId` - Get user loans
- `POST /api/loans` - Save loan calculation

### Health Check
- `GET /api/health` - Check API status

## Database

The SQLite database (`financially_fit.db`) will be created automatically when you first run the server. It includes tables for:

- `users` - User accounts
- `expenses` - Expense records
- `budgets` - Budget configurations
- `loans` - Loan calculations

## Environment

- Port: 3001 (default)
- Database: SQLite (financially_fit.db)
- CORS: Enabled for frontend integration
