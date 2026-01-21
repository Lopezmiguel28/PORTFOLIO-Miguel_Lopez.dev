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
        const originalText = btnText.textContent;

        // Estado de carga
        btnText.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simular envío (reemplazar con lógica real de envío)
        try {
            await simulateSubmit(data);

            // Éxito
            showMessage(form, 'success', '¡Mensaje enviado correctamente! Te responderé pronto.');
            form.reset();

        } catch (error) {
            // Error
            showMessage(form, 'error', 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
        } finally {
            // Restaurar botón
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Validación básica requerida
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }

    // Validación de email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    // Actualizar estilo
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
    }

    return isValid;
}

function showMessage(form, type, text) {
    // Remover mensaje anterior
    const existingMessage = form.querySelector('.form__message');
    if (existingMessage) existingMessage.remove();

    // Crear nuevo mensaje
    const message = document.createElement('div');
    message.className = `form__message form__message--${type}`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;

    form.appendChild(message);

    // Remover después de 5 segundos
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

function simulateSubmit(data) {
    return new Promise((resolve, reject) => {
        // Simular delay de red
        setTimeout(() => {
            // Simular éxito (90% de las veces)
            if (Math.random() > 0.1) {
                console.log('📧 Formulario enviado:', data);
                resolve();
            } else {
                reject(new Error('Error de red simulado'));
            }
        }, 1500);
    });
}
