/**
 * =============================================
 * SCROLL ANIMATIONS MODULE
 * Animaciones al hacer scroll
 * =============================================
 */

export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir delay escalonado para efecto más profesional
                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Activar barras de progreso en skills
                    if (entry.target.classList.contains('skill-card')) {
                        const progressBar = entry.target.querySelector('.skill-card__progress');
                        if (progressBar) {
                            progressBar.style.width = progressBar.style.getPropertyValue('--progress');
                        }
                    }
                }, index * 100);

                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect sutil para el hero
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
