export function initializeLangSwitcher() {
    const langToggleDesktop = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    const updateButtonText = (lang) => {
        const text = lang.toUpperCase();
        if (langToggleMobile) {
            langToggleMobile.textContent = text;
        }
        if (langToggleDesktop) {
            langToggleDesktop.textContent = text;
        }
    };

    const applyLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        updateButtonText(lang);

        let currentPathname = window.location.pathname;
        let newUrl = currentPathname;
        const pathSegments = currentPathname.split('/').filter(segment => segment.length > 0);
        let basePath = '/';
        if (pathSegments.length > 0 && pathSegments[0] !== 'en' && !pathSegments[pathSegments.length - 1].includes('.')) {
            basePath += pathSegments[0] + '/';
        }
        if (lang === 'en') {
            if (currentPathname.includes(basePath + 'en/')) {
                return;
            }
            if (currentPathname === basePath || currentPathname.endsWith('/index.html')) {
                newUrl = basePath + 'en/index.html';
            } else {
                newUrl = currentPathname.replace(basePath, basePath + 'en/');
            }
        } else if (lang === 'pl') {
            if (!currentPathname.includes(basePath + 'en/')) {
                if (currentPathname === basePath || currentPathname.endsWith('/index.html')) {
                    return;
                }
            }

            newUrl = currentPathname.replace(basePath + 'en/', basePath);
            if (newUrl === basePath) {
                newUrl += 'index.html';
            }
        }
        
        if (newUrl !== currentPathname) {
            window.location.href = window.location.origin + newUrl;
        }
    };

    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        const currentPathname = window.location.pathname;
        if (currentPathname.includes('/en/')) {
            applyLanguage('en');
        } else {
            applyLanguage('pl');
        }
    }

    const toggleLanguage = () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'pl' ? 'en' : 'pl';
        applyLanguage(newLang);
    };

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleLanguage();
        });
    }

    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', toggleLanguage);
    }
}