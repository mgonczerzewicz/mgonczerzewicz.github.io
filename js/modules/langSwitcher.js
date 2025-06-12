// js/modules/langSwitcher.js

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
        document.documentElement.lang = lang; // Ustawia atrybut lang na <html>
        localStorage.setItem('language', lang); // Zapisuje wybrany język
        updateButtonText(lang); // Aktualizuje tekst na przyciskach

        let currentPathname = window.location.pathname;
        let newUrl = currentPathname; // Domyślnie nowa ścieżka to obecna

        // Określ bazową ścieżkę repozytorium (np. '/moje-repo/')
        // To jest kluczowe dla GitHub Pages, jeśli nie jesteś na custom domain.
        // Jeśli Twoja strona jest pod https://USERNAME.github.io/REPO_NAME/,
        // to basePath będzie '/REPO_NAME/'.
        // Jeśli jest pod https://USERNAME.github.io/, to basePath będzie '/'.
        const pathSegments = currentPathname.split('/').filter(segment => segment.length > 0);
        let basePath = '/';
        // Jeżeli pierwszy segment path (po usunięciu '/' na początku/końcu)
        // nie jest 'en' ani 'index.html', to zakładamy, że to nazwa repo.
        if (pathSegments.length > 0 && pathSegments[0] !== 'en' && !pathSegments[pathSegments.length - 1].includes('.')) {
            basePath += pathSegments[0] + '/';
        }


        if (lang === 'en') {
            // Jeśli już jesteśmy w wersji angielskiej, nic nie robimy.
            if (currentPathname.includes(basePath + 'en/')) {
                return;
            }
            // Zbuduj ścieżkę do angielskiej wersji
            if (currentPathname === basePath || currentPathname.endsWith('/index.html')) {
                newUrl = basePath + 'en/index.html';
            } else {
                // Jeśli jesteśmy na innej stronie (np. /about.html), przejdź do /en/about.html
                newUrl = currentPathname.replace(basePath, basePath + 'en/');
            }
        } else if (lang === 'pl') {
            // Jeśli już jesteśmy w wersji polskiej (i nie ma 'en/'), nic nie robimy.
            if (!currentPathname.includes(basePath + 'en/')) {
                // Jeżeli currentPathname jest np. / lub /index.html
                if (currentPathname === basePath || currentPathname.endsWith('/index.html')) {
                    return; // Już jesteśmy na polskim indexie
                }
            }

            // Zbuduj ścieżkę do polskiej wersji
            // Usuń '/en/' ze ścieżki
            newUrl = currentPathname.replace(basePath + 'en/', basePath);
            // Upewnij się, że kończy się na index.html, jeśli to główna strona
            if (newUrl === basePath) {
                newUrl += 'index.html';
            }
        }
        
        // Finalne przekierowanie, jeśli URL się zmienił
        if (newUrl !== currentPathname) {
            window.location.href = window.location.origin + newUrl;
        }
    };

    // Inicjalizacja języka przy ładowaniu strony
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        const currentPathname = window.location.pathname;
        // Sprawdź, czy obecna ścieżka zawiera prefiks '/en/'
        if (currentPathname.includes('/en/')) {
            applyLanguage('en');
        } else {
            // Domyślnie na polski, jeśli nie ma '/en/' w URL-u
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
            event.stopPropagation(); // Zatrzymuje propagację do document
            toggleLanguage();
        });
    }

    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', toggleLanguage);
    }
}