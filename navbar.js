class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    width: 100%;
                }
                nav {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1rem 0;
                }
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    font-weight: 800;
                    font-size: 1.5rem;
                }
                .logo-text {
                    background: linear-gradient(90deg, #10b981, #60a5fa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .logo-icon {
                    color: #10b981;
                }
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                .nav-link {
                    color: #cbd5e1;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 0.5rem 0;
                    position: relative;
                    transition: color 0.3s;
                }
                .nav-link:hover {
                    color: #10b981;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #10b981;
                    transition: width 0.3s;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .dropdown {
                    position: relative;
                }
                .dropdown-content {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    min-width: 200px;
                    background: rgba(15, 23, 42, 0.98);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 0.5rem 0;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: all 0.3s;
                    z-index: 1000;
                }
                .dropdown:hover .dropdown-content {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .dropdown-item {
                    display: block;
                    padding: 0.75rem 1.5rem;
                    color: #cbd5e1;
                    text-decoration: none;
                    transition: background 0.3s;
                }
                .dropdown-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #10b981;
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #cbd5e1;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.98);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1rem;
                }
                .mobile-menu.active {
                    display: block;
                }
                @media (max-width: 1024px) {
                    .nav-links {
                        gap: 1rem;
                    }
                }
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i data-feather="trending-up" class="logo-icon"></i>
                        <span class="logo-text">PipCraft FX</span>
                    </a>
                    
                    <div class="nav-links">
                        <a href="/" class="nav-link">Home</a>
                        
                        <div class="dropdown">
                            <a href="/tools.html" class="nav-link">Tools <i data-feather="chevron-down" style="width: 16px; height: 16px; vertical-align: middle;"></i></a>
                            <div class="dropdown-content">
                                <a href="/tools.html#calculators" class="dropdown-item">All Calculators</a>
                                <a href="/tools.html#lot-size" class="dropdown-item">Lot Size Calculator</a>
                                <a href="/tools.html#risk-reward" class="dropdown-item">Risk/Reward Calculator</a>
                                <a href="/tools.html#margin" class="dropdown-item">Margin Calculator</a>
                                <a href="/tools.html#compounding" class="dropdown-item">Compounding Simulator</a>
                            </div>
                        </div>
                        
                        <div class="dropdown">
                            <a href="/strategies.html" class="nav-link">Strategies <i data-feather="chevron-down" style="width: 16px; height: 16px; vertical-align: middle;"></i></a>
                            <div class="dropdown-content">
                                <a href="/strategies.html" class="dropdown-item">All Strategies</a>
                                <a href="/strategies.html#scalping" class="dropdown-item">Scalping Strategies</a>
                                <a href="/strategies.html#day-trading" class="dropdown-item">Day Trading</a>
                                <a href="/strategies.html#swing" class="dropdown-item">Swing Trading</a>
                                <a href="/strategies.html#ict" class="dropdown-item">ICT Concepts</a>
                            </div>
                        </div>
                        
                        <a href="/dashboard.html" class="nav-link">Live Dashboard</a>
                        <a href="/education.html" class="nav-link">Education</a>
                        <a href="/sessions.html" class="nav-link">Sessions</a>
                        <a href="/about.html" class="nav-link">About</a>
                    </div>
                    
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                
                <div class="mobile-menu" id="mobileMenu">
                    <a href="/" class="dropdown-item">Home</a>
                    <a href="/tools.html" class="dropdown-item">Tools</a>
                    <a href="/strategies.html" class="dropdown-item">Strategies</a>
                    <a href="/dashboard.html" class="dropdown-item">Live Dashboard</a>
                    <a href="/education.html" class="dropdown-item">Education</a>
                    <a href="/sessions.html" class="dropdown-item">Market Sessions</a>
                    <a href="/about.html" class="dropdown-item">About</a>
                    <a href="/contact.html" class="dropdown-item">Contact</a>
                </div>
            </nav>
        `;
        
        // Initialize mobile menu
        const mobileMenuBtn = this.shadowRoot.getElementById('mobileMenuBtn');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i[data-feather]');
                if (mobileMenu.classList.contains('active')) {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace();
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.shadowRoot.contains(e.target) && mobileMenu) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('i[data-feather]');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            }
        });
        
        // Replace feather icons
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-navbar', CustomNavbar);