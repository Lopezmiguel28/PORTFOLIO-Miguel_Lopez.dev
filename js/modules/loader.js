/**
 * =============================================
 * LOADER MODULE
 * Pantalla de carga inicial
 * =============================================
 */

export function initLoader() {
    const loader = document.getElementById('loader');

    if (!loader) return;

    // Ocultar loader después de que todo cargue
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';

            // Remover del DOM después de la animación
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    });
}
