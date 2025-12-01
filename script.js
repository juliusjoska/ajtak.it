// ============================================
// AJTAK.IT - Matrix/Cyberpunk IT Services Website
// Enhanced with Code Reveal & More Effects
// ============================================

// ============================================
// Data Loader - Načítá JSON soubory
// ============================================
class DataLoader {
    constructor() {
        this.cache = {};
        this.baseUrl = 'data/';
    }
    
    async load(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }
        
        try {
            const response = await fetch(this.baseUrl + filename);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`[DataLoader] Error loading ${filename}:`, error);
            return null;
        }
    }
    
    async getBlog() {
        return await this.load('blog.json');
    }
    
    async getPricing() {
        return await this.load('pricing.json');
    }
    
    async getPortfolio() {
        return await this.load('portfolio.json');
    }
    
    async getConfig() {
        return await this.load('config.json');
    }
}

// Global data loader instance
const dataLoader = new DataLoader();

// ============================================
// Boot Screen Animation
// ============================================
class BootScreen {
    constructor() {
        this.screen = document.getElementById('bootScreen');
        this.init();
    }
    
    init() {
        if (!this.screen) return;
        
        // Hide boot screen after animation
        setTimeout(() => {
            this.screen.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Remove from DOM after transition
            setTimeout(() => {
                this.screen.remove();
            }, 500);
        }, 3000);
        
        // Prevent scroll during boot
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// Matrix Rain with Cursor Spotlight Effect
// ============================================
class CodeReveal {
    constructor() {
        // This class is now empty - we'll use enhanced MatrixRain instead
    }
}

// ============================================
// Custom Cursor
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.core = document.querySelector('.cursor-core');
        this.ring = document.querySelector('.cursor-ring');
        
        if (!this.cursor) return;
        
        this.cursorX = 0;
        this.cursorY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            
            // Core follows instantly
            this.core.style.left = `${e.clientX}px`;
            this.core.style.top = `${e.clientY}px`;
        });
        
        // Ring follows with delay
        this.animateRing();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
        
        // Click effect
        document.addEventListener('mousedown', () => this.cursor.classList.add('click'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('click'));
        
        // Hide on mobile
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
        }
    }
    
    animateRing() {
        this.ringX += (this.cursorX - this.ringX) * 0.15;
        this.ringY += (this.cursorY - this.ringY) * 0.15;
        
        this.ring.style.left = `${this.ringX}px`;
        this.ring.style.top = `${this.ringY}px`;
        
        requestAnimationFrame(() => this.animateRing());
    }
}

