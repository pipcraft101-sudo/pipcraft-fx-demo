// Global JavaScript for PipCraft FX

// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize all tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    // Initialize expandable sections
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    expandableHeaders.forEach(header => {
        header.addEventListener('click', toggleExpandable);
    });
    
    // Initialize session timers
    updateSessionTimers();
    setInterval(updateSessionTimers, 60000); // Update every minute
    
    // Initialize risk sliders
    const riskSliders = document.querySelectorAll('.risk-slider');
    riskSliders.forEach(slider => {
        slider.addEventListener('input', updateRiskVisualization);
    });
});

// Tooltip functionality
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg';
    tooltip.textContent = tooltipText;
    tooltip.id = 'dynamic-tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('dynamic-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Expandable sections
function toggleExpandable(e) {
    const section = this.parentElement;
    section.classList.toggle('active');
    const icon = this.querySelector('i[data-feather]');
    if (icon) {
        if (section.classList.contains('active')) {
            icon.setAttribute('data-feather', 'chevron-up');
        } else {
            icon.setAttribute('data-feather', 'chevron-down');
        }
        feather.replace();
    }
}

// Session Timer Calculation
function updateSessionTimers() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    
    // London Session: 8 AM - 5 PM UTC
    const londonStart = 8;
    const londonEnd = 17;
    let londonStatus = 'closed';
    let londonTimeLeft = '';
    
    if (utcHours >= londonStart && utcHours < londonEnd) {
        londonStatus = 'open';
        const hoursLeft = londonEnd - utcHours - 1;
        const minutesLeft = 60 - now.getUTCMinutes();
        londonTimeLeft = `${hoursLeft}h ${minutesLeft}m`;
    } else if (utcHours < londonStart) {
        const hoursToOpen = londonStart - utcHours - 1;
        const minutesToOpen = 60 - now.getUTCMinutes();
        londonTimeLeft = `Opens in ${hoursToOpen}h ${minutesToOpen}m`;
    } else {
        const hoursToOpen = 24 - utcHours + londonStart - 1;
        const minutesToOpen = 60 - now.getUTCMinutes();
        londonTimeLeft = `Opens in ${hoursToOpen}h ${minutesToOpen}m`;
    }
    
    // Update London session display
    const londonEls = document.querySelectorAll('.session-london');
    londonEls.forEach(el => {
        const statusEl = el.querySelector('.session-status');
        const timeEl = el.querySelector('.session-time');
        if (statusEl) statusEl.textContent = londonStatus.toUpperCase();
        if (timeEl) timeEl.textContent = londonTimeLeft;
        el.className = londonStatus === 'open' 
            ? 'session-london session-active' 
            : 'session-london';
    });
    
    // Similar logic for New York and Asian sessions
    // New York: 1 PM - 10 PM UTC
    // Asian: 11 PM - 8 AM UTC
}

// Risk Visualization for sliders
function updateRiskVisualization(e) {
    const value = e.target.value;
    const visual = e.target.nextElementSibling;
    if (visual && visual.classList.contains('risk-meter-fill')) {
        visual.style.width = value + '%';
        
        // Update color based on risk level
        if (value <= 30) {
            visual.style.backgroundColor = '#10b981';
        } else if (value <= 60) {
            visual.style.backgroundColor = '#f59e0b';
        } else {
            visual.style.backgroundColor = '#ef4444';
        }
    }
    
    // Update any associated output
    const outputId = e.target.getAttribute('data-output');
    if (outputId) {
        const outputEl = document.getElementById(outputId);
        if (outputEl) {
            outputEl.textContent = value + '%';
        }
    }
}

