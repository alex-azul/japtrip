// Reusable Navigation Bar Component
class NavigationBar {
    constructor() {
        this.init();
    }

    init() {
        this.createNavbar();
        this.addEventListeners();
        this.setActivePage();
    }

    createNavbar() {
        const navbarHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="nav-logo">Japan Trip 2024</a>
                    <ul class="nav-menu" id="nav-menu">
                        <li><a href="index.html" class="nav-link">Home</a></li>
                        <li><a href="japan_itinerary.html" class="nav-link">Itinerary</a></li>
                        <li><a href="japan_itinerary_map.html" class="nav-link">Map</a></li>
                    </ul>
                    <button class="nav-toggle" id="nav-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        `;

        // Insert navbar at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    addEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                } else {
                    navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                }
            }
        });
    }

    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationBar();
}); 