// ============================================
// Matrix Rain with Cursor Spotlight Effect
// Rain is visible/bright AROUND the cursor
// Less intense to not obstruct content
// ============================================
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890<>{}[]|';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.active = true;
        
        // Mouse position for spotlight effect
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.spotlightRadius = 180; // Radius of visible area around cursor
        this.maxOpacity = 0.5; // Max opacity to keep text readable
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(0).map(() => Math.random() * -50);
    }
    
    toggle() {
        this.active = !this.active;
    }
    
    intensify() {
        const originalRadius = this.spotlightRadius;
        const originalOpacity = this.maxOpacity;
        this.spotlightRadius = 400;
        this.maxOpacity = 0.8;
        setTimeout(() => {
            this.spotlightRadius = originalRadius;
            this.maxOpacity = originalOpacity;
        }, 5000);
    }
    
    animate() {
        // Clear with fade for trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.active) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Calculate distance from cursor
            const dx = x - this.mouseX;
            const dy = y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only draw if within spotlight radius
            if (distance < this.spotlightRadius * 1.3) {
                // Calculate opacity - strongest at edge of spotlight, fading in center and outside
                let opacity;
                const innerRadius = this.spotlightRadius * 0.2;
                const peakRadius = this.spotlightRadius * 0.6;
                
                if (distance < innerRadius) {
                    // Very close to cursor - dim (so cursor area is clearer)
                    opacity = 0.2 + (distance / innerRadius) * 0.3;
                } else if (distance < peakRadius) {
                    // Sweet spot - brightest ring
                    opacity = 0.5 + ((distance - innerRadius) / (peakRadius - innerRadius)) * 0.5;
                } else if (distance < this.spotlightRadius) {
                    // Main visible area
                    opacity = 1 - ((distance - peakRadius) / (this.spotlightRadius - peakRadius)) * 0.4;
                } else {
                    // Fade out zone
                    opacity = 0.6 - ((distance - this.spotlightRadius) / (this.spotlightRadius * 0.3));
                }
                
                opacity = Math.max(0, Math.min(this.maxOpacity, opacity * this.maxOpacity));
                
                // Random character
                const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
                
                // Green color with varying brightness
                const green = Math.floor(180 + opacity * 75);
                
                this.ctx.fillStyle = `rgba(0, ${green}, 30, ${opacity})`;
                
                // Subtle glow only for brightest characters
                if (opacity > 0.35) {
                    this.ctx.shadowColor = '#00ff41';
                    this.ctx.shadowBlur = 8 * opacity;
                } else {
                    this.ctx.shadowBlur = 0;
                }
                
                this.ctx.fillText(char, x, y);
            }
            
            // Move drop down
            this.drops[i] += 0.5 + Math.random() * 0.5; // Varied speed
            
            // Reset drop when it goes off screen
            if (this.drops[i] * this.fontSize > this.canvas.height + 50) {
                this.drops[i] = Math.random() * -20;
            }
        }
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// Typing Effect
// ============================================
class TypingEffect {
    constructor() {
        this.roleElement = document.getElementById('roleText');
        this.roles = [
            'Opravy PC & notebooků',
            'Sítě & WiFi instalace',
            'Kamerové systémy',
            'Microsoft 365 & Azure',
            'Firemní IT podpora',
            'Vývoj na míru',
            'Kybernetická bezpečnost',
            'Váš osobní ajťák'
        ];
        this.roleIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        if (this.roleElement) {
            setTimeout(() => this.type(), 1000);
        }
    }
    
    type() {
        const currentRole = this.roles[this.roleIndex];
        
        if (this.isDeleting) {
            this.roleElement.textContent = currentRole.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.roleElement.textContent = currentRole.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let timeout = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.charIndex === currentRole.length) {
            timeout = 2000;
            this.isDeleting = true;
        }
        
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.roleIndex = (this.roleIndex + 1) % this.roles.length;
            timeout = 500;
        }
        
        setTimeout(() => this.type(), timeout);
    }
}

