#!/bin/bash

echo "🚀 Currency Swap Form - Deployment Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Deployment Options:"
echo "1. Vercel (Recommended):"
echo "   npm install -g vercel && vercel"
echo ""
echo "2. Netlify:"
echo "   - Go to netlify.com"
echo "   - Drag the 'dist' folder to deploy"
echo ""
echo "3. GitHub Pages:"
echo "   - Push to GitHub"
echo "   - Enable Pages in repository settings"
echo ""
echo "4. Surge.sh:"
echo "   npm install -g surge && surge dist"
echo ""
echo "📁 Your built files are in the 'dist' folder" 