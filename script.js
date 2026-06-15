document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    /* -------------------------------------------------------------------------- */
    /* 1. SCROLL NAVBAR EFFECTS                                                   */
    /* -------------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger on load in case page starts scrolled
    handleScroll();

    /* -------------------------------------------------------------------------- */
    /* 2. MOBILE NAVIGATION DRAWER                                                */
    /* -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        
        // Toggle menu icon
        const icon = mobileToggle.querySelector('i');
        if (isOpen) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when links are clicked (for mobile scroll)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 3. ACTIVE SECTION SCROLL HIGHLIGHTING                                      */
    /* -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section, header');
    
    const activeSectionHandler = () => {
        let scrollPosition = window.scrollY + 120; // offset for nav height

        sections.forEach(section => {
            if (section.id) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    };

    window.addEventListener('scroll', activeSectionHandler);

    /* -------------------------------------------------------------------------- */
    /* 4. SCROLL ANIMATIONS (INTERSECTION OBSERVER)                               */
    /* -------------------------------------------------------------------------- */
    // General Fade-In observer
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop tracking
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    /* -------------------------------------------------------------------------- */
    /* 5. SKILLS LOADING ANIMATION                                                */
    /* -------------------------------------------------------------------------- */
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Store original width and reset to 0% for transition trigger
    skillProgressBars.forEach(bar => {
        const originalWidth = bar.style.width || '100%';
        bar.setAttribute('data-target', originalWidth);
        bar.style.width = '0%';
        // Add styling transition now so it doesn't snap instantly on load
        bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    // Stagger bar loads slightly
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const target = bar.getAttribute('data-target');
                            bar.style.width = target;
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        skillsObserver.observe(skillsSection);
    }
});
