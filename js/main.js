// main.js

import { initializeHeader } from './modules/navigation.js';
import { initializeThemeSwitcher } from './modules/themeSwitcher.js';
import { initializeLangSwitcher } from './modules/langSwitcher.js';
import { initializeStepHeaders } from './utils/stepHeaders.js';
import { initializeRoadMap } from './utils/roadMap.js';
import { initializeParticles } from './modules/particles.js';
import { initializeChangingWord } from './utils/changingWord.js';



document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizuj wszystkie moduły
    initializeHeader();
    initializeThemeSwitcher();
    initializeLangSwitcher();
    initializeStepHeaders();
    initializeRoadMap();
    initializeParticles();
    initializeChangingWord();

    console.log('MICGO: Wszystkie skrypty załadowane i zainicjowane.');
});