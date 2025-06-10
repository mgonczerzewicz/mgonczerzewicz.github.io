// js/modules/themeSwitcher.js

export const initializeThemeSwitcher = () => {
    // Zmieniamy na querySelectorAll, aby pobrać WSZYSTKIE przyciski z daną klasą
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-button');
    const body = document.body;

    const updateThemeIcon = () => {
        const currentTheme = body.getAttribute('data-theme');
        themeToggleBtns.forEach(btn => { // Iterujemy przez wszystkie przyciski
            if (currentTheme === 'dark') {
                btn.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Zmień na słońce w trybie ciemnym
            } else {
                btn.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Zmień na księżyc w trybie jasnym
            }
        });
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }
        updateThemeIcon(); // Zaktualizuj ikonę po załadowaniu motywu
    };

    // Dodajemy nasłuchiwanie zdarzeń do KAŻDEGO przycisku
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon(); // Zaktualizuj ikonę po zmianie motywu
        });
    });

    loadTheme(); // Załaduj motyw przy starcie
};