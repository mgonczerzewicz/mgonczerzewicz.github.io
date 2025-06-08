document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(currentTheme);
        themeToggle.querySelector('i').className = currentTheme === 'dark-mode' ? 'fas fa-moon' : 'fas fa-sun';
    } else {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.querySelector('i').className = 'fas fa-sun';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.querySelector('i').className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    const langButton = document.getElementById('lang-button');
    const langList = document.getElementById('lang-list');
    const langSwitcher = document.querySelector('.lang-switcher');

    langButton.addEventListener('click', (event) => {
        event.stopPropagation();
        langList.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!langSwitcher.contains(event.target) && !langList.classList.contains('hidden')) {
            langList.classList.add('hidden');
        }
    });

    langList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const selectedLang = event.target.dataset.lang;
            langButton.textContent = selectedLang.toUpperCase();
            langList.classList.add('hidden');
            
            console.log('Wybrano język:', selectedLang);
            document.documentElement.lang = selectedLang;
        }
    });
});