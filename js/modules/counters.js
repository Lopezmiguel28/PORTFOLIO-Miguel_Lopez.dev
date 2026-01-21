/**
 * =============================================
 * COUNTERS MODULE
 * Animación de contadores numéricos
 * =============================================
 */

export function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
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
