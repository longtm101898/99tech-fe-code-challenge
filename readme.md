# 99Tech Code Challenge
## 📋 Challenge Overview

This challenge consists of three separate problems that cover:

- **Problem 1**: Algorithm implementation with multiple (3) approaches
- **Problem 2**: Full-stack web application development
- **Problem 3**: Code debugging and refactoring

## 🎯 Problem Descriptions

### Problem 1: Sum to N Algorithm

**Location**: `src/problem1/`

**Challenge**: Implement a function to calculate the sum of integers from 1 to N using three different approaches.

**Solutions Provided**:

- **Mathematical Formula**: Uses the formula `n * (n + 1) / 2` for O(1) time complexity
- **Simple Loop**: Iterative approach with O(n) time complexity
- **Recursion**: Recursive solution with O(n) time and space complexity

**Key Learning**: Demonstrates understanding of algorithm optimization, time complexity analysis, and multiple implementation strategies.

---

### Problem 2: Currency Swap Web Application

**Location**: `src/problem2/`

**Challenge**: Build a modern, responsive web application for cryptocurrency swapping with real-time pricing.

**Features Implemented**:

- **Real-time Token Swapping**: Support for 32 different cryptocurrencies
- **Live Price Data**: Integration with Switcheo API for current prices
- **Modern UI/UX**: Glassmorphism design with responsive layout
- **Interactive Features**: Token search, quick actions, swap direction
- **Deployment Ready**: Configured for Vercel and Netlify deployment

**Tech Stack**: Vanilla JavaScript, HTML5, CSS3, Vite, Switcheo API

**Live Demo**: [Currency Swap Application](https://currency-swap-form-blqtsyvy0-longtran1810s-projects.vercel.app)

**Key Learning**: Full-stack development, API integration, modern web design, deployment strategies.

---

### Problem 3: React TypeScript Code Debugging

**Location**: `src/problem3/`

**Challenge**: Identify and fix critical bugs in a React TypeScript component that displays wallet balances.

**Issues Addressed**:

- **Runtime Crash**: Undefined variable causing application failure
- **Inverted Logic**: Filter logic showing wrong data (negative balances instead of positive)
- **Performance Issues**: Inefficient sorting and filtering
- **Type Safety**: Missing TypeScript interfaces and proper typing
- **Code Quality**: Anti-patterns and poor structure

**Solutions Provided**:

- Fixed undefined variable references
- Corrected filter logic to show positive balances only
- Optimized performance with proper memoization
- Added comprehensive TypeScript interfaces
- Improved code structure and readability

**Key Learning**: Debugging skills, React best practices, TypeScript implementation, code refactoring.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (for Problem 2 development)
- Modern web browser
- Code editor (VS Code recommended)

### Running the Solutions

#### Problem 1: Algorithm Testing

```bash
cd src/problem1
node sum_to_n.js
```

#### Problem 2: Web Application

```bash
cd src/problem2
npm install
npm run dev
```

#### Problem 3: Code Analysis

- Review `current_code.tsx` for the original buggy code
- Review `fix_code.tsx` for the corrected implementation
- Read `README.md` for detailed analysis and explanations

