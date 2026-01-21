/**
 * =============================================
 * SKILLS TABS MODULE
 * Pestañas de habilidades
 * =============================================
 */

export function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills__tab');
    const panels = document.querySelectorAll('.skills__panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;

            // Remover clase active de todos los tabs y panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activar el tab clickeado y su panel correspondiente
            tab.classList.add('active');
            document.getElementById(targetPanel)?.classList.add('active');

            // Re-animar los elementos del panel
            const newPanelElements = document.querySelectorAll(`#${targetPanel} .animate-on-scroll`);
            newPanelElements.forEach((el, index) => {
                el.classList.remove('visible');
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        });
    });
}
