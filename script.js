// 1. Definicja elementów
const header = document.getElementById('mainHeader');
const hamburger = document.getElementById('hamburgerButton');
const menu = document.getElementById('fullscreenMenu');
const SCROLL_THRESHOLD = 10; // Próg przewijania w pikselach

/* --- LOGIKA SCROLL-TRIGGER (EFEKT LIQUID GLASS) --- */
function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();


/* --- LOGIKA MENU HAMBURGERA (OTWIERANIE/ZAMYKANIE) --- */

function closeMenu() {
    hamburger.classList.remove('is-active');
    menu.classList.remove('is-open');
    
    // ODBLOKOWANIE PRZEWIJANIA: Przywrócenie domyślnego zachowania
    document.body.style.overflow = ''; 
}

function openMenu() {
    hamburger.classList.add('is-active');
    menu.classList.add('is-open');
    
    // BLOKOWANIE PRZEWIJANIA: Ustawienie overflow na 'hidden'
    document.body.style.overflow = 'hidden';
}

function toggleMenu() {
    // Sprawdza, czy menu jest już otwarte
    if (menu.classList.contains('is-open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// 1. Nasłuchiwanie na kliknięcie w ikonę hamburgera
hamburger.addEventListener('click', toggleMenu);

// 2. Nasłuchiwanie na kliknięcie w linki w menu (aby zamknąć menu po wybraniu opcji)
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});