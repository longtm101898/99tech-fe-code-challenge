// Constants
const CONSTANTS = {
  SLIPPAGE: 0.995,
  DECIMAL_PLACES: 6,
  PRICE_DECIMAL_PLACES: 4,
  API_URL: 'https://interview.switcheo.com/prices.json',
  ICON_BASE_URL:
    'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/',
  FALLBACK_ICON:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNlMmU4ZjAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4KPC9zdmc+',
  LOADING_DELAY: 2000,
  NOTIFICATION_DURATION: 3000,
  FOCUS_DELAY: 100,
  MIN_BALANCE: 0.1,
  MAX_BALANCE: 1000,
};

// Application state
const state = {
  tokens: [],
  prices: {},
  selectedFromToken: 'SWTH',
  selectedToToken: 'ETH',
  userBalances: {},
  isInitialized: false,
};

// DOM element cache
const elements = {};

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Memoization utility
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Initialize DOM elements
function initializeElements() {
  const elementIds = [
    'fromAmount',
    'toAmount',
    'fromTokenDisplay',
    'toTokenDisplay',
    'fromTokenIcon',
    'toTokenIcon',
    'fromTokenSymbol',
    'toTokenSymbol',
    'fromBalance',
    'toBalance',
    'exchangeRate',
    'swapButton',
    'swapButtonText',
    'fromError',
    'toError',
    'tokenModal',
    'tokenList',
    'tokenSearch',
    'loadingOverlay',
  ];

  elementIds.forEach(id => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id '${id}' not found`);
      return;
    }
    elements[id] = element;
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    initializeElements();
    showLoading(true);
    await initializeApp();
    state.isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showError('Failed to load token data. Please refresh the page.');
  } finally {
    showLoading(false);
  }
});

async function initializeApp() {
  // Load tokens and prices in parallel
  await Promise.all([loadTokens(), loadPrices()]);

  generateMockBalances();
  setupEventListeners();
  updateUI();
}

// Token data
const TOKEN_DATA = [
  { symbol: 'BLUR', name: 'Blur', icon: 'BLUR.svg' },
  { symbol: 'bNEO', name: 'bNEO', icon: 'NEO.svg' },
  { symbol: 'BUSD', name: 'Binance USD', icon: 'BUSD.svg' },
  { symbol: 'USD', name: 'US Dollar', icon: 'USD.svg' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'ETH.svg' },
  { symbol: 'GMX', name: 'GMX', icon: 'GMX.svg' },
  { symbol: 'STEVMOS', name: 'Staked EVMOS', icon: 'EVMOS.svg' },
  { symbol: 'LUNA', name: 'Terra Luna', icon: 'LUNA.svg' },
  { symbol: 'RATOM', name: 'RATOM', icon: 'ATOM.svg' },
  { symbol: 'STRD', name: 'Stride', icon: 'STRD.svg' },
  { symbol: 'EVMOS', name: 'EVMOS', icon: 'EVMOS.svg' },
  { symbol: 'IBCX', name: 'IBCX', icon: 'IBCX.svg' },
  { symbol: 'IRIS', name: 'IRISnet', icon: 'IRIS.svg' },
  { symbol: 'ampLUNA', name: 'Amplified LUNA', icon: 'LUNA.svg' },
  { symbol: 'KUJI', name: 'Kujira', icon: 'KUJI.svg' },
  { symbol: 'STOSMO', name: 'Staked OSMO', icon: 'OSMO.svg' },
  { symbol: 'USDC', name: 'USD Coin', icon: 'USDC.svg' },
  { symbol: 'axlUSDC', name: 'Axelar USDC', icon: 'USDC.svg' },
  { symbol: 'ATOM', name: 'Cosmos', icon: 'ATOM.svg' },
  { symbol: 'STATOM', name: 'Staked ATOM', icon: 'ATOM.svg' },
  { symbol: 'OSMO', name: 'Osmosis', icon: 'OSMO.svg' },
  { symbol: 'rSWTH', name: 'rSWTH', icon: 'SWTH.svg' },
  { symbol: 'STLUNA', name: 'Staked LUNA', icon: 'LUNA.svg' },
  { symbol: 'LSI', name: 'LSI', icon: 'LSI.svg' },
  { symbol: 'OKB', name: 'OKB', icon: 'OKB.svg' },
  { symbol: 'OKT', name: 'OKT', icon: 'OKT.svg' },
  { symbol: 'SWTH', name: 'Switcheo', icon: 'SWTH.svg' },
  { symbol: 'USC', name: 'USC', icon: 'USC.svg' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: 'WBTC.svg' },
  { symbol: 'wstETH', name: 'Wrapped Staked ETH', icon: 'ETH.svg' },
  { symbol: 'YieldUSD', name: 'YieldUSD', icon: 'USD.svg' },
  { symbol: 'ZIL', name: 'Zilliqa', icon: 'ZIL.svg' },
];

async function loadTokens() {
  state.tokens = TOKEN_DATA;
}

async function loadPrices() {
  try {
    const response = await fetch(CONSTANTS.API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const priceData = await response.json();
    state.prices = processPriceData(priceData);

    console.log('Loaded prices:', state.prices);
  } catch (error) {
    console.error('Failed to load prices:', error);
    state.prices = getFallbackPrices();
  }
}

function processPriceData(priceData) {
  const processedPrices = {};
  const priceMap = new Map();

  // Group by currency and find latest price
  priceData.forEach(item => {
    if (!item.currency || !item.price) return;

    const existing = priceMap.get(item.currency);
    if (!existing || new Date(item.date) > new Date(existing.date)) {
      priceMap.set(item.currency, {
        price: parseFloat(item.price),
        date: item.date,
      });
    }
  });

  // Convert to simple object
  priceMap.forEach((value, key) => {
    processedPrices[key] = value.price;
  });

  return processedPrices;
}

function getFallbackPrices() {
  return {
    SWTH: 0.004039850455012084,
    ETH: 1645.9337373737374,
    USDC: 0.989832,
    BUSD: 0.999183113,
    USD: 1,
    BLUR: 0.20811525423728813,
    bNEO: 7.1282679,
    GMX: 36.345114372881355,
    STEVMOS: 0.07276706779661017,
    LUNA: 0.40955638983050846,
    RATOM: 10.250918915254237,
    STRD: 0.7386553389830508,
    EVMOS: 0.06246181355932203,
    IBCX: 41.26811355932203,
    IRIS: 0.0177095593220339,
    ampLUNA: 0.49548589830508477,
    KUJI: 0.675,
    STOSMO: 0.431318,
    axlUSDC: 0.989832,
    ATOM: 7.186657333333334,
    STATOM: 8.512162050847458,
    OSMO: 0.3772974333333333,
    rSWTH: 0.00408771,
    STLUNA: 0.44232210169491526,
    LSI: 67.69661525423729,
    OKB: 42.97562059322034,
    OKT: 13.561577966101694,
    USC: 0.994,
    WBTC: 26002.82202020202,
    wstETH: 1872.2579742372882,
    YieldUSD: 1.0290847966101695,
    ZIL: 0.01651813559322034,
  };
}

function generateMockBalances() {
  state.userBalances = {};

  state.tokens.forEach(token => {
    const price = state.prices[token.symbol];
    if (price) {
      const maxTokens = Math.min(
        CONSTANTS.MAX_BALANCE,
        CONSTANTS.MAX_BALANCE / price
      );
      state.userBalances[token.symbol] =
        Math.random() * maxTokens + CONSTANTS.MIN_BALANCE;
    } else {
      state.userBalances[token.symbol] = 0;
    }
  });
}

function setupEventListeners() {
  // Debounced input handler for better performance
  const debouncedInputHandler = debounce(handleFromAmountChange, 150);

  elements.fromAmountInput?.addEventListener('input', debouncedInputHandler);
  elements.fromAmountInput?.addEventListener('blur', validateFromAmount);

  // Modal event listeners
  elements.tokenModal?.addEventListener('click', e => {
    if (e.target === elements.tokenModal) {
      closeTokenSelector();
    }
  });

  // Global keyboard listener
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTokenSelector();
    }
  });
}

// Memoized calculation functions
const calculateExchangeRate = memoize((fromToken, toToken) => {
  const fromPrice = state.prices[fromToken];
  const toPrice = state.prices[toToken];

  if (!fromPrice || !toPrice) return null;
  return fromPrice / toPrice;
});

const calculateToAmount = memoize((fromAmount, fromToken, toToken) => {
  const rate = calculateExchangeRate(fromToken, toToken);
  if (!rate || !fromAmount) return 0;

  return fromAmount * rate * CONSTANTS.SLIPPAGE;
});

function handleFromAmountChange() {
  const amount = parseFloat(elements.fromAmountInput?.value) || 0;
  const toAmount = calculateToAmount(
    amount,
    state.selectedFromToken,
    state.selectedToToken
  );

  if (elements.toAmountInput) {
    elements.toAmountInput.value = toAmount.toFixed(CONSTANTS.DECIMAL_PLACES);
  }

  updateSwapButton();
  clearErrors();
  updateExchangeRate();
}

function updateExchangeRate() {
  const rate = calculateExchangeRate(
    state.selectedFromToken,
    state.selectedToToken
  );

  if (!rate) {
    if (elements.exchangeRate) {
      elements.exchangeRate.textContent = 'Rate unavailable';
    }
    return;
  }

  if (elements.exchangeRate) {
    elements.exchangeRate.textContent = `1 ${state.selectedFromToken} = ${rate.toFixed(CONSTANTS.DECIMAL_PLACES)} ${state.selectedToToken}`;
  }
}

function updateSwapButton() {
  const amount = parseFloat(elements.fromAmountInput?.value) || 0;
  const balance = state.userBalances[state.selectedFromToken] || 0;

  let isDisabled = true;
  let buttonText = 'Enter an amount';

  if (amount > 0) {
    if (amount > balance) {
      buttonText = 'Insufficient balance';
    } else if (state.selectedFromToken === state.selectedToToken) {
      buttonText = 'Select different tokens';
    } else {
      isDisabled = false;
      buttonText = 'Confirm Swap';
    }
  }

  if (elements.swapButton) {
    elements.swapButton.disabled = isDisabled;
  }

  if (elements.swapButtonText) {
    elements.swapButtonText.textContent = buttonText;
  }
}

function validateFromAmount() {
  const amount = parseFloat(elements.fromAmountInput?.value) || 0;
  const balance = state.userBalances[state.selectedFromToken] || 0;

  if (amount > balance) {
    showError(
      `Insufficient balance. You have ${balance.toFixed(CONSTANTS.DECIMAL_PLACES)} ${state.selectedFromToken}`,
      'from'
    );
  } else if (amount <= 0 && elements.fromAmountInput?.value) {
    showError('Amount must be greater than 0', 'from');
  }
}

function clearErrors() {
  if (elements.fromError) elements.fromError.textContent = '';
  if (elements.toError) elements.toError.textContent = '';
}

function showError(message, field = 'general') {
  if (field === 'from' && elements.fromError) {
    elements.fromError.textContent = message;
  } else if (field === 'to' && elements.toError) {
    elements.toError.textContent = message;
  } else {
    console.error(message);
  }
}

// Token selection functions
function openTokenSelector(type) {
  if (!elements.tokenModal) return;

  elements.tokenModal.classList.add('active');
  elements.tokenModal.dataset.type = type;

  populateTokenList(type);

  setTimeout(() => {
    elements.tokenSearch?.focus();
  }, CONSTANTS.FOCUS_DELAY);
}

function closeTokenSelector() {
  if (!elements.tokenModal) return;

  elements.tokenModal.classList.remove('active');
  if (elements.tokenSearch) {
    elements.tokenSearch.value = '';
  }
  populateTokenList();
}

function populateTokenList(type = null) {
  if (!elements.tokenList) return;

  elements.tokenList.innerHTML = '';

  const searchTerm = elements.tokenSearch?.value.toLowerCase() || '';
  const filteredTokens = state.tokens.filter(
    token =>
      token.symbol.toLowerCase().includes(searchTerm) ||
      token.name.toLowerCase().includes(searchTerm)
  );

  const fragment = document.createDocumentFragment();

  filteredTokens.forEach(token => {
    const item = createTokenListItem(token, type);
    fragment.appendChild(item);
  });

  elements.tokenList.appendChild(fragment);
}

function createTokenListItem(token, type) {
  const item = document.createElement('div');
  item.className = 'token-item';

  const isSelected =
    (type === 'from' && token.symbol === state.selectedFromToken) ||
    (type === 'to' && token.symbol === state.selectedToToken);

  if (isSelected) {
    item.classList.add('selected');
  }

  const price = state.prices[token.symbol] || 0;
  const balance = state.userBalances[token.symbol] || 0;

  item.innerHTML = `
    <img src="${CONSTANTS.ICON_BASE_URL}${token.icon}" 
         alt="${token.symbol}" 
         onerror="this.src='${CONSTANTS.FALLBACK_ICON}'">
    <div class="token-info">
      <div class="token-symbol">${token.symbol}</div>
      <div class="token-name">${token.name}</div>
    </div>
    <div class="token-price">
      <div class="price">$${price.toFixed(CONSTANTS.PRICE_DECIMAL_PLACES)}</div>
      <div class="balance">Balance: ${balance.toFixed(CONSTANTS.PRICE_DECIMAL_PLACES)}</div>
    </div>
  `;

  item.addEventListener('click', () => selectToken(token.symbol, type));
  return item;
}

function selectToken(symbol, type) {
  if (type === 'from') {
    state.selectedFromToken = symbol;
  } else if (type === 'to') {
    state.selectedToToken = symbol;
  }

  updateUI();

  // Recalculate amount if there's a value
  const amount = parseFloat(elements.fromAmountInput?.value) || 0;
  if (amount > 0) {
    handleFromAmountChange();
  }

  closeTokenSelector();
}

function updateUI() {
  updateTokenDisplays();
  updateBalances();
  updateExchangeRate();
  updateSwapButton();
}

function updateTokenDisplays() {
  const fromToken = state.tokens.find(
    t => t.symbol === state.selectedFromToken
  );
  const toToken = state.tokens.find(t => t.symbol === state.selectedToToken);

  if (fromToken && elements.fromTokenIcon && elements.fromTokenSymbol) {
    elements.fromTokenIcon.src = `${CONSTANTS.ICON_BASE_URL}${fromToken.icon}`;
    elements.fromTokenSymbol.textContent = fromToken.symbol;
  }

  if (toToken && elements.toTokenIcon && elements.toTokenSymbol) {
    elements.toTokenIcon.src = `${CONSTANTS.ICON_BASE_URL}${toToken.icon}`;
    elements.toTokenSymbol.textContent = toToken.symbol;
  }
}

function updateBalances() {
  const fromBalanceAmount = state.userBalances[state.selectedFromToken] || 0;
  const toBalanceAmount = state.userBalances[state.selectedToToken] || 0;

  if (elements.fromBalance) {
    elements.fromBalance.textContent = fromBalanceAmount.toFixed(
      CONSTANTS.DECIMAL_PLACES
    );
  }
  if (elements.toBalance) {
    elements.toBalance.textContent = toBalanceAmount.toFixed(
      CONSTANTS.DECIMAL_PLACES
    );
  }
}

// Utility functions
function setMaxAmount(type) {
  if (type === 'from' && elements.fromAmountInput) {
    const balance = state.userBalances[state.selectedFromToken] || 0;
    elements.fromAmountInput.value = balance.toFixed(CONSTANTS.DECIMAL_PLACES);
    handleFromAmountChange();
  }
}

function setHalfAmount(type) {
  if (type === 'from' && elements.fromAmountInput) {
    const balance = state.userBalances[state.selectedFromToken] || 0;
    const halfBalance = balance / 2;
    elements.fromAmountInput.value = halfBalance.toFixed(
      CONSTANTS.DECIMAL_PLACES
    );
    handleFromAmountChange();
  }
}

function swapTokens() {
  // Swap tokens
  [state.selectedFromToken, state.selectedToToken] = [
    state.selectedToToken,
    state.selectedFromToken,
  ];

  // Swap amounts
  if (elements.fromAmountInput && elements.toAmountInput) {
    [elements.fromAmountInput.value, elements.toAmountInput.value] = [
      elements.toAmountInput.value,
      elements.fromAmountInput.value,
    ];
  }

  updateUI();
  clearErrors();
}

function filterTokens() {
  populateTokenList(elements.tokenModal?.dataset.type);
}

function showLoading(show) {
  if (!elements.loadingOverlay) return;

  if (show) {
    elements.loadingOverlay.classList.add('active');
  } else {
    elements.loadingOverlay.classList.remove('active');
  }
}

// Form submission
function handleSwap(event) {
  event.preventDefault();

  const fromAmount = parseFloat(elements.fromAmountInput?.value);
  const toAmount = parseFloat(elements.toAmountInput?.value);
  const balance = state.userBalances[state.selectedFromToken] || 0;

  // Validation
  if (!fromAmount || fromAmount <= 0) {
    showError('Please enter a valid amount', 'from');
    return;
  }

  if (fromAmount > balance) {
    showError(
      `Insufficient balance. You have ${balance.toFixed(CONSTANTS.DECIMAL_PLACES)} ${state.selectedFromToken}`,
      'from'
    );
    return;
  }

  if (state.selectedFromToken === state.selectedToToken) {
    showError('Please select different tokens', 'from');
    return;
  }

  showLoading(true);

  // Simulate swap processing
  setTimeout(() => {
    // Update balances
    state.userBalances[state.selectedFromToken] -= fromAmount;
    state.userBalances[state.selectedToToken] += toAmount;

    // Clear form
    if (elements.fromAmountInput) elements.fromAmountInput.value = '';
    if (elements.toAmountInput) elements.toAmountInput.value = '';

    // Update UI
    updateUI();
    clearErrors();

    // Show success message
    showSuccess(
      `Successfully swapped ${fromAmount.toFixed(CONSTANTS.DECIMAL_PLACES)} ${state.selectedFromToken} for ${toAmount.toFixed(CONSTANTS.DECIMAL_PLACES)} ${state.selectedToToken}`
    );

    showLoading(false);
  }, CONSTANTS.LOADING_DELAY);
}

function showSuccess(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 3000;
    font-weight: 500;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, CONSTANTS.NOTIFICATION_DURATION);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
