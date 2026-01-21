/**
 * =============================================
 * MAIN.JS - Portfolio Principal
 * Módulo de inicialización y configuración
 * =============================================
 */

// Importar módulos
import { initLoader } from './modules/loader.js';
import { initNavigation } from './modules/navigation.js';
import { initTypingEffect } from './modules/typing.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initSkillsTabs } from './modules/skills-tabs.js';
import { initProjectFilters } from './modules/project-filters.js';
import { initContactForm } from './modules/contact-form.js';
import { initCursor } from './modules/cursor.js';
import { initParticles } from './modules/particles.js';
import { initCounters } from './modules/counters.js';

/**
 * Inicialización principal de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los módulos
    initLoader();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillsTabs();
    initProjectFilters();
    initContactForm();
    initCursor();
    initParticles();
    initCounters();
    
    console.log('🚀 Portfolio de Miguel cargado correctamente');
});
