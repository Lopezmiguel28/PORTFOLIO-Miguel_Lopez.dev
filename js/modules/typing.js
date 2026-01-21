/**
 * =============================================
 * TYPING EFFECT MODULE
 * Efecto de escritura en el hero
 * =============================================
 */

export function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');

    if (!typingElement) return;

    const phrases = [
        'Desarrollador Android',
        'Estudiante de DAM',
        'Full Stack Developer',
        'Apasionado por Java & Kotlin',
        'Creador de Apps',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Borrar caracteres
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Escribir caracteres
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Lógica de cambio de estado
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa al final de la frase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Cambiar a la siguiente frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Iniciar después de un pequeño delay
    setTimeout(type, 1000);
}
