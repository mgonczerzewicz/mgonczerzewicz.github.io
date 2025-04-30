// scripts/cookies.js

document.addEventListener("DOMContentLoaded", () => {
    // Pobierz referencje do elementów banera, ustawień, body i głównych elementów treści
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");
    const body = document.body;
    const mainContentElements = document.querySelectorAll("body > *:not(#cookie-banner):not(#cookie-settings):not(script)"); // Wykluczamy też skrypty, choć dynamicznie ładowane są na końcu body

    // --- DODAJ TEN BLOK NA POCZĄTKU (PO DEKLARACJACH ZMIENNYCH) ---
    // Sprawdź aktualną ścieżkę URL strony (np. '/polityka-cookies.html')
    const currentPagePath = window.location.pathname;

    // Lista ścieżek stron polityk, na których baner NIE powinien się pokazywać
    const policyPages = [
        '/polityka-cookies.html',
        '/polityka-prywatnosci.html',
        // Dodaj inne strony polityk, jeśli je masz, upewnij się, że ścieżki zgadzają się dokładnie (ze slashem na początku)
    ];

    // Jeśli aktualna ścieżka strony znajduje się na liście stron polityk:
    if (policyPages.includes(currentPagePath)) {
        console.log('Na stronie polityki, pomijam inicjalizację banera cookies.');

        // Upewnij się, że elementy banera i ustawień są ukryte, jeśli istnieją w HTML na tych stronach
        if (banner) banner.classList.add('hidden');
        if (settings) settings.classList.add('hidden');

        // Upewnij się, że przewijanie jest włączone i wskaźniki myszy są aktywne
        body.style.overflow = ""; // Włącz przewijanie body
        // Resetuj pointer-events na głównych elementach treści
         mainContentElements.forEach(el => {
              // Sprawdź, czy styl blokujący był ustawiony i usuń go
              if (el.style.pointerEvents === 'none') {
                  el.style.pointerEvents = ''; // Usuń styl blokujący
              }
              // Jeśli używasz _originalPointerEvents do zapisywania stanu, możesz go przywrócić,
              // ale na stronach polityk blokowanie nie powinno w ogóle nastąpić przez ten skrypt.
         });


        // --- Zakończ wykonywanie reszty skryptu na stronach polityk ---
        return; // Zatrzymaj dalsze wykonywanie funkcji DOMContentLoaded
    }
    // --- KONIEC BLOKU SPRAWDZAJĄCEGO ---


    // --- Jeśli NIE JESTEŚMY na stronie polityki, kontynuuj normalną logikę cookies ---

    const savedPrefs = localStorage.getItem("cookie-preferences"); // Pobierz zapisane preferencje


    // --- Funkcja do dynamicznego ładowania skryptu ---
    function loadScript(src, id = null, dataAttributes = {}) {
        // Sprawdź, czy skrypt o danym src lub id już istnieje
        if (document.querySelector(`script[src="${src}"]`) || (id && document.getElementById(id))) {
            //console.log(`Skrypt ${src || '#' + id} już załadowany, pomijam.`);
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        if (id) script.id = id;
        script.async = true; // Użyj async dla lepszej wydajności
        for (const key in dataAttributes) {
            if (dataAttributes.hasOwnProperty(key)) {
                script.dataset[key] = dataAttributes[key];
            }
        }

        // Dodaj skrypt na końcu body, aby nie blokował renderowania
        document.body.appendChild(script);
        //console.log(`Dynamicznie załadowano skrypt: ${src}`);
    }

    // --- Funkcja do ładowania stylów ---
    function loadStylesheet(href, id = null) {
         if (document.querySelector(`link[href="${href}"]`) || (id && document.getElementById(id))) {
             //console.log(`Arkusz stylów ${href || '#' + id} już załadowany, pomijam.`);
             return;
         }
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = href;
         if (id) link.id = id;
         document.head.appendChild(link);
         //console.log(`Dynamicznie załadowano arkusz stylów: ${href}`);
    }


    // --- Funkcja decydująca o ładowaniu skryptów na podstawie zgody ---
    function loadScriptsByConsent(preferences) {
        console.log("Ładowanie skryptów na podstawie preferencji:", preferences);

        // --- Skrypty ładowane ZAWSZE po podjęciu decyzji (traktowane jako niezbędne/podstawowe funkcjonalności strony) ---
        // Blog-list.js przeniesiony tutaj - załaduje się, gdy tylko zostanie podjęta decyzja o cookies.
        loadScript('scripts/blog-list.js', 'blog-list-script'); // Skrypt do ładowania listy bloga

        // --- Skrypty funkcjonalne (załadowane jeśli preferences.functional jest true) ---
        if (preferences.functional) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', 'jquery-script'); // jQuery
            loadScript('https://kit.fontawesome.com/518e7fbed8.js', 'fontawesome-script', { 'crossorigin': 'anonymous' }); // Font Awesome

            // Skrypty/Style zależne od jQuery i Slick
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', 'slick-js-script'); // Slick JS
            loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css', 'slick-css-script'); // Slick CSS
            loadStylesheet(
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css',
                'slick-theme-script'
            ); // Slick Theme CSS

            // Skrypty Twojej strony, które mogą zależeć od powyższych
            loadScript('scripts/main.js', 'main-script');
            loadScript('scripts/carousel.js', 'carousel-script');
        }

        // Skrypty analityczne (np. Google Analytics) - ładowane tylko jeśli preferences.analytics jest true
        if (preferences.analytics) {
            // PRZYKŁAD: Dodaj tutaj ładowanie skryptu Google Analytics
            // loadScript('https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID', 'google-analytics-gtag');
            // loadScript('scripts/init-analytics.js'); // Lub Twój własny skrypt inicjujący GA po załadowaniu gtag
            console.log("Ładowanie skryptów analitycznych...");
        }

        // Skrypty marketingowe (np. piksele śledzące, skrypty reklamowe) - ładowane tylko jeśli preferences.marketing jest true
        if (preferences.marketing) {
             // PRZYKŁAD: Dodaj tutaj ładowanie skryptu Facebook Pixel
             // loadScript('https://connect.facebook.net/en_US/fbevents.js', 'facebook-pixel');
             console.log("Ładowanie skryptów marketingowych...");
        }

        // Skrypty integracji z mediami społecznościowymi (np. widgety Twittera, przyciski udostępniania, osadzone posty) - ładowane tylko jeśli preferences.socialMedia jest true
        if (preferences.socialMedia) {
             // PRZYKŁAD: Dodaj tutaj ładowanie skryptu Twitter Widgets
             // loadScript('https://platform.twitter.com/widgets.js', 'twitter-widgets');
             console.log("Ładowanie skryptów social media...");
        }

        // Możesz potrzebować mechanizmu do ponownego uruchomienia funkcji, które zależą
        // od nowo załadowanych skryptów (np. inicjalizacji slidera w carousel.js lub main.js).
        // Często można to zrobić poprzez wywołanie funkcji inicjalizujących po załadowaniu skryptów,
        // lub upewnienie się, że main.js/carousel.js same czekają na załadowanie zależności.
    }

    // --- Funkcja do odblokowywania interakcji na elementach głównej treści ---
    function unlockMainContent() {
        body.style.overflow = ""; // Przywraca domyślne przewijanie
        mainContentElements.forEach(el => {
            if (typeof el._originalPointerEvents !== 'undefined') {
                el.style.pointerEvents = el._originalPointerEvents;
                delete el._originalPointerEvents;
            } else {
                 el.style.pointerEvents = '';
             }
        });

        if (banner) banner.style.pointerEvents = "";
        if (settings) settings.style.pointerEvents = "";
    }


    // --- Logika po wczytaniu strony (normalna ścieżka, gdy nie jesteśmy na stronie polityki) ---
    // if (savedPrefs) { ... } else { ... }
    // Ten blok kodu znajduje się poniżej definicji funkcji, aby mogły być one wywołane.

    if (savedPrefs) {
        // Jeśli preferencje zapisane, ukrywamy baner/ustawienia, odblokowujemy i ŁADUJEMY skrypty
        banner.classList.add("hidden");
        settings.classList.add("hidden");
        unlockMainContent(); // Wywołanie funkcji
        try {
             const preferences = JSON.parse(savedPrefs);
             loadScriptsByConsent(preferences); // Wywołanie funkcji
         } catch (e) {
             console.error("Błąd parsowania preferencji cookies z localStorage:", e);
             // W przypadku błędu, traktujemy jak brak zgody i pokazujemy baner
             banner.classList.remove("hidden");
             settings.classList.add("hidden");
             body.style.overflow = "hidden";
              mainContentElements.forEach(el => {
                 if (el.style.pointerEvents !== 'none') {
                     el._originalPointerEvents = el.style.pointerEvents;
                     el.style.pointerEvents = "none";
                 }
             });
         }

    } else {
        // Jeśli brak preferencji, pokazujemy baner i blokujemy resztę strony
        banner.classList.remove("hidden");
        settings.classList.add("hidden");
        body.style.overflow = "hidden"; // Blokuje przewijanie

        mainContentElements.forEach(el => {
            if (el.style.pointerEvents !== 'none') {
                el._originalPointerEvents = el.style.pointerEvents;
                el.style.pointerEvents = "none";
            }
        });

        // Upewnij się, że baner i jego elementy są klikalne
        if (banner) {
            banner.style.pointerEvents = "auto";
            // Nie musimy iterować po elementach wewnątrz, jeśli kontener ma auto
            // banner.querySelectorAll("a, button, input, select, textarea").forEach(el => el.style.pointerEvents = "auto");
        }
    }


    // --- Obsługa przycisków ---
    // ... acceptAllBtn handler ...
    const acceptAllBtn = document.getElementById("accept-all");
    if(acceptAllBtn) { // Sprawdzenie czy element istnieje
        acceptAllBtn.addEventListener("click", () => {
            const preferences = { functional: true, analytics: true, marketing: true, socialMedia: true };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden"); settings.classList.add("hidden");
            unlockMainContent(); // Wywołanie funkcji
            loadScriptsByConsent(preferences); // Wywołanie funkcji
        });
    }

    // ... acceptEssentialBtn handler ...
    const acceptEssentialBtn = document.getElementById("accept-essential");
     if(acceptEssentialBtn) { // Sprawdzenie czy element istnieje
        acceptEssentialBtn.addEventListener("click", () => {
            const preferences = { functional: true, analytics: false, marketing: false, socialMedia: false };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden"); settings.classList.add("hidden");
            unlockMainContent(); // Wywołanie funkcji
            loadScriptsByConsent(preferences); // Wywołanie funkcji
        });
    }

    // ... customizeBtn handler ...
    const customizeBtn = document.getElementById("customize");
     if(customizeBtn) { // Sprawdzenie czy element istnieje
        customizeBtn.addEventListener("click", () => {
            banner.classList.add("hidden");
            settings.classList.remove("hidden");

            if (settings) {
                 settings.style.pointerEvents = "auto";
            }
            if (banner) banner.style.pointerEvents = "none";
        });
    }

    // ... cookieForm submit handler ...
    const cookieForm = document.getElementById("cookie-form");
     if(cookieForm) { // Sprawdzenie czy element istnieje
        cookieForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const preferences = {
                functional: true,
                analytics: document.getElementById("analytics") ? document.getElementById("analytics").checked : false,
                marketing: document.getElementById("marketing") ? document.getElementById("marketing").checked : false,
                socialMedia: document.getElementById("social-media") ? document.getElementById("social-media").checked : false
            };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            settings.classList.add("hidden"); banner.classList.add("hidden");
            unlockMainContent(); // Wywołanie funkcji
            loadScriptsByConsent(preferences); // Wywołanie funkcji
        });
    }

}); // Koniec funkcji obsługi DOMContentLoaded

// Usunięto Ważna uwaga