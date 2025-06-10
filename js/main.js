import { initializeThemeSwitcher } from './modules/themeSwitcher.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeThemeSwitcher();
    console.log('Theme switcher initialized.');

    const header = document.querySelector('.site-header');
    const hamburgerToggle = document.getElementById('hamburger-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('site-header--scrolled');
        } else {
            header.classList.remove('site-header--scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    hamburgerToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
        hamburgerToggle.classList.toggle('is-open');
        hamburgerToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));

        // Dodaj/usuń klasę zmieniającą kolor nagłówka i blur
        if (mobileMenu.classList.contains('is-open')) {
            header.classList.add('site-header--menu-open');
        } else {
            header.classList.remove('site-header--menu-open');
        }

        const icon = hamburgerToggle.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('is-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMobileMenu = mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburgerToggle.contains(event.target);
        const isClickOnThemeToggle = themeToggleMobile ? themeToggleMobile.contains(event.target) : false;
        const isClickOnLangToggle = langToggleMobile ? langToggleMobile.contains(event.target) : false;

        if (
            mobileMenu.classList.contains('is-open') &&
            !isClickOnHamburger &&
            !isClickOnThemeToggle &&
            !isClickOnLangToggle &&
            (
                !isClickInsideMobileMenu ||
                event.target.tagName === 'A'
            )
        ) {
            mobileMenu.classList.remove('is-open');
            hamburgerToggle.classList.remove('is-open');
            hamburgerToggle.setAttribute('aria-expanded', false);
            header.classList.remove('site-header--menu-open'); // Usuń klasę również przy zamykaniu kliknięciem poza
            const icon = hamburgerToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            console.log('Zmieniam motyw...');
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            console.log('Zmieniam język...');
        });
    }
});