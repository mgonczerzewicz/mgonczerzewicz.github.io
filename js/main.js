// main.js

import { initializeHeader } from './modules/navigation.js';
import { initializeThemeSwitcher } from './modules/themeSwitcher.js';
import { initializeLangSwitcher } from './modules/langSwitcher.js';
import { initializeStepHeaders } from './utils/stepHeaders.js';
import { initializeRoadMap } from './utils/roadMap.js';



document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizuj wszystkie moduły
    initializeHeader();
    initializeThemeSwitcher();
    initializeLangSwitcher();
    initializeStepHeaders();
    initializeRoadMap();

    console.log('MICGO: Wszystkie skrypty załadowane i zainicjowane.');
});