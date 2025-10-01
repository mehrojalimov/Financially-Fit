#!/bin/bash

# FinanciallyFit Deployment Script

echo "🚀 Starting FinanciallyFit Deployment..."

# Build frontend
echo "📦 Building frontend..."
cd Financially-Fit-main
npm run build

echo "✅ Frontend built successfully!"

echo ""
echo "🌐 Next Steps for Mobile Access:"
echo "1. Deploy frontend to Vercel: https://vercel.com"
echo "2. Deploy backend to Railway: https://railway.app"
echo "3. Update API URL in src/services/api.ts"
echo "4. Test on your phone!"
echo ""
echo "📱 Your app will work on any device once deployed!"
echo "Check DEPLOYMENT.md for detailed instructions."