// Lot Size Calculator Logic
function calculateLotSize() {
    const accountBalance = parseFloat(document.getElementById('accountBalance')?.value) || 1000;
    const riskPercent = parseFloat(document.getElementById('riskPercent')?.value) || 2;
    const stopLossPips = parseFloat(document.getElementById('stopLossPips')?.value) || 20;
    const currencyPair = document.getElementById('currencyPair')?.value || 'EURUSD';
    
    const riskAmount = accountBalance * (riskPercent / 100);
    let pipValue = 10; // Default for XXX/USD pairs
    
    if (currencyPair.includes('JPY')) {
        pipValue = 1000;
    } else if (!currencyPair.includes('USD')) {
        // Simplified logic for other pairs
        pipValue = 10;
    }
    
    const lotSize = riskAmount / (stopLossPips * pipValue);
    const result = Math.round(lotSize * 100) / 100;
    
    const resultEl = document.getElementById('lotSizeResult');
    if (resultEl) {
        resultEl.textContent = result;
    }
    
    return result;
}

// Profit/Loss Calculator
function calculateProfitLoss() {
    const lotSize = parseFloat(document.getElementById('plLotSize')?.value) || 0.1;
    const entryPrice = parseFloat(document.getElementById('entryPrice')?.value) || 1.1000;
    const exitPrice = parseFloat(document.getElementById('exitPrice')?.value) || 1.1050;
    const tradeType = document.getElementById('tradeType')?.value || 'buy';
    
    const pips = Math.abs(exitPrice - entryPrice) * 10000;
    let profitLoss;
    
    if (tradeType === 'buy') {
        profitLoss = exitPrice > entryPrice ? pips * lotSize * 10 : -pips * lotSize * 10;
    } else {
        profitLoss = exitPrice < entryPrice ? pips * lotSize * 10 : -pips * lotSize * 10;
    }
    
    const resultEl = document.getElementById('plResult');
    if (resultEl) {
        resultEl.textContent = profitLoss.toFixed(2);
        resultEl.className = profitLoss >= 0 ? 'text-accentGreen' : 'text-accentRed';
    }
    
    return profitLoss;
}
// Save Calculator State to Local Storage
function saveCalculatorState(calculatorId, data) {
    try {
        const key = `pipcraft_${calculatorId}`;
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log('Local storage not available');
    }
}

