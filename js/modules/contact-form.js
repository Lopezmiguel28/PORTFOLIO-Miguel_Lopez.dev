/**
 * =============================================
 * CONTACT FORM MODULE
 * Validación y envío del formulario
 * =============================================
 */

export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn__text');
        const originalText = btnText ? btnText.textContent : 'Enviar';

        // 1. Efecto visual de carga
        if (btnText) btnText.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // 2. Preparar datos
        const formData = new FormData(form);

        try {
            // 3. Petición real a Formspree
            const response = await fetch("https://formspree.io/f/xzddrlgj", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Éxito: Formspree recibió el mensaje
                showMessage(form, 'success', '¡Mensaje enviado con éxito! Te responderé pronto.');
                form.reset();
                // Limpiar estilos de validación
                form.querySelectorAll('.valid, .error').forEach(el => el.classList.remove('valid', 'error'));
            } else {
                throw new Error('Fallo en el servidor');
            }
        } catch (error) {
            // Error: No hay internet o Formspree está caído
            showMessage(form, 'error', 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
        } finally {
            // 4. Restaurar botón siempre
            if (btnText) btnText.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

function showMessage(form, type, text) {
    const existingMessage = form.querySelector('.form__message');
    if (existingMessage) existingMessage.remove();

    const message = document.createElement('div');
    message.className = `form__message form__message--${type}`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    form.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}