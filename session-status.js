class SessionStatusWidget extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 2rem;
                }
                .session-container {
                    background: rgba(30, 41, 59, 0.5);
                    border-radius: 16px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .session-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .session-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #e2e8f0;
                }
                .session-refresh {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 0.5rem 1rem;
                    color: #94a3b8;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .session-refresh:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #10b981;
                }
                .session-refresh i {
                    width: 16px;
                    height: 16px;
                }
                .session-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1rem;
                }
                @media (min-width: 640px) {
                    .session-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                .session-card {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                .session-card:hover {
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                .session-card.active {
                    border-color: #10b981;
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.1);
                }
                .session-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--session-color), transparent);
                    opacity: 0.5;
                }
                .session-card.london::before { --session-color: #3b82f6; }
                .session-card.newyork::before { --session-color: #10b981; }
                .session-card.asian::before { --session-color: #8b5cf6; }
                
                .session-name {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }
                .session-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.05);
                }
                .session-icon i {
                    width: 24px;
                    height: 24px;
                }
                .session-icon.london i { color: #3b82f6; }
                .session-icon.newyork i { color: #10b981; }
                .session-icon.asian i { color: #8b5cf6; }
                
                .session-details h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #e2e8f0;
                    margin-bottom: 0.25rem;
                }
                .session-status {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status-open {
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                }
                .status-closed {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }
                .session-info {
                    margin-top: 1rem;
                }
                .session-time {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #e2e8f0;
                    margin-bottom: 0.5rem;
                }
                .session-range {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    margin-bottom: 0.5rem;
                }
                .session-pairs {
                    font-size: 0.875rem;
                    color: #cbd5e1;
                }
                .session-volatility {
                    margin-top: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .volatility-meter {
                    flex: 1;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                }
                .volatility-fill {
                    height: 100%;
                    border-radius: 2px;
                    transition: width 0.5s;
                }
                .volatility-low { background: #10b981; width: 30%; }
                .volatility-medium { background: #f59e0b; width: 60%; }
                .volatility-high { background: #ef4444; width: 90%; }
                
                .session-progress {
                    margin-top: 1rem;
                }
                .progress-bar {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: var(--session-color);
                    transition: width 1s linear;
                }
            </style>
            <div class="session-container">
                <div class="session-header">
                    <h2 class="session-title">Live Market Sessions</h2>
                    <button class="session-refresh" id="refreshBtn">
                        <i data-feather="refresh-cw"></i>
                        Refresh
                    </button>
                </div>
                <div class="session-grid">
                    <div class="session-card london" id="londonSession">
                        <div class="session-name">
                            <div class="session-icon london">
                                <i data-feather="globe"></i>
                            </div>
                            <div class="session-details">
                                <h3>London Session</h3>
                                <span class="session-status status-open" id="londonStatus">OPEN</span>
                            </div>
                        </div>
                        <div class="session-info">
                            <div class="session-time" id="londonTime">4h 22m</div>
                            <div class="session-range">08:00 - 17:00 UTC</div>
                            <div class="session-pairs">Best: EUR/USD, GBP/USD, EUR/GBP</div>
                            <div class="session-volatility">
                                <span class="text-xs text-gray-400">Volatility:</span>
                                <div class="volatility-meter">
                                    <div class="volatility-fill volatility-high" id="londonVolatility"></div>
                                </div>
                                <span class="text-xs" id="londonVolatilityText">High</span>
                            </div>
                        </div>
                        <div class="session-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" id="londonProgress" style="--session-color: #3b82f6; width: 65%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="session-card newyork" id="newyorkSession">
                        <div class="session-name">
                            <div class="session-icon newyork">
                                <i data-feather="dollar-sign"></i>
                            </div>
                            <div class="session-details">
                                <h3>New York Session</h3>
                                <span class="session-status status-closed" id="newyorkStatus">CLOSED</span>
                            </div>
                        </div>
                        <div class="session-info">
                            <div class="session-time" id="newyorkTime">Opens in 2h 15m</div>
                            <div class="session-range">13:00 - 22:00 UTC</div>
                            <div class="session-pairs">Best: USD/CAD, USD/JPY, GBP/USD</div>
                            <div class="session-volatility">
                                <span class="text-xs text-gray-400">Volatility:</span>
                                <div class="volatility-meter">
                                    <div class="volatility-fill volatility-medium" id="newyorkVolatility"></div>
                                </div>
                                <span class="text-xs" id="newyorkVolatilityText">Medium</span>
                            </div>
                        </div>
                        <div class="session-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" id="newyorkProgress" style="--session-color: #10b981; width: 0%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="session-card asian" id="asianSession">
                        <div class="session-name">
                            <div class="session-icon asian">
                                <i data-feather="sun"></i>
                            </div>
                            <div class="session-details">
                                <h3>Asian Session</h3>
                                <span class="session-status status-open" id="asianStatus">OPEN</span>
                            </div>
                        </div>
                        <div class="session-info">
                            <div class="session-time" id="asianTime">1h 48m</div>
                            <div class="session-range">23:00 - 08:00 UTC</div>
                            <div class="session-pairs">Best: AUD/USD, NZD/USD, USD/JPY</div>
                            <div class="session-volatility">
                                <span class="text-xs text-gray-400">Volatility:</span>
                                <div class="volatility-meter">
                                    <div class="volatility-fill volatility-low" id="asianVolatility"></div>
                                </div>
                                <span class="text-xs" id="asianVolatilityText">Low</span>
                            </div>
                        </div>
                        <div class="session-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" id="asianProgress" style="--session-color: #8b5cf6; width: 85%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.initializeSessions();
        
        // Add refresh button functionality
        const refreshBtn = this.shadowRoot.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.updateAllSessions();
                // Add refresh animation
                const icon = refreshBtn.querySelector('i[data-feather]');
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s';
                
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 500);
            });
        }
        
        // Update sessions every minute
        setInterval(() => {
            this.updateAllSessions();
        }, 60000);
        
        // Replace feather icons
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
    
    initializeSessions() {
        this.updateAllSessions();
    }
    
    updateAllSessions() {
        this.updateSession('london', 8, 17); // London: 8 AM - 5 PM UTC
        this.updateSession('newyork', 13, 22); // New York: 1 PM - 10 PM UTC
        this.updateSession('asian', 23, 8); // Asian: 11 PM - 8 AM UTC (next day)
    }
    
    updateSession(sessionName, startHour, endHour) {
        const now = new Date();
        const utcHours = now.getUTCHours