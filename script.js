/* ========================================
   PORTFOLIO JAVASCRIPT
   - Interactive features
   - Animations on scroll
   - Typewriter effect
======================================== */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       1. MOBILE NAVIGATION TOGGLE
       - Opens/closes menu on mobile
    ======================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu when hamburger is clicked
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when a link is clicked
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    /* ========================================
       2. NAVBAR SCROLL EFFECT
       - Adds background blur on scroll
    ======================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    /* ========================================
       3. TYPEWRITER EFFECT
       - Cycles through different titles
    ======================================== */
    const typewriterElement = document.getElementById('typewriter');
    
    // Array of titles to cycle through
    const titles = [
        'Web3 Full-Stack Developer',
        'Solidity Smart Contract Engineer',
        'Blockchain Developer',
        'DeFi Protocol Builder',
        'Remote Work Specialist'
    ];
    
    let titleIndex = 0;       // Current title in array
    let charIndex = 0;        // Current character position
    let isDeleting = false;   // Are we deleting or typing?
    let typingSpeed = 100;    // Milliseconds between characters
    
    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster than typing
        } else {
            // Add a character
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If finished typing the word
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        }
        
        // If finished deleting the word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Move to next title
            typingSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    if (typewriterElement) {
        typeWriter();
    }
    
    /* ========================================
       4. SCROLL REVEAL ANIMATION
       - Elements fade in when scrolled into view
    ======================================== */
    
    // Elements to animate
    const revealElements = document.querySelectorAll(
        '.skill-card, .timeline-item, .project-card, .education-card, .certifications-card'
    );
    
    // Add reveal class to all elements
    revealElements.forEach(function(element) {
        element.classList.add('reveal');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is considered visible when 20% of it is in view
        return rect.top <= windowHeight * 0.85;
    }
    
    // Function to reveal elements
    function revealOnScroll() {
        revealElements.forEach(function(element) {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Run once on page load (for elements already in view)
    revealOnScroll();
    
    /* ========================================
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       - Smooth scrolling when clicking nav links
    ======================================== */
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ========================================
       6. ACTIVE NAV LINK HIGHLIGHTING
       - Highlights current section in nav
    ======================================== */
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            
            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--accent-primary)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    /* ========================================
       7. SKILL CARDS STAGGER ANIMATION
       - Adds delay to each card for staggered effect
    ======================================== */
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });
    
    /* ========================================
       8. COPY EMAIL ON CLICK (Optional feature)
    ======================================== */
    
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Only copy if it's the main "Say Hello" button
            if (this.classList.contains('btn-primary') && this.classList.contains('btn-large')) {
                // Continue with default mailto behavior
                return;
            }
        });
    });
    
    /* ========================================
       9. PROJECT CARDS TILT EFFECT
       - Subtle 3D tilt on hover
    ======================================== */
    
    const projectCards = document.querySelectorAll('.project-card:not(.featured)');
    
    projectCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    /* ========================================
       10. CONSOLE EASTER EGG
       - Fun message for developers
    ======================================== */
    
    console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
    console.log('%cInterested in working together? Reach out at zalamayursinh2811@gmail.com', 'font-size: 14px; color: #06b6d4;');
    console.log('%c🚀 Built with vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #10b981;');
    
});

/* ========================================
   ADDITIONAL: Intersection Observer
   - More performant scroll detection
   - For browsers that support it
======================================== */

if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(function(element) {
        observer.observe(element);
    });
}