function loadCalculatorState(calculatorId) {
    try {
        const key = `pipcraft_${calculatorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

// Format Currency
function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Format Percentage
function formatPercent(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value / 100);
}

// Debounce function for expensive calculations
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

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-accentGreen text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Initialize all calculators on page load
function initializeCalculators() {
    // Attach event listeners to calculator inputs
    const calculatorInputs = document.querySelectorAll('.calculator-input');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', debounce(function() {
            const calculatorId = this.closest('[data-calculator]')?.getAttribute('data-calculator');
            if (calculatorId === 'lotSize') {
                calculateLotSize();
            } else if (calculatorId === 'profitLoss') {
                calculateProfitLoss();
            }
            // Add more calculator types here
        }, 300));
    });
    
    // Load saved states
    const calculators = document.querySelectorAll('[data-calculator]');
    calculators.forEach(calc => {
        const calculatorId = calc.getAttribute('data-calculator');
        const savedState = loadCalculatorState(calculatorId);
        if (savedState) {
            Object.keys(savedState).forEach(key => {
                const input = calc.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = savedState[key];
                }
            });
            
            // Trigger calculation with saved values
            if (calculatorId === 'lotSize') {
                setTimeout(calculateLotSize, 100);
                setTimeout(calculateRiskAmount, 100);
            } else if (calculatorId === 'profitLoss') {
                setTimeout(calculateProfitLoss, 100);
            }
        }
    });
}

// Enhanced Lot Size Calculator with Risk Amount
function calculateLotSize() {
    const accountBalance = parseFloat(document.getElementById('accountBalance')?.value) || 10000;
    const riskPercent = parseFloat(document.getElementById('riskPercent')?.value) || 2;
    const stopLossPips = parseFloat(document.getElementById('stopLossPips')?.value) || 30;
    const currencyPair = document.getElementById('currencyPair')?.value || 'EUR/USD';
    
    const riskAmount = accountBalance * (riskPercent / 100);
    let pipValue = 10; // Default for XXX/USD pairs
    
    if (currencyPair.includes('JPY')) {
        pipValue = 1000;
    } else if (!currencyPair.includes('USD')) {
        pipValue = 10;
    }
    
    const lotSize = riskAmount / (stopLossPips * pipValue);
    const result = Math.round(lotSize * 100) / 100;
    const positionValue = lotSize * 100000; // 1 lot = 100,000 units
    
    // Update results
    const riskAmountEl = document.getElementById('riskAmountResult');
    const lotResultEl = document.getElementById('lotSizeResult');
    const positionValueEl = document.getElementById('positionValueResult');
    
    if (riskAmountEl) riskAmountEl.textContent = formatCurrency(riskAmount);
    if (lotResultEl) lotResultEl.textContent = result;
    if (positionValueEl) positionValueEl.textContent = formatCurrency(positionValue);
    
    // Save state
    saveCalculatorState('lotSize', {
        accountBalance,
        riskPercent,
        stopLossPips,
        currencyPair
    });
    
    return result;
}

function calculateRiskAmount() {
    const accountBalance = parseFloat(document.getElementById('accountBalance')?.value) || 10000;
    const riskPercent = parseFloat(document.getElementById('riskPercent')?.value) || 2;
    
    const riskAmount = accountBalance * (riskPercent / 100);
    const riskAmountEl = document.getElementById('riskAmountResult');
    if (riskAmountEl) {
        riskAmountEl.textContent = formatCurrency(riskAmount);
    }
    
    return riskAmount;
}

// Enhanced Profit/Loss Calculator
function calculateProfitLoss() {
    const lotSize = parseFloat(document.getElementById('plLotSize')?.value) || 0.1;
    const entryPrice = parseFloat(document.getElementById('entryPrice')?.value) || 1.1000;
    const exitPrice = parseFloat(document.getElementById('exitPrice')?.value) || 1.1050;
    const tradeType = document.getElementById('tradeType')?.value || 'buy';
    
    const pips = Math.abs(exitPrice - entryPrice) * 10000;
    let profitLoss;
    
    if (tradeType === 'buy') {
        profitLoss = exitPrice > entryPrice ? pips * lotSize * 10 : -pips * lotSize * 10;
    } else {
        profitLoss = exitPrice < entryPrice ? pips * lotSize * 10 : -pips * lotSize * 10;
    }
    
    // Update result element
    const resultEl = document.getElementById('plResult');
    if (resultEl) {
        resultEl.textContent = formatCurrency(profitLoss);
        resultEl.className = profitLoss >= 0 ? 'text-accentGreen' : 'text-accentRed';
    }
    
    return profitLoss;
}

// New Function: Calculate Pip Value
function calculatePipValue() {
    const lotSize = parseFloat(document.getElementById('pipLotSize')?.value) || 0.1;
    const currencyPair = document.getElementById('pipCurrencyPair')?.value || 'EUR/USD';
    
    let pipValue = 10; // Default for XXX/USD
    if (currencyPair.includes('JPY')) {
        pipValue = 1000;
    } else if (!currencyPair.includes('USD')) {
        pipValue = 10;
    }
    
    return lotSize * pipValue;
}

// New Function: Calculate Margin Requirement
function calculateMargin() {
    const lotSize = parseFloat(document.getElementById('marginLotSize')?.value) || 0.1;
    const leverage = parseInt(document.getElementById('marginLeverage')?.value) || 100;
    const currencyPair = document.getElementById('marginCurrencyPair')?.value || 'EUR/USD';
    
    const margin = (lotSize * 100000) / leverage;
    
    return formatCurrency(margin);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculators();
    
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Export functions for use in web components
window.PipCraftFX = {
    calculateLotSize,
    calculateRiskAmount,
    calculateProfitLoss,
    calculatePipValue,
    calculateMargin,
    formatCurrency,
    formatPercent,
    copyToClipboard,
    debounce
};
