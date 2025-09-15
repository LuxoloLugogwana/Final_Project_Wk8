// Lemon Motors - Interactive JavaScript Features
// Enhanced functionality for the car dealership website

document.addEventListener('DOMContentLoaded', function() {


    // NAVIGATION FUNCTIONALITY

    // Smooth scrolling for internal links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (for responsive design)
    const topNav = document.getElementById('top-nav');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';

    document.getElementById('top-row').appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        topNav.classList.toggle('mobile-active');
    });

    // SEARCH FUNCTIONALITY


    const searchForm = document.querySelector('form[action=""]');
    const searchInput = document.querySelector('input[name="txtSearch"]');
    const searchBtn = document.querySelector('input[name="btnSubmit"]');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                performSearch(searchTerm);
            } else {
                showAlert('Please enter a search term');
            }
        });
    }

    function performSearch(term) {
        // Simulate search functionality
        const searchResults = [
            'VW Golf 6 GTI - R250,000',
            'Toyota Camry 2020 - R180,000',
            'BMW 3 Series - R450,000',
            'Audi A4 - R380,000'
        ];

        const filteredResults = searchResults.filter(result =>
            result.toLowerCase().includes(term.toLowerCase())
        );

        if (filteredResults.length > 0) {
            showAlert(`Found ${filteredResults.length} results for "${term}":\n${filteredResults.join('\n')}`);
        } else {
            showAlert(`No results found for "${term}". Please try a different search term.`);
        }
    }

    // FLOATING ANIMATIONS

    // Add subtle floating animation only to specific elements
    const floatingElements = document.querySelectorAll('.floating');

    function addFloatingAnimation() {
        floatingElements.forEach((element, index) => {
            // Only apply gentle animations, not actual floating
            element.style.animation = `gentleFloat ${4 + (index * 0.3)}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Add CSS animation keyframes dynamically - FIXED
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
        }

        .floating {
            position: relative !important;
            z-index: 1 !important;
        }

        .company-logo-hover {
            transition: all 0.3s ease;
            position: relative !important;
            z-index: 2 !important;
        }

        .company-logo-hover:hover {
            transform: scale(1.05);
            filter: grayscale(0%);
            z-index: 3 !important;
        }

        .menu-toggle {
            background: #f4d03f;
            border: none;
            font-size: 1.5rem;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            z-index: 1000 !important;
        }

        .logo-tooltip {
            position: absolute !important;
            bottom: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(0,0,0,0.8) !important;
            color: white !important;
            padding: 5px 10px !important;
            border-radius: 5px !important;
            font-size: 12px !important;
            pointer-events: none !important;
            z-index: 1001 !important;
            margin-bottom: 5px !important;
        }

        @media (max-width: 768px) {
            .menu-toggle { display: block !important; }
            #top-nav { display: none; }
            #top-nav.mobile-active {
                display: block;
                position: relative !important;
                z-index: 999 !important;
            }
        }

        /* Contact form specific fixes */
        .contact-form {
            position: relative !important;
            z-index: 1 !important;
        }

        .contact-form .floating {
            animation: none !important;
            position: static !important;
        }

        /* Modal fixes */
        .purchase-modal {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.7) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 10000 !important;
        }

        /* Alert fixes */
        .custom-alert {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 9999 !important;
        }
    `;
    document.head.appendChild(style);

    addFloatingAnimation();

    // COMPANY LOGO INTERACTIONS - FIXED

    const companyLogos = document.querySelectorAll('.companylogo');

    companyLogos.forEach(logo => {
        logo.classList.add('company-logo-hover');

        logo.addEventListener('click', function() {
            const companyName = this.getAttribute('alt');
            showAlert(`You clicked on ${companyName}! We specialize in ${companyName} vehicles. Contact us for more information.`);
        });

        // Add tooltip on hover - FIXED
        logo.addEventListener('mouseenter', function() {
            // Remove any existing tooltips first
            const existingTooltip = this.querySelector('.logo-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }

            const tooltip = document.createElement('div');
            tooltip.className = 'logo-tooltip';
            tooltip.textContent = `Click to learn more about ${this.getAttribute('alt')}`;

            this.appendChild(tooltip);
        });

        logo.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.logo-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // FEATURED VEHICLE INTERACTIONS - FIXED

    const buyButton = document.querySelector('.btn-full');

    if (buyButton && buyButton.textContent.includes('Buy Me')) {
        buyButton.addEventListener('click', function() {
            const vehicleInfo = {
                make: 'VW Golf 6',
                mileage: '125,000km',
                price: 'R250,000.00',
                year: '2015'
            };

            showPurchaseModal(vehicleInfo);
        });
    }

    function showPurchaseModal(vehicle) {
        const modal = document.createElement('div');
        modal.className = 'purchase-modal';

        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 400px; text-align: center; position: relative; z-index: 10001;">
                <h3>Purchase ${vehicle.make}</h3>
                <p><strong>Price:</strong> ${vehicle.price}</p>
                <p><strong>Mileage:</strong> ${vehicle.mileage}</p>
                <p><strong>Year:</strong> ${vehicle.year}</p>
                <p>Would you like to proceed with the purchase or schedule a test drive?</p>
                <div style="margin-top: 20px;">
                    <button class="button" onclick="alert('Thank you! We will contact you shortly to arrange your test drive.'); this.closest('.purchase-modal').remove();">Schedule Test Drive</button>
                    <button class="button" onclick="alert('Thank you for your interest! Please visit our showroom to complete the purchase.'); this.closest('.purchase-modal').remove();">Buy Now</button>
                    <button onclick="this.closest('.purchase-modal').remove();" style="margin-left: 10px; background: #ccc; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // CONTACT FORM HANDLING - NEW

    const contactForm = document.querySelector('#specializing form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const phone = this.querySelector('input[name="phone"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                showAlert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.');
                return;
            }

            showAlert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
        });
    }

    // NEWSLETTER SIGNUP - FIXED

    const newsletterForm = document.querySelector('footer form');
    const emailInput = document.getElementById('footerCustomerEmail');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                showAlert('Thank you for subscribing to our newsletter! You will receive updates about our latest vehicles and offers.');
                emailInput.value = '';
            } else {
                showAlert('Please enter a valid email address.');
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    // SCROLL ANIMATIONS - FIXED

    // Add scroll-triggered animations that don't interfere with layout
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Don't apply to sections that shouldn't animate
        if (!section.classList.contains('no-animate')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            observer.observe(section);
        }
    });

    // Add fadeInUp animation - FIXED
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);

    // UTILITY FUNCTIONS - FIXED

    function showAlert(message) {
        // Remove any existing alerts first
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());

        // Custom alert that's more visually appealing and properly positioned
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f4d03f;
            color: #333;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 300px;
            word-wrap: break-word;
            font-weight: bold;
            border: 2px solid #333;
        `;
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.opacity = '0';
                alertDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 300);
            }
        }, 5000);

        // Click to dismiss
        alertDiv.addEventListener('click', () => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        });
    }


    // SOCIAL MEDIA LINKS

    const socialLinks = document.querySelectorAll('.footer-section a[href="#"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim();
            showAlert(`This would normally take you to our ${platform} page. Social media integration coming soon!`);
        });
    });

    // PERFORMANCE OPTIMIZATION - FIXED

    // Lazy load images (for performance) - simplified to avoid conflicts
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading attribute for modern browsers
        img.loading = 'lazy';
    });

    // INITIALIZATION COMPLETE

    console.log('Lemon Motors website initialized successfully!');
    console.log('Interactive features loaded:');
    console.log('- Smooth navigation scrolling');
    console.log('- Search functionality');
    console.log('- Gentle floating animations (fixed)');
    console.log('- Company logo interactions (fixed)');
    console.log('- Purchase modal for featured vehicle (fixed)');
    console.log('- Contact form validation (new)');
    console.log('- Newsletter signup validation');
    console.log('- Scroll-triggered animations (fixed)');
    console.log('- Mobile responsive menu');
    console.log('- Social media link handlers');

});

// Function to add new vehicles dynamically (for future use)
function addFeaturedVehicle(vehicleData) {
    // This function could be used to dynamically add new featured vehicles
    console.log('Adding new featured vehicle:', vehicleData);
}

// Function to update company specializations
function updateSpecializations(companies) {
    // This function could be used to update the company logos section
    console.log('Updating specializations:', companies);
}