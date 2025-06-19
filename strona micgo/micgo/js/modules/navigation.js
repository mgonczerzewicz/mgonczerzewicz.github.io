// js/modules/header.js

export function initializeHeader() {
    const header = document.querySelector('.site-header');
    const hamburgerToggle = document.getElementById('hamburger-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile'); // Te są tu używane do event.stopPropagation()
    const langToggleMobile = document.getElementById('lang-toggle-mobile');   // Ale ich logika będzie w osobnych modułach

    // Obsługa przewijania strony
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('site-header--scrolled');
        } else {
            header.classList.remove('site-header--scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Wywołaj raz przy ładowaniu strony, aby ustawić początkowy stan

    // Obsługa kliknięcia w przycisk hamburgera
    hamburgerToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
        hamburgerToggle.classList.toggle('is-open');
        hamburgerToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));

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

    // Obsługa kliknięć poza menu mobilnym (z wykluczeniem hamburgera, theme/lang toggle)
    document.addEventListener('click', (event) => {
        const isClickInsideMobileMenu = mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburgerToggle.contains(event.target);
        const isClickOnThemeToggle = themeToggleMobile ? themeToggleMobile.contains(event.target) : false;
        const isClickOnLangToggle = langToggleMobile ? langToggleMobile.contains(event.target) : false;

        if (mobileMenu.classList.contains('is-open')) {
            // Jeśli kliknięto na hamburgera, themeToggleMobile lub langToggleMobile, nie zamykaj menu
            if (isClickOnHamburger || isClickOnThemeToggle || isClickOnLangToggle) {
                return;
            }

            // Jeśli kliknięto poza obszarem menu LUB na link w menu, zamknij menu
            if (!isClickInsideMobileMenu || event.target.tagName === 'A') {
                mobileMenu.classList.remove('is-open');
                hamburgerToggle.classList.remove('is-open');
                hamburgerToggle.setAttribute('aria-expanded', false);
                header.classList.remove('site-header--menu-open');

                const icon = hamburgerToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Te listenery zostają tutaj, aby użyć event.stopPropagation()
    // i zapobiec zamknięciu menu, gdy są kliknięte.
    // Ich faktyczna logika (zmiana motywu/języka) powinna być w ich modułach.
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', (event) => {
            event.stopPropagation(); // Ważne: Zatrzymuje propagację do document
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (event) => {
            event.stopPropagation(); // Ważne: Zatrzymuje propagację do document
        });
    }
}