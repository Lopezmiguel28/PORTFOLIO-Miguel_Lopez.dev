/**
 * =============================================
 * CURSOR MODULE
 * Cursor personalizado premium
 * =============================================
 */

export function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // Solo en dispositivos con mouse
    if (!cursor || !follower || !matchMedia('(hover: hover)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Seguir el mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animación suave del cursor
    function animate() {
        // Cursor principal (más rápido)
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower (más lento para efecto trail)
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    // Efectos hover en elementos interactivos
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

    // Ocultar cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '0.5';
    });
}
