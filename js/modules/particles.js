/**
 * =============================================
 * PARTICLES MODULE
 * Partículas animadas en el hero
 * =============================================
 */

export function initParticles() {
    const container = document.getElementById('particles');

    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';

    // Tamaño aleatorio
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Color aleatorio entre primario y secundario
    particle.style.background = Math.random() > 0.5
        ? 'var(--color-accent-primary)'
        : 'var(--color-accent-secondary)';

    // Delay y duración aleatoria
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = Math.random() * 10 + 15 + 's';

    container.appendChild(particle);
}
