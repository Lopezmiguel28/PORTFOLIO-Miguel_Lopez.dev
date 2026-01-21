/**
 * =============================================
 * MAIN.JS - Portfolio de Miguel
 * Versión compatible sin módulos ES6
 * =============================================
 */

(function () {
    'use strict';

    // ===== LOADER =====
    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                setTimeout(() => loader.remove(), 500);
            }, 2000);
        });
    }

    // ===== NAVIGATION =====
    function initNavigation() {
        const header = document.getElementById('header');
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');
        const navLinks = document.querySelectorAll('.nav__link');

        function closeMenu() {
            navMenu.classList.remove('show');
            document.body.style.overflow = 'visible';
        }

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }

        if (navClose) {
            navClose.addEventListener('click', closeMenu);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Header scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== TYPING EFFECT =====
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const phrases = [
            'Desarrollador Android',
            'Estudiante de DAM',
            'Full Stack Developer',
            'Apasionado por Java & Kotlin',
            'Creador de Apps'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (!animatedElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');

                        if (entry.target.classList.contains('skill-card')) {
                            const progressBar = entry.target.querySelector('.skill-card__progress');
                            if (progressBar) {
                                progressBar.style.width = progressBar.style.getPropertyValue('--progress');
                            }
                        }
                    }, index * 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => observer.observe(element));

        // Parallax hero
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                if (scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${rate}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                }
            });
        }
    }

    // ===== SKILLS TABS =====
    function initSkillsTabs() {
        const tabs = document.querySelectorAll('.skills__tab');
        const panels = document.querySelectorAll('.skills__panel');
        if (!tabs.length || !panels.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const panel = document.getElementById(targetPanel);
                if (panel) {
                    panel.classList.add('active');

                    const newPanelElements = panel.querySelectorAll('.animate-on-scroll');
                    newPanelElements.forEach((el, index) => {
                        el.classList.remove('visible');
                        setTimeout(() => el.classList.add('visible'), index * 100);
                    });
                }
            });
        });
    }

    // ===== PROJECT FILTERS =====
    function initProjectFilters() {
        const filters = document.querySelectorAll('.projects__filter');
        const projects = document.querySelectorAll('.project-card');
        if (!filters.length || !projects.length) return;

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;

                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                projects.forEach((project, index) => {
                    const projectCategory = project.dataset.category;

                    if (category === 'all' || projectCategory === category) {
                        project.classList.remove('hidden');
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';

                        setTimeout(() => {
                            project.style.transition = 'all 0.4s ease';
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.9)';
                        setTimeout(() => project.classList.add('hidden'), 300);
                    }
                });
            });
        });
    }

    // ===== CONTACT FORM =====
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn__text');
            const originalText = btnText ? btnText.textContent : 'Enviar';

            if (btnText) btnText.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                showMessage(form, 'success', '¡Mensaje enviado correctamente! Te responderé pronto.');
                form.reset();

                if (btnText) btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
        });
    }

    function showMessage(form, type, text) {
        const existingMessage = form.querySelector('.form__message');
        if (existingMessage) existingMessage.remove();

        const message = document.createElement('div');
        message.className = `form__message form__message--${type}`;
        message.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${text}`;
        form.appendChild(message);

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }

    // ===== CURSOR =====
    function initCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');

        if (!cursor || !follower || !matchMedia('(hover: hover)').matches) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animate);
        }

        animate();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .social__link');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.borderColor = 'var(--color-accent-secondary)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--color-accent-primary)';
            });
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '0.5';
        });
    }

    // ===== PARTICLES =====
    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';

            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = Math.random() > 0.5
                ? 'var(--color-accent-primary)'
                : 'var(--color-accent-secondary)';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = Math.random() * 10 + 15 + 's';

            container.appendChild(particle);
        }
    }

    // ===== COUNTERS =====
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        update();
    }

    // ===== TILT EFFECT =====
    function initTiltEffect() {
        const cards = document.querySelectorAll('.project-card, .skill-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ===== INITIALIZE ALL =====
    document.addEventListener('DOMContentLoaded', () => {
        initLoader();
        initNavigation();
        initTypingEffect();
        initScrollAnimations();
        initSkillsTabs();
        initProjectFilters();
        initContactForm();
        initCursor();
        initParticles();
        initCounters();
        initTiltEffect();

        console.log('🚀 Portfolio de Miguel cargado correctamente');
    });

})();
