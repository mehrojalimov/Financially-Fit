# FinanciallyFit

A modern, responsive personal finance management application built with React, TypeScript, and Tailwind CSS.

## Features

- **Budget Calculator**: Interactive 50/30/20 rule calculator with custom budget options
- **Spending Tracker**: Track expenses with categorization and spending summaries
- **Loan Calculator**: Calculate monthly and yearly loan payments with detailed breakdowns
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Professional interface with smooth animations and intuitive navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for state management
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   └── Navigation.tsx
├── pages/           # React page components
│   ├── Home.tsx
│   ├── SpendingTracker.tsx
│   ├── LoanCalculator.tsx
│   ├── About.tsx
│   ├── UserGuide.tsx
│   └── NotFound.tsx
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── App.tsx          # Main app component
├── main.tsx         # React entry point
└── index.css        # Global styles
```

## Features Overview

### Home Page
- Interactive budget calculator with 50/30/20 rule
- Custom budget percentage options
- Real-time calculations with validation
- Professional card-based layout

### Spending Tracker
- Add, edit, and delete expense entries
- Categorize expenses (Needs, Wants, Savings)
- Visual spending summary with percentages
- Responsive table for expense history

### Loan Calculator
- Calculate monthly and yearly payments
- Detailed payment breakdown
- Input validation and error handling
- Professional results display

### About Page
- Mission and approach information
- Community highlights
- Professional presentation

### User Guide
- Step-by-step getting started guide
- Interactive accordion interface
- Tips for financial success
- Understanding of budgeting rules

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details