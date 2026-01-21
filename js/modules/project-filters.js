/**
 * =============================================
 * PROJECT FILTERS MODULE
 * Filtrado de proyectos
 * =============================================
 */

export function initProjectFilters() {
    const filters = document.querySelectorAll('.projects__filter');
    const projects = document.querySelectorAll('.project-card');

    if (!filters.length || !projects.length) return;

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;

            // Actualizar filtro activo
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // Filtrar proyectos con animación
            projects.forEach((project, index) => {
                const projectCategory = project.dataset.category;

                if (category === 'all' || projectCategory === category) {
                    // Mostrar con animación
                    project.classList.remove('hidden');
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        project.style.transition = 'all 0.4s ease';
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    // Ocultar con animación
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        project.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}
