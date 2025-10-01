const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://financiallyfit-backend-production.up.railway.app/api'
  : 'http://localhost:3001/api';

// User API - Using localStorage for demo purposes
export const userAPI = {
  register: async (username: string, email: string, password: string) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find((u: any) => u.username === username || u.email === email)) {
      throw new Error('Username or email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      username,
      email,
      password_hash: btoa(password), // Simple base64 encoding
      created_at: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return {
      message: 'User registered successfully',
      userId: newUser.id
    };
  },

  login: async (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password_hash === btoa(password));
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      message: 'Login successful',
      userId: user.id,
      username: user.username
    };
  },
};

// Expenses API - Using localStorage
export const expensesAPI = {
  getExpenses: async (userId: number) => {
    const expenses = JSON.parse(localStorage.getItem(`expenses_${userId}`) || '[]');
    return expenses;
  },

  addExpense: async (userId: number, description: string, amount: number, category: string, date: string) => {
    const expenses = JSON.parse(localStorage.getItem(`expenses_${userId}`) || '[]');
    const newExpense = {
      id: Date.now(),
      user_id: userId,
      description,
      amount,
      category,
      date,
      created_at: new Date().toISOString()
    };
    
    expenses.push(newExpense);
    localStorage.setItem(`expenses_${userId}`, JSON.stringify(expenses));
    
    return {
      message: 'Expense added successfully',
      expenseId: newExpense.id
    };
  },
};

// Budget API - Using localStorage
export const budgetAPI = {
  getBudget: async (userId: number) => {
    const budget = JSON.parse(localStorage.getItem(`budget_${userId}`) || '{}');
    return budget;
  },

  saveBudget: async (userId: number, monthlyIncome: number, needsPercentage: number, wantsPercentage: number, savingsPercentage: number) => {
    const budget = {
      user_id: userId,
      monthly_income: monthlyIncome,
      needs_percentage: needsPercentage,
      wants_percentage: wantsPercentage,
      savings_percentage: savingsPercentage,
      updated_at: new Date().toISOString()
    };
    
    localStorage.setItem(`budget_${userId}`, JSON.stringify(budget));
    
    return {
      message: 'Budget saved successfully'
    };
  },
};

// Loans API - Using localStorage
export const loansAPI = {
  getLoans: async (userId: number) => {
    const loans = JSON.parse(localStorage.getItem(`loans_${userId}`) || '[]');
    return loans;
  },

  saveLoan: async (userId: number, loanAmount: number, interestRate: number, loanPeriod: number, monthlyPayment: number, totalPayment: number) => {
    const loans = JSON.parse(localStorage.getItem(`loans_${userId}`) || '[]');
    const newLoan = {
      id: Date.now(),
      user_id: userId,
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_period: loanPeriod,
      monthly_payment: monthlyPayment,
      total_payment: totalPayment,
      created_at: new Date().toISOString()
    };
    
    loans.push(newLoan);
    localStorage.setItem(`loans_${userId}`, JSON.stringify(loans));
    
    return {
      message: 'Loan calculation saved successfully',
      loanId: newLoan.id
    };
  },
};
