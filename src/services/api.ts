const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://financiallyfit-backend-production.up.railway.app/api'
  : 'http://localhost:3001/api';

// User API
export const userAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
    
    return response.json();
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
    
    return response.json();
  },
};

// Expenses API
export const expensesAPI = {
  getExpenses: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${userId}`);
    return response.json();
  },

  addExpense: async (userId: number, description: string, amount: number, category: string, date: string) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, description, amount, category, date }),
    });
    return response.json();
  },
};

// Budget API
export const budgetAPI = {
  getBudget: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/budget/${userId}`);
    return response.json();
  },

  saveBudget: async (userId: number, monthlyIncome: number, needsPercentage: number, wantsPercentage: number, savingsPercentage: number) => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, monthlyIncome, needsPercentage, wantsPercentage, savingsPercentage }),
    });
    return response.json();
  },
};

// Loans API
export const loansAPI = {
  getLoans: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/loans/${userId}`);
    return response.json();
  },

  saveLoan: async (userId: number, loanAmount: number, interestRate: number, loanPeriod: number, monthlyPayment: number, totalPayment: number) => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, loanAmount, interestRate, loanPeriod, monthlyPayment, totalPayment }),
    });
    return response.json();
  },
};
