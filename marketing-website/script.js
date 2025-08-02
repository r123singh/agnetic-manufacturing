// Form handling and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');
    const downloadBtn = document.getElementById('downloadBtn');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadForm);
            const data = {
                fullName: formData.get('fullName'),
                workEmail: formData.get('workEmail'),
                jobRole: formData.get('jobRole'),
                manufacturingDomain: formData.get('manufacturingDomain')
            };

            // Simulate form submission (in real implementation, this would send to a server)
            console.log('Form submitted:', data);
            
            // Show success message
            leadForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Enable download button
            downloadBtn.disabled = false;
            downloadBtn.style.opacity = '1';
            downloadBtn.style.cursor = 'pointer';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .workflow-step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gear, .sensor-node, .data-flow-line');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effects to agent nodes
    const agentNodes = document.querySelectorAll('.agent-node');
    agentNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(0, 170, 255, 0.5)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Add data flow animation to connection lines
    const connectionLines = document.querySelectorAll('.connection-line');
    connectionLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });

    // Add sensor monitoring simulation
    const sensors = document.querySelectorAll('.sensor');
    sensors.forEach((sensor, index) => {
        setInterval(() => {
            sensor.classList.toggle('active');
        }, 2000 + (index * 500));
    });

    // Add gear rotation speed variation
    const gears = document.querySelectorAll('.gear');
    gears.forEach((gear, index) => {
        gear.style.animationDuration = `${15 + (index * 5)}s`;
    });

    // Add conveyor belt speed variation
    const conveyorBelt = document.querySelector('.conveyor-belt');
    if (conveyorBelt) {
        setInterval(() => {
            const speed = Math.random() * 4 + 6; // Random speed between 6-10s
            conveyorBelt.style.animationDuration = `${speed}s`;
        }, 5000);
    }

    // Add data point animation to planning visual
    const dataPoints = document.querySelectorAll('.data-point');
    dataPoints.forEach((point, index) => {
        setInterval(() => {
            point.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
        }, 1000 + (index * 200));
    });

    // Add status indicator color changes
    const statusIndicators = document.querySelectorAll('.status-indicator');
    statusIndicators.forEach(indicator => {
        setInterval(() => {
            const colors = ['#00ffaa', '#ffaa00', '#ff0066'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            indicator.style.background = randomColor;
        }, 3000);
    });

    // Add form validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff0066';
            } else {
                this.style.borderColor = 'rgba(0, 170, 255, 0.3)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00aaff';
        });
    });

    // Add loading animation for form submission
    const submitButton = document.querySelector('.btn-primary.btn-full');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            this.innerHTML = '<span class="loading">Processing...</span>';
            this.disabled = true;
            
            // Simulate processing time
            setTimeout(() => {
                this.innerHTML = 'Get Access Now';
                this.disabled = false;
            }, 2000);
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00aaff, #00ffaa);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add mobile menu toggle (for future implementation)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
    `;

    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        mobileMenuToggle.style.display = 'block';
        navContainer.appendChild(mobileMenuToggle);
    }

    // Add analytics tracking (simulated)
    function trackEvent(eventName, data) {
        console.log('Analytics Event:', eventName, data);
        // In real implementation, this would send to analytics service
    }

    // Track form interactions
    const formFields = document.querySelectorAll('.form-group input, .form-group select');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            trackEvent('form_field_focus', { field: field.name });
        });
    });

    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('button_click', { text: button.textContent });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) {
                trackEvent('scroll_depth', { depth: maxScroll });
            }
        }
    });
});

// Global functions for button actions
function scrollToForm() {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToDemo() {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openGitHub() {
    window.open('https://github.com/r123singh/agnetic-manufacturing', '_blank');
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
    }
    
    .loading:after {
        content: " ";
        display: block;
        width: 16px;
        height: 16px;
        margin: 2px;
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: loading 1.2s linear infinite;
    }
    
    @keyframes loading {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .btn:disabled:hover {
        transform: none;
        box-shadow: none;
    }
`;
document.head.appendChild(style); 