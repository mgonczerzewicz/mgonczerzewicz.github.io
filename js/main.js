import { initializeHeader } from './modules/navigation.js';
import { initializeThemeSwitcher } from './modules/themeSwitcher.js';
import { initializeLangSwitcher } from './modules/langSwitcher.js';
import { initializeStepHeaders } from './utils/stepHeaders.js';
import { initializeRoadMap } from './utils/roadMap.js';
import { initializeParticles } from './modules/particles.js';
import { initializeChangingWord } from './utils/changingWord.js';
import { initializeServicesItems } from './utils/servicesItems.js';
import { initializeFooterArrow } from './utils/footerArrow.js';



document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
    initializeThemeSwitcher();
    initializeLangSwitcher();
    initializeStepHeaders();
    initializeRoadMap();
    initializeParticles();
    initializeChangingWord();
    initializeServicesItems();
    initializeFooterArrow();

    console.log('MICGO: Wszystkie skrypty załadowane i zainicjowane.');
});

