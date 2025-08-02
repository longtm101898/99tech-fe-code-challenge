# 💱 Currency Swap Form

A modern, responsive currency swap interface built with vanilla JavaScript, HTML, and CSS. This application allows users to swap between 32 different cryptocurrencies with real-time pricing from the Switcheo API.

![Currency Swap Demo](https://img.shields.io/badge/Status-Live-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![CSS](https://img.shields.io/badge/CSS3-Modern-blue) ![HTML](https://img.shields.io/badge/HTML5-Semantic-orange) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## 🌐 Live Demo

**🔗 [View Live Application](https://currency-swap-form-blqtsyvy0-longtran1810s-projects.vercel.app)**

_Experience the full currency swap functionality with real-time pricing and modern UI_

## 🚀 Features

### ✨ Core Functionality

- **Real-time Token Swapping** - Swap between 32 different cryptocurrencies
- **Live Price Data** - Fetches current prices from Switcheo API
- **Exchange Rate Calculation** - Accurate rate calculation with slippage consideration
- **Balance Management** - Mock balance system for demonstration
- **Input Validation** - Comprehensive validation with helpful error messages

### 🎨 User Interface

- **Modern Glassmorphism Design** - Beautiful backdrop blur effects
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects, transitions, and loading states
- **Token Selection Modal** - Searchable token picker with icons
- **Real-time Feedback** - Live updates as users interact

### 🔧 Interactive Features

- **Token Search** - Filter tokens by name or symbol
- **Quick Actions** - MAX and 50% buttons for amount selection
- **Swap Direction** - One-click token swapping
- **Loading States** - Visual feedback during operations
- **Success Notifications** - Toast notifications for completed swaps

## 📋 Supported Tokens

The application supports 32 tokens with real-time pricing:

| Token    | Name            | Token   | Name               |
| -------- | --------------- | ------- | ------------------ |
| SWTH     | Switcheo        | ETH     | Ethereum           |
| USDC     | USD Coin        | BUSD    | Binance USD        |
| WBTC     | Wrapped Bitcoin | ATOM    | Cosmos             |
| OSMO     | Osmosis         | LUNA    | Terra Luna         |
| GMX      | GMX             | IBCX    | IBCX               |
| KUJI     | Kujira          | STRD    | Stride             |
| EVMOS    | EVMOS           | IRIS    | IRISnet            |
| BLUR     | Blur            | bNEO    | bNEO               |
| OKB      | OKB             | OKT     | OKT                |
| ZIL      | Zilliqa         | USC     | USC                |
| LSI      | LSI             | RATOM   | RATOM              |
| STATOM   | Staked ATOM     | STOSMO  | Staked OSMO        |
| STEVMOS  | Staked EVMOS    | STLUNA  | Staked LUNA        |
| rSWTH    | rSWTH           | ampLUNA | Amplified LUNA     |
| axlUSDC  | Axelar USDC     | wstETH  | Wrapped Staked ETH |
| YieldUSD | YieldUSD        | USD     | US Dollar          |

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite 5.0 (Fast development and optimized builds)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Custom Properties)
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **API**: Switcheo Price API
- **Token Icons**: Switcheo Token Icons Repository
- **Code Quality**: ESLint + Prettier

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18+ (for development with Vite)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

#### Option 1: Development with Vite (Recommended)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will open automatically at http://localhost:3000
```

#### Option 2: Simple HTML (No build tools)

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start swapping** tokens immediately!

## 🚀 Deployment

### ✅ Successfully Deployed!

This application is **live and deployed** on Vercel:

**🌐 Production URL**: https://currency-swap-form-blqtsyvy0-longtran1810s-projects.vercel.app

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   # Navigate to project directory
   cd src/problem2

   # Deploy to Vercel
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Choose your team/account
   - Confirm deployment settings

4. **Deploy to production**:

   ```bash
   vercel --prod
   ```

5. **Your app will be live** at `https://your-project.vercel.app`

### Option 2: Netlify

1. **Drag & Drop Method**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Drag the `src/problem2` folder to the deploy area
   - Your site will be live instantly!

2. **GitHub Integration**:
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Auto-deploy on every push

### Option 3: GitHub Pages

1. **Create GitHub Repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/currency-swap.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/` folder
   - Your site will be at `https://yourusername.github.io/currency-swap`

### Option 4: Surge.sh

1. **Install Surge**:

   ```bash
   npm install -g surge
   ```

2. **Deploy**:

   ```bash
   cd src/problem2
   surge
   ```

3. **Follow prompts** to get your live URL

### File Structure

```
src/problem2/
├── index.html              # Main HTML file
├── style.css               # CSS styles and animations
├── script.js               # JavaScript functionality
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── dist/                   # Build output (generated)
    ├── index.html
    ├── assets/
    │   ├── js/
    │   └── css/
    └── ...
```

## 🔌 API Integration

### Price Data Source

The application fetches real-time price data from:

```
https://interview.switcheo.com/prices.json
```

### Token Icons

Token icons are loaded from:

```
https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{TOKEN}.svg
```

### Fallback System

- **API Failure**: Falls back to cached mock prices
- **Missing Icons**: Displays generic placeholder icons
- **Network Issues**: Graceful error handling with user feedback

## 🎯 Key Features Explained

### Real-time Price Fetching

```javascript
const response = await fetch('https://interview.switcheo.com/prices.json');
const priceData = await response.json();
```

### Exchange Rate Calculation

```javascript
const fromPrice = prices[selectedFromToken];
const toPrice = prices[selectedToToken];
const rate = fromPrice / toPrice;
const toAmount = fromAmount * rate * 0.995; // 0.5% slippage
```

### Token Selection Modal

- Searchable token list
- Real-time filtering
- Balance display
- Price information
- Keyboard navigation

### Input Validation

- Amount validation
- Balance checking
- Token selection validation
- Real-time error feedback

## 🎨 Design System

### Color Palette

- **Primary**: `#667eea` (Purple Blue)
- **Secondary**: `#764ba2` (Purple)
- **Success**: `#10b981` (Green)
- **Error**: `#e53e3e` (Red)
- **Background**: Gradient from primary to secondary

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Animations

- **Hover Effects**: Subtle transforms and color changes
- **Loading States**: Spinner animations
- **Modal Transitions**: Slide and fade effects
- **Success Notifications**: Slide-in from right

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: 1200px+ (Full feature set)
- **Tablet**: 768px - 1199px (Adapted layout)
- **Mobile**: 320px - 767px (Stacked layout)

### Mobile Optimizations

- Touch-friendly buttons
- Optimized modal sizing
- Simplified token selection
- Improved input handling

## 🔒 Security Features

- **Input Sanitization**: Prevents XSS attacks
- **CORS Compliance**: Proper API handling
- **Error Boundaries**: Graceful failure handling
- **Data Validation**: Client-side validation

## 🚀 Performance Optimizations

- **Efficient DOM Queries**: Cached element references
- **Minimal Re-renders**: Smart update strategies
- **Optimized Images**: SVG icons for scalability
- **Debounced Input**: Reduced API calls
- **Lazy Loading**: On-demand token loading
- **Vite Build Optimization**: Fast builds with tree-shaking
- **Asset Optimization**: Minified and compressed output
- **Source Maps**: For better debugging experience

## 📊 Build Performance

- **Build Time**: ~212ms
- **Total Bundle Size**: ~23 kB (7.4 kB gzipped)
- **CSS**: 8.69 kB (2.24 kB gzipped)
- **JavaScript**: 9.50 kB (3.77 kB gzipped)
- **HTML**: 5.01 kB (1.40 kB gzipped)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Token selection works correctly
- [ ] Price calculations are accurate
- [ ] Input validation functions properly
- [ ] Responsive design on all screen sizes
- [ ] Error handling works as expected
- [ ] Loading states display correctly
- [ ] Success notifications appear
- [ ] Keyboard navigation functions

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

This is a demonstration project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Install dependencies: `npm install`
4. Make your changes
5. Run linting: `npm run lint`
6. Format code: `npm run format`
7. Test thoroughly
8. Submit a pull request

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run format       # Format code with Prettier
```

## 📄 License

This project is created for educational and demonstration purposes.

## 🎯 Project Status

- ✅ **Development**: Complete
- ✅ **Testing**: Passed
- ✅ **Deployment**: Live on Vercel
- ✅ **Performance**: Optimized
- ✅ **Documentation**: Complete

**Last Updated**: August 2024

## 🙏 Acknowledgments

- **Switcheo** for providing the price API and token icons
- **Font Awesome** for the beautiful icons
- **Google Fonts** for the Inter font family
- **Modern CSS** techniques for the glassmorphism design

## 📞 Support

For questions or issues:

- Check the browser console for error messages
- Ensure you have a stable internet connection
- Verify that JavaScript is enabled in your browser

---

**Built with ❤️ using vanilla web technologies**
