class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: auto;
                }
                footer {
                    background: rgba(15, 23, 42, 0.95);
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 3rem 0 1.5rem;
                }
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                .footer-section h3 {
                    color: #10b981;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }
                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .footer-links li {
                    margin-bottom: 0.75rem;
                }
                .footer-links a {
                    color: #cbd5e1;
                    text-decoration: none;
                    transition: color 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .footer-links a:hover {
                    color: #10b981;
                }
                .footer-links i {
                    width: 16px;
                    height: 16px;
                }
                .mission {
                    color: #94a3b8;
                    line-height: 1.6;
                }
                .disclaimer {
                    background: rgba(239, 68, 68, 0.1);
                    border-left: 3px solid #ef4444;
                    padding: 1rem;
                    border-radius: 4px;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    color: #fca5a5;
                }
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    color: #cbd5e1;
                    transition: all 0.3s;
                }
                .social-link:hover {
                    background: #10b981;
                    color: white;
                    transform: translateY(-2px);
                }
                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    padding-top: 1.5rem;
                    text-align: center;
                    color: #94a3b8;
                    font-size: 0.875rem;
                }
                .copyright {
                    margin-bottom: 0.5rem;
                }
                .footer-links-bottom {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                .footer-links-bottom a {
                    color: #94a3b8;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                .footer-links-bottom a:hover {
                    color: #10b981;
                }
            </style>
            <footer>
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>PipCraft FX</h3>
                            <p class="mission">
                                Free premium forex education and tools for traders worldwide. 
                                No subscriptions, no payments, just knowledge.
                            </p>
                            <div class="disclaimer">
                                <strong>Risk Warning:</strong> Trading forex carries a high level of risk. 
                                Past performance is not indicative of future results. Educational purposes only.
                            </div>
                        </div>
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul class="footer-links">
                                <li><a href="/"><i data-feather="home"></i> Home</a></li>
                                <li><a href="/tools.html"><i data-feather="tool"></i> All Tools</a></li>
                                <li><a href="/strategies.html"><i data-feather="trending-up"></i> Strategies</a></li>
                                <li><a href="/dashboard.html"><i data-feather="activity"></i> Live Dashboard</a></li>
                                <li><a href="/sessions.html"><i data-feather="clock"></i> Market Sessions</i></li>
                            </ul>
                        </div>
<div class="footer-section">
                            <h3>Education</h3>
                            <ul class="footer-links">
                                <li><a href="/education.html#basics"><i data-feather="book"></i> Forex Basics</a></li>
                                <li><a href="/education.html#risk"><i data-feather="shield"></i> Risk Management</a></li>
                                <li><a href="/education.html#psychology"><i data-feather="brain"></i> Trading Psychology</a></li>
                                <li><a href="/education.html#structure"><i data-feather="layers"></i> Market Structure</a></li>
                                <li><a href="/education.html#prop-firms"><i data-feather="briefcase"></i> Prop Firm Prep</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3>Connect</h3>
                            <ul class="footer-links">
                                <li><a href="/contact.html"><i data-feather="mail"></i> Contact Us</a></li>
                                <li><a href="/about.html"><i data-feather="info"></i> About</a></li>
                                <li><a href="#" id="whatsapp-link"><i data-feather="message-circle"></i> WhatsApp</a></li>
                                <li><a href="mailto:edu@pipcraftfx.com"><i data-feather="send"></i> edu@pipcraftfx.com</a></li>
                                <li><a href="https://fbs.com" target="_blank"><i data-feather="external-link"></i> Trade with FBS</a></li>
                            </ul>
                            
                            <div class="social-links">
                                <a href="#" class="social-link" aria-label="Twitter">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="YouTube">
                                    <i data-feather="youtube"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="Telegram">
                                    <i data-feather="send"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="GitHub">
                                    <i data-feather="github"></i>
                                </a>
                            </div>
                        </div>
</div>
                    <div class="footer-bottom">
                        <div class="copyright">
                            © 2024 PipCraft FX. All educational content is free to use.<br>
                            Developed by <strong>Sanger Smith Seth</strong> | Email: <a href="mailto:ssangerseth@gmail.com">ssangerseth@gmail.com</a> | Contact: +256755371983
                        </div>
                        <div class="footer-links-bottom">
                            <a href="/privacy.html">Privacy Policy</a>
                            <a href="/terms.html">Terms of Use</a>
                            <a href="/disclaimer.html">Full Disclaimer</a>
                            <a href="/sitemap.html">Sitemap</a>
                            <a href="https://fbs.com" target="_blank">Partner: FBS</a>
                        </div>
                    </div>
</div>
            </footer>
        `;
        
        // Initialize WhatsApp link
        const whatsappLink = this.shadowRoot.getElementById('whatsapp-link');
        if (whatsappLink) {
            whatsappLink.addEventListener('click', (e) => {
                e.preventDefault();
                const phone = "+256XXXXXXXXX"; // Uganda number format
                const message = "Hello PipCraft FX, I have a question about forex trading.";
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        }
        
        // Replace feather icons
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);