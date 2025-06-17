export const initializeThemeSwitcher = () => {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-button');
    const body = document.body;

    const updateThemeIcon = () => {
        const currentTheme = body.getAttribute('data-theme');
        themeToggleBtns.forEach(btn => {
            // Zakładamy, że btn to nasz .theme-switcher-slider
            const sliderHandle = btn.querySelector('.slider-handle');
            if (sliderHandle) { // Upewnij się, że gałka istnieje
                const darkIcon = sliderHandle.querySelector('.dark-icon');
                const lightIcon = sliderHandle.querySelector('.light-icon');

                if (currentTheme === 'dark') {
                    // W trybie ciemnym gałka jest na górze, pokazujemy księżyc
                    if (darkIcon) darkIcon.style.opacity = '1';
                    if (lightIcon) lightIcon.style.opacity = '0';
                    btn.setAttribute('aria-checked', 'false'); // 'false' dla ciemnego motywu
                } else {
                    // W trybie jasnym gałka jest na dole, pokazujemy słońce
                    if (darkIcon) darkIcon.style.opacity = '0';
                    if (lightIcon) lightIcon.style.opacity = '1';
                    btn.setAttribute('aria-checked', 'true'); // 'true' dla jasnego motywu
                }
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
        updateThemeIcon(); // Wywołujemy po załadowaniu motywu
    };

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon(); // Wywołujemy po zmianie motywu
        });
    });

    loadTheme();
    console.log('MICGO: theme changer initialized.');
};