// ============================================
// Command Palette (Ctrl+K)
// ============================================
class CommandPalette {
    constructor() {
        this.palette = document.getElementById('commandPalette');
        this.input = document.getElementById('paletteInput');
        this.results = document.getElementById('paletteResults');
        this.selectedIndex = 0;
        this.isOpen = false;
        
        this.commands = [
            { action: 'home', label: 'Domů', key: 'H' },
            { action: 'services', label: 'Služby', key: 'S' },
            { action: 'portfolio', label: 'Portfolio', key: 'F' },
            { action: 'about', label: 'O mně', key: 'A' },
            { action: 'blog', label: 'Blog', key: 'B' },
            { action: 'contact', label: 'Kontakt', key: 'C' },
            { action: 'pricing', label: 'Ceník', key: '$' },
            { action: 'matrix', label: 'Matrix Rain', key: 'M' },
            { action: 'hack', label: 'Hack Mode', key: 'X' }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.palette) return;
        
        // Ctrl+K to open
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            if (this.isOpen) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigate(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigate(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSelected();
                }
            }
        });
        
        // Click outside to close
        this.palette.addEventListener('click', (e) => {
            if (e.target === this.palette) {
                this.close();
            }
        });
        
        // Click on result
        this.results.querySelectorAll('li').forEach((li, index) => {
            li.addEventListener('click', () => {
                this.selectedIndex = index;
                this.executeSelected();
            });
        });
        
        // Filter on input
        this.input.addEventListener('input', () => this.filter());
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.palette.classList.add('active');
        this.input.value = '';
        this.input.focus();
        this.selectedIndex = 0;
        this.updateSelection();
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.isOpen = false;
        this.palette.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    navigate(direction) {
        const items = this.results.querySelectorAll('li:not([style*="display: none"])');
        this.selectedIndex = (this.selectedIndex + direction + items.length) % items.length;
        this.updateSelection();
    }
    
    updateSelection() {
        this.results.querySelectorAll('li').forEach((li, index) => {
            li.classList.toggle('selected', index === this.selectedIndex);
        });
    }
    
    filter() {
        const query = this.input.value.toLowerCase();
        this.results.querySelectorAll('li').forEach((li, index) => {
            const text = li.textContent.toLowerCase();
            li.style.display = text.includes(query) ? '' : 'none';
        });
        this.selectedIndex = 0;
        this.updateSelection();
    }
    
    executeSelected() {
        const items = this.results.querySelectorAll('li:not([style*="display: none"])');
        const selected = items[this.selectedIndex];
        if (!selected) return;
        
        const action = selected.dataset.action;
        this.close();
        
        switch (action) {
            case 'home':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'services':
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'projects':
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'stack':
                document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'portfolio':
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'blog':
                document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'pricing':
                window.pricingModal?.openGeneral();
                break;
            case 'matrix':
                window.matrixRain?.toggle();
                break;
            case 'hack':
                window.hackMode?.activate();
                break;
        }
    }
}

// ============================================
// Hack Mode - Epic hacker animation
// ============================================
class HackMode {
    constructor() {
        this.overlay = document.getElementById('hackMode');
        this.textContainer = this.overlay?.querySelector('.hack-text');
        this.isActive = false;
        this.interval = null;
        
        // Fake hacker text
        this.hackStrings = [
            'ACCESSING MAINFRAME...',
            'BYPASSING FIREWALL [████████████] 100%',
            'DECRYPTING SSL/TLS HANDSHAKE...',
            'root@server:~# sudo rm -rf /boring_websites/*',
            'Injecting creativity.dll into system32...',
            'DOWNLOADING: awesome_portfolio.exe',
            'SSH connection established to skills.database',
            'SELECT * FROM brain WHERE creativity > 9000;',
            '> 1337 rows returned',
            'git push origin master --force-with-lease',
            'npm run build:production',
            'Docker container deployed successfully',
            'TRACE ROUTE: your_screen -> julius_server',
            'Packets intercepted: 42069',
            'Encrypting transmission with AES-256...',
            'VULNERABILITY SCAN COMPLETE',
            'No weaknesses found in portfolio',
            'Accessing visitor.profile...',
            'IDENTITY: Awesome Human',
            'THREAT LEVEL: Zero (You seem cool)',
            'Initiating friendly_greeting.sh',
            'echo "Thanks for visiting!"',
            'CONNECTION SECURE ✓',
            'Have a great day, fellow human.',
            '',
            '[Press ESC to exit hack mode]'
        ];
    }
    
    activate() {
        if (!this.overlay || this.isActive) return;
        
        this.isActive = true;
        this.overlay.classList.add('active');
        this.textContainer.innerHTML = '';
        
        let lineIndex = 0;
        
        this.interval = setInterval(() => {
            if (lineIndex < this.hackStrings.length) {
                const line = document.createElement('div');
                line.textContent = this.hackStrings[lineIndex];
                line.style.opacity = '0';
                line.style.transform = 'translateX(-20px)';
                this.textContainer.appendChild(line);
                
                // Animate in
                setTimeout(() => {
                    line.style.transition = 'all 0.3s ease';
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, 50);
                
                // Auto scroll
                this.textContainer.scrollTop = this.textContainer.scrollHeight;
                
                lineIndex++;
            } else {
                clearInterval(this.interval);
            }
        }, 150);
        
        // ESC to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.deactivate();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Auto close after all text
        setTimeout(() => {
            if (this.isActive) {
                this.deactivate();
            }
        }, this.hackStrings.length * 150 + 3000);
    }
    
    deactivate() {
        this.isActive = false;
        clearInterval(this.interval);
        this.overlay.classList.remove('active');
    }
}

// ============================================
// Konami Code Easter Egg
// ============================================
class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        
        document.addEventListener('keydown', (e) => this.check(e));
    }
    
    check(e) {
        if (e.key === this.sequence[this.current]) {
            this.current++;
            
            if (this.current === this.sequence.length) {
                this.activate();
                this.current = 0;
            }
        } else {
            this.current = 0;
        }
    }
    
    activate() {
        // Intensify matrix
        window.matrixRain?.intensify();
        
        // Show message
        const msg = document.createElement('div');
        msg.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 10px;">// CHEAT_CODE_ACTIVATED //</div>
            <div style="font-size: 0.875rem; opacity: 0.7;">Matrix mode enhanced for 5 seconds</div>
        `;
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #00ff41;
            text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
            z-index: 10003;
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
            animation: fadeInOut 3s forwards;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(msg);
        setTimeout(() => {
            msg.remove();
            style.remove();
        }, 3000);
        
        console.log('%c[KONAMI] ', 'color: #00ff41', 'Cheat code activated! You found the easter egg!');
    }
}

// ============================================
// Mobile Navigation
// ============================================
class MobileNav {
    constructor() {
        this.toggle = document.querySelector('.nav-toggle');
        this.menu = document.querySelector('.mobile-menu');
        this.links = document.querySelectorAll('.mobile-link');
        
        this.init();
    }
    
    init() {
        if (!this.toggle || !this.menu) return;
        
        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.menu.classList.toggle('active');
            document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
        });
        
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('active');
                this.menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ============================================
// Smooth Scroll
// ============================================
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

// ============================================
// Reveal on Scroll
// ============================================
class RevealOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.section-header, .content-block, .project-card, .stack-column, .contact-terminal, .contact-form-wrapper');
        
        this.elements.forEach(el => el.classList.add('reveal'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate stack bars
                    if (entry.target.classList.contains('stack-column')) {
                        entry.target.querySelectorAll('.stack-list li').forEach((item, index) => {
                            setTimeout(() => item.classList.add('visible'), index * 150);
                        });
                    }
                }
            });
        }, { threshold: 0.1 });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// Stats Counter
// ============================================
class StatsCounter {
    constructor() {
        const stats = document.querySelectorAll('.stat-value');
        let animated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    stats.forEach(stat => {
                        const target = parseInt(stat.dataset.count);
                        this.countUp(stat, target);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) observer.observe(statsSection);
    }
    
    countUp(el, target) {
        const duration = 2000;
        const frames = 60;
        const increment = target / frames;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + '+';
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(current) + '+';
            }
        }, duration / frames);
    }
}

// ============================================
// Contact Form
// ============================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            if (!this.validate(data)) return;
            
            const btn = this.form.querySelector('.btn-submit');
            const originalText = btn.querySelector('.btn-text').textContent;
            
            btn.querySelector('.btn-text').textContent = 'SENDING...';
            btn.disabled = true;
            
            await new Promise(r => setTimeout(r, 1500));
            
            this.notify('MESSAGE_SENT // Ozvu se brzy.', 'success');
            this.form.reset();
            
            btn.querySelector('.btn-text').textContent = originalText;
            btn.disabled = false;
        });
    }
    
    validate(data) {
        if (!data.name || data.name.length < 2) {
            this.notify('ERROR: Name required', 'error');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            this.notify('ERROR: Invalid email', 'error');
            return false;
        }
        if (!data.message || data.message.length < 10) {
            this.notify('ERROR: Message too short', 'error');
            return false;
        }
        return true;
    }
    
    notify(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const el = document.createElement('div');
        el.className = 'notification';
        el.innerHTML = `
            <span>${type === 'success' ? '[✓]' : '[✗]'}</span>
            <span>${message}</span>
        `;
        el.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 16px 20px;
            background: #0a0a0a;
            border: 1px solid ${type === 'success' ? '#00ff41' : '#ff0000'};
            color: ${type === 'success' ? '#00ff41' : '#ff0000'};
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8125rem;
            display: flex;
            gap: 12px;
            z-index: 9999;
            box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0,255,65,0.3)' : 'rgba(255,0,0,0.3)'};
        `;
        
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }
}

// ============================================
// Project Card Tilt Effect
// ============================================
class ProjectTilt {
    constructor() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ============================================
// Random Glitch Effect
// ============================================
class RandomGlitch {
    constructor() {
        setInterval(() => {
            if (Math.random() > 0.95) {
                document.body.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }
        }, 5000);
    }
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Boot sequence first
    new BootScreen();
    
    // Core effects
    window.matrixRain = new MatrixRain();
    new CodeReveal();
    new CustomCursor();
    new TypingEffect();
    
    // Navigation & Interaction
    new CommandPalette();
    window.hackMode = new HackMode();
    new KonamiCode();
    new MobileNav();
    new SmoothScroll();
    
    // Animations
    new RevealOnScroll();
    new StatsCounter();
    new ProjectTilt();
    new RandomGlitch();
    
    // Form
    new ContactForm();
    
    // Pricing Modal
    window.pricingModal = new PricingModal();
    
    // Blog Modal
    new BlogModal();
    
    // Portfolio
    new PortfolioFilter();
    new Lightbox();
    
    // Console branding
    console.log('%c    _   _ _____  _    _  __  ___ _____ ', 'color: #00ff41');
    console.log('%c   /_\\ | |_   _|/_\\  | |/ / |_ _|_   _|', 'color: #00ff41');
    console.log('%c  / _ \\| __| | / _ \\ | \' <   | |  | |  ', 'color: #00ff41');
    console.log('%c /_/ \\_\\__| |_/_/ \\_\\|_|\\_\\ |___| |_|  ', 'color: #00ff41');
    console.log('%c', 'color: #00ff41');
    console.log('%c ajtak.it - IT služby na míru', 'color: #00ff41; font-size: 14px;');
    console.log('%c─────────────────────────────────', 'color: #00ff41');
    console.log('%c[TIP] Press Ctrl+K for command palette', 'color: #00d4ff');
    console.log('%c[TIP] Try the Konami code: ↑↑↓↓←→←→BA', 'color: #00d4ff');
});

// ============================================
// Pricing Modal - Terminal Style with Typing Effect
// ============================================
class PricingModal {
    constructor() {
        this.modal = document.getElementById('pricingModal');
        this.body = document.getElementById('pricingModalBody');
        this.title = document.getElementById('pricingModalTitle');
        this.closeBtn = document.getElementById('closePricingBtn');
        this.closeX = document.getElementById('closePricingModal');
        this.typeSpeed = 15;
        this.lineDelay = 50;
        this.isTyping = false;
        this.pricingData = null;
        
        this.init();
    }
    
    async init() {
        if (!this.modal) return;
        
        // Load pricing data from JSON
        await this.loadData();
        
        // Close handlers
        this.closeBtn?.addEventListener('click', () => this.close());
        this.closeX?.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Clickable service cards (whole card)
        document.querySelectorAll('.clickable-service').forEach(el => {
            el.addEventListener('click', () => {
                const service = el.dataset.service;
                this.open(service);
            });
        });
        
        // Clickable pricing cards
        document.querySelectorAll('.clickable-pricing').forEach(el => {
            el.addEventListener('click', () => {
                this.openGeneral();
            });
        });
    }
    
    async loadData() {
        const data = await dataLoader.getPricing();
        if (!data) {
            console.error('[PricingModal] Failed to load pricing data');
            return;
        }
        
        // Transform data to internal format
        this.pricingData = {};
        
        // Add service-specific pricing
        if (data.services) {
            Object.keys(data.services).forEach(key => {
                const service = data.services[key];
                this.pricingData[key] = {
                    title: service.title,
                    items: service.pricing
                };
            });
        }
        
        // Build general pricing from all sections
        this.pricingData.general = {
            title: 'kompletni_cenik.sh',
            items: []
        };
        
        if (data.hourlyRates) {
            this.pricingData.general.items.push({ name: `── ${data.hourlyRates.title} ──`, price: '', header: true });
            data.hourlyRates.items.forEach(item => this.pricingData.general.items.push(item));
        }
        
        if (data.travel) {
            this.pricingData.general.items.push({ name: `── ${data.travel.title} (z ${data.travel.baseLocation}) ──`, price: '', header: true });
            data.travel.items.forEach(item => this.pricingData.general.items.push(item));
        }
        
        if (data.subscriptions) {
            this.pricingData.general.items.push({ name: `── ${data.subscriptions.title} ──`, price: '', header: true });
            data.subscriptions.items.forEach(item => this.pricingData.general.items.push(item));
        }
    }
    
    open(service) {
        if (!this.pricingData || !this.pricingData[service]) {
            console.warn(`[PricingModal] No data for service: ${service}`);
            return;
        }
        
        const data = this.pricingData[service];
        this.title.textContent = data.title;
        this.body.innerHTML = '';
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start typing animation
        this.typeContent(data);
    }
    
    openGeneral() {
        this.open('general');
    }
    
    async typeContent(data) {
        this.isTyping = true;
        
        // Create command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'pricing-terminal-line';
        cmdLine.innerHTML = '<span class="prompt">$</span> <span class="command-text"></span><span class="typing-cursor"></span>';
        this.body.appendChild(cmdLine);
        
        const cmdText = cmdLine.querySelector('.command-text');
        const cursor = cmdLine.querySelector('.typing-cursor');
        const command = `cat ${data.title}`;
        
        // Type command
        for (let i = 0; i < command.length; i++) {
            if (!this.isTyping) return;
            cmdText.textContent += command[i];
            await this.sleep(this.typeSpeed);
        }
        
        cursor.remove();
        await this.sleep(200);
        
        // Create output container
        const output = document.createElement('div');
        output.className = 'pricing-output';
        this.body.appendChild(output);
        
        // Type each price line
        for (const item of data.items) {
            if (!this.isTyping) return;
            
            const line = document.createElement('div');
            line.className = 'pricing-output-line';
            if (item.highlight) line.classList.add('highlight');
            if (item.free) line.classList.add('free');
            if (item.header) line.classList.add('header');
            
            if (item.header) {
                line.innerHTML = `<span class="item-name" style="color: var(--cyan); font-weight: 600;"></span><span class="item-price"></span>`;
            } else {
                line.innerHTML = `<span class="item-name"></span><span class="item-price"></span>`;
            }
            
            output.appendChild(line);
            
            const nameEl = line.querySelector('.item-name');
            const priceEl = line.querySelector('.item-price');
            
            const nameText = item.header ? item.name : `> ${item.name}`;
            
            // Type name fast
            for (let i = 0; i < nameText.length; i++) {
                if (!this.isTyping) return;
                nameEl.textContent += nameText[i];
                await this.sleep(8);
            }
            
            // Type price
            for (let i = 0; i < item.price.length; i++) {
                if (!this.isTyping) return;
                priceEl.textContent += item.price[i];
                await this.sleep(12);
            }
            
            await this.sleep(this.lineDelay);
        }
        
        // Final line
        await this.sleep(150);
        const finalLine = document.createElement('div');
        finalLine.className = 'pricing-terminal-line';
        finalLine.style.marginTop = '16px';
        finalLine.innerHTML = '<span class="prompt">$</span> <span class="command" style="color: var(--matrix-green);">echo "Ceny jsou orientační, finální cena dle náročnosti"</span>';
        this.body.appendChild(finalLine);
        
        this.isTyping = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    close() {
        this.isTyping = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// Blog Modal - Terminal Style with Typing Effect
// ============================================
class BlogModal {
    constructor() {
        this.modal = document.getElementById('blogModal');
        this.body = document.getElementById('blogModalBody');
        this.title = document.getElementById('blogModalTitle');
        this.meta = document.getElementById('blogMeta');
        this.closeBtn = document.getElementById('closeBlogBtn');
        this.closeX = document.getElementById('closeBlogModal');
        this.typeSpeed = 5;
        this.isTyping = false;
        this.blogData = {};
        this.blogContainer = document.querySelector('.blog-grid');
        
        this.init();
    }
    
    async init() {
        if (!this.modal) return;
        
        // Load blog data from JSON
        await this.loadData();
        
        // Close handlers
        this.closeBtn?.addEventListener('click', () => this.close());
        this.closeX?.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Setup click handlers for blog cards
        this.setupClickHandlers();
    }
    
    async loadData() {
        const data = await dataLoader.getBlog();
        if (!data || !data.posts) {
            console.error('[BlogModal] Failed to load blog data');
            return;
        }
        
        // Transform to internal format
        data.posts.forEach(post => {
            this.blogData[post.id] = {
                title: `${post.id.replace(/-/g, '_')}.md`,
                heading: post.title,
                date: this.formatDate(post.date),
                readTime: `${post.readTime} min čtení`,
                content: post.content
            };
        });
        
        // Render blog cards dynamically
        if (this.blogContainer) {
            this.renderBlogCards(data.posts);
        }
    }
    
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    
    renderBlogCards(posts) {
        this.blogContainer.innerHTML = '';
        
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'blog-card';
            card.dataset.postId = post.id;
            card.innerHTML = `
                <div class="blog-header">
                    <span class="blog-date">${this.formatDate(post.date)}</span>
                    <span class="blog-category">${post.category}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <span class="blog-read-time">${post.readTime} min čtení</span>
                    <a href="#" class="blog-link" data-post="${post.id}">
                        <span>Číst více</span>
                        <span class="link-arrow">-></span>
                    </a>
                </div>
            `;
            this.blogContainer.appendChild(card);
        });
        
        // Re-setup click handlers
        this.setupClickHandlers();
    }
    
    setupClickHandlers() {
        // Blog links
        document.querySelectorAll('.blog-link').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const post = el.dataset.post;
                if (post && this.blogData[post]) {
                    this.open(post);
                }
            });
        });
        
        // Also make whole blog card clickable
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('.blog-link')) return;
                const postId = card.dataset.postId;
                if (postId && this.blogData[postId]) {
                    this.open(postId);
                }
            });
        });
    }
    
    open(postId) {
        const data = this.blogData[postId];
        if (!data) return;
        
        this.title.textContent = data.title;
        this.meta.textContent = `${data.date} | ${data.readTime}`;
        this.body.innerHTML = '';
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start typing animation
        this.typeContent(data);
    }
    
    async typeContent(data) {
        this.isTyping = true;
        
        // Create command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'blog-terminal-line';
        cmdLine.innerHTML = '<span class="prompt">$</span> <span class="command-text"></span><span class="typing-cursor"></span>';
        this.body.appendChild(cmdLine);
        
        const cmdText = cmdLine.querySelector('.command-text');
        const cursor = cmdLine.querySelector('.typing-cursor');
        const command = `cat ${data.title}`;
        
        // Type command
        for (let i = 0; i < command.length; i++) {
            if (!this.isTyping) return;
            cmdText.textContent += command[i];
            await this.sleep(this.typeSpeed * 2);
        }
        
        cursor.remove();
        cmdLine.classList.add('typed');
        await this.sleep(150);
        
        // Create content container
        const content = document.createElement('div');
        content.className = 'blog-content';
        this.body.appendChild(content);
        
        // Type title
        const titleEl = document.createElement('h2');
        titleEl.className = 'blog-content-title';
        content.appendChild(titleEl);
        
        for (let i = 0; i < data.heading.length; i++) {
            if (!this.isTyping) return;
            titleEl.textContent += data.heading[i];
            await this.sleep(this.typeSpeed);
        }
        
        await this.sleep(100);
        
        // Create text container
        const textEl = document.createElement('div');
        textEl.className = 'blog-content-text';
        content.appendChild(textEl);
        
        // Render content from structured data
        for (const block of data.content) {
            if (!this.isTyping) return;
            
            if (block.type === 'heading') {
                const h3 = document.createElement('h3');
                textEl.appendChild(h3);
                for (let i = 0; i < block.text.length; i++) {
                    if (!this.isTyping) return;
                    h3.textContent += block.text[i];
                    await this.sleep(this.typeSpeed);
                }
            } else if (block.type === 'list') {
                const ul = document.createElement('ul');
                textEl.appendChild(ul);
                for (const item of block.items) {
                    if (!this.isTyping) return;
                    const li = document.createElement('li');
                    ul.appendChild(li);
                    for (let i = 0; i < item.length; i++) {
                        if (!this.isTyping) return;
                        li.textContent += item[i];
                        await this.sleep(this.typeSpeed / 2);
                    }
                    await this.sleep(20);
                }
            } else if (block.type === 'paragraph') {
                const p = document.createElement('p');
                textEl.appendChild(p);
                for (let i = 0; i < block.text.length; i++) {
                    if (!this.isTyping) return;
                    p.textContent += block.text[i];
                    await this.sleep(this.typeSpeed / 2);
                }
            }
            
            await this.sleep(30);
        }
        
        this.isTyping = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    close() {
        this.isTyping = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// Portfolio Filter
// ============================================
class PortfolioFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.portfolio-item');
        
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                this.buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                this.items.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                        item.style.animation = 'fadeIn 0.3s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// ============================================
// Lightbox for Portfolio
// ============================================
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.media = document.getElementById('lightboxMedia');
        this.caption = document.getElementById('lightboxCaption');
        this.closeBtn = document.getElementById('lightboxClose');
        this.prevBtn = document.getElementById('lightboxPrev');
        this.nextBtn = document.getElementById('lightboxNext');
        
        this.items = [];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        if (!this.lightbox) return;
        
        // Collect portfolio items
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            this.items.push({
                type: item.dataset.media,
                title: item.querySelector('.portfolio-info h4')?.textContent || '',
                desc: item.querySelector('.portfolio-info p')?.textContent || ''
            });
            
            item.addEventListener('click', () => this.open(index));
        });
        
        // Close handlers
        this.closeBtn?.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
        
        // Navigation
        this.prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prev();
        });
        this.nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.next();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }
    
    open(index) {
        this.currentIndex = index;
        this.render();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.media.innerHTML = '';
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.render();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.render();
    }
    
    render() {
        const item = this.items[this.currentIndex];
        
        // For now, show placeholder - you can replace with actual images/videos
        if (item.type === 'video') {
            this.media.innerHTML = `
                <div style="width: 640px; height: 360px; background: var(--bg-terminal); border: 1px solid var(--matrix-green); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <span style="font-size: 4rem;">▶</span>
                    <span style="margin-top: 16px; color: var(--text-dim);">Video: ${item.title}</span>
                    <span style="margin-top: 8px; font-size: 0.75rem; color: var(--text-dim);">Nahrajte video do složky /media/</span>
                </div>
            `;
        } else {
            this.media.innerHTML = `
                <div style="width: 640px; height: 400px; background: var(--bg-terminal); border: 1px solid var(--matrix-green); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <span style="font-size: 4rem;">📷</span>
                    <span style="margin-top: 16px; color: var(--text-dim);">${item.title}</span>
                    <span style="margin-top: 8px; font-size: 0.75rem; color: var(--text-dim);">Nahrajte obrázek do složky /media/</span>
                </div>
            `;
        }
        
        this.caption.innerHTML = `<strong>${item.title}</strong><br>${item.desc}`;
    }
}
