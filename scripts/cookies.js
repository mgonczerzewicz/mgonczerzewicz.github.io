// scripts/cookies.js

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");
    const body = document.body;
    const mainContentElements = document.querySelectorAll("body > *:not(#cookie-banner):not(#cookie-settings):not(script)"); // Wykluczamy też skrypty, choć dynamicznie ładowane są na końcu body

    const savedPrefs = localStorage.getItem("cookie-preferences");

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

    // --- Funkcja do ładowania stylów (opcjonalne, ale dobre dla niektórych bibliotek jak Slick CSS) ---
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


    // --- Funkcja, która decyduje, które skrypty załadować na podstawie zgody ---
    function loadScriptsByConsent(preferences) {
        console.log("Ładowanie skryptów na podstawie preferencji:", preferences);

        // Skrypty funkcjonalne i niezbędne do działania (np. jQuery, UI components, carousel)
        if (preferences.functional) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', 'jquery-script'); // jQuery
            loadScript('https://kit.fontawesome.com/518e7fbed8.js', 'fontawesome-script', { 'crossorigin': 'anonymous' }); // Font Awesome

            // Po załadowaniu jQuery (możesz potrzebować nasłuchiwać zdarzenia load lub poczekać), załaduj skrypty zależne od niego
            // Prostszym podejściem jest załadowanie ich zaraz po jQuery, zakładając że jQuery szybko się wczyta
             loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', 'slick-js-script'); // Slick JS
             loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css', 'slick-css-script'); // Slick CSS
             loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css', 'slick-theme-script'); // Slick Theme CSS

            // Skrypty Twojej strony, które mogą zależeć od powyższych
            loadScript('scripts/main.js', 'main-script');
            loadScript('scripts/carousel.js', 'carousel-script'); // Zakładamy, że carousel.js inicjuje Slick slider

        }

        // Skrypty analityczne (np. Google Analytics)
        if (preferences.analytics) {
            // PRZYKŁAD: Dodaj tutaj ładowanie skryptu Google Analytics
            // loadScript('https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID', 'google-analytics-gtag');
            // loadScript('scripts/init-analytics.js'); // Lub Twój własny skrypt inicjujący GA po załadowaniu gtag
            console.log("Ładowanie skryptów analitycznych...");
        }

        // Skrypty marketingowe (np. piksele śledzące, skrypty reklamowe)
        if (preferences.marketing) {
             // PRZYKŁAD: Dodaj tutaj ładowanie skryptu Facebook Pixel
             // loadScript('https://connect.facebook.net/en_US/fbevents.js', 'facebook-pixel');
             console.log("Ładowanie skryptów marketingowych...");
        }

        // Skrypty integracji z mediami społecznościowymi (np. widgety Twittera, przyciski udostępniania, osadzone posty)
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


    // --- Logika po wczytaniu strony ---
    if (savedPrefs) {
        // Jeśli preferencje zapisane, ukrywamy baner/ustawienia, odblokowujemy i ŁADUJEMY skrypty
        banner.classList.add("hidden");
        settings.classList.add("hidden");
        unlockMainContent();
        try {
             const preferences = JSON.parse(savedPrefs);
             loadScriptsByConsent(preferences); // Wczytaj skrypty na podstawie zapisanej zgody
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

        // Upewnij się, że baner i jego elementy są klikalne (powinno być już w CSS, ale dla pewności)
        if (banner) {
            banner.style.pointerEvents = "auto";
            // Nie musimy iterować po elementach wewnątrz, jeśli kontener ma auto
            // banner.querySelectorAll("a, button, input, select, textarea").forEach(el => el.style.pointerEvents = "auto");
        }
    }

    // --- Funkcja do odblokowywania interakcji na elementach głównej treści ---
    function unlockMainContent() {
        body.style.overflow = ""; // Przywraca domyślne przewijanie
        mainContentElements.forEach(el => {
            if (typeof el._originalPointerEvents !== 'undefined') {
                el.style.pointerEvents = el._originalPointerEvents;
                delete el._originalPointerEvents;
            } else {
                 // Jeśli _originalPointerEvents nie było ustawione (np. element dodany dynamicznie), po prostu usuń style
                 el.style.pointerEvents = '';
            }
        });

        if (banner) banner.style.pointerEvents = ""; // Resetuj pointer-events dla banera
        if (settings) settings.style.pointerEvents = ""; // Resetuj pointer-events dla ustawień
    }

    // --- Obsługa przycisków ---

    // Akceptacja wszystkich cookies
    const acceptAllBtn = document.getElementById("accept-all");
    if(acceptAllBtn) { // Sprawdzenie czy element istnieje
        acceptAllBtn.addEventListener("click", () => {
            const preferences = {
                functional: true,
                analytics: true,
                marketing: true,
                socialMedia: true
            };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden");
            settings.classList.add("hidden");
            unlockMainContent();
            loadScriptsByConsent(preferences); // Załaduj wszystkie skrypty
        });
    }


    // Akceptacja tylko niezbędnych cookies
    const acceptEssentialBtn = document.getElementById("accept-essential");
     if(acceptEssentialBtn) { // Sprawdzenie czy element istnieje
        acceptEssentialBtn.addEventListener("click", () => {
            const preferences = {
                functional: true, // Niezbędne + Funkcjonalne (często traktowane razem)
                analytics: false,
                marketing: false,
                socialMedia: false
            };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden");
            settings.classList.add("hidden");
            unlockMainContent();
            loadScriptsByConsent(preferences); // Załaduj tylko niezbędne/funkcjonalne
        });
    }

    // Kliknięcie w "Personalizuj"
    const customizeBtn = document.getElementById("customize");
     if(customizeBtn) { // Sprawdzenie czy element istnieje
        customizeBtn.addEventListener("click", () => {
            banner.classList.add("hidden");
            settings.classList.remove("hidden");

            // Upewnij się, że ustawienia i ich elementy są klikalne
            if (settings) {
                settings.style.pointerEvents = "auto";
                // settings.querySelectorAll("a, button, input, select, textarea").forEach(el => el.style.pointerEvents = "auto");
            }
            if (banner) banner.style.pointerEvents = "none"; // Upewnij się, że baner jest zablokowany
        });
    }


    // Zapis ustawień cookies
    const cookieForm = document.getElementById("cookie-form");
     if(cookieForm) { // Sprawdzenie czy element istnieje
        cookieForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Zapobiega przeładowaniu strony
            const preferences = {
                functional: true, // Niezbędne + Funkcjonalne (zakładając checkbox "Niezbędne" jest disabled i zawsze true)
                analytics: document.getElementById("analytics") ? document.getElementById("analytics").checked : false,
                marketing: document.getElementById("marketing") ? document.getElementById("marketing").checked : false,
                socialMedia: document.getElementById("social-media") ? document.getElementById("social-media").checked : false
            };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            settings.classList.add("hidden");
            banner.classList.add("hidden");
            unlockMainContent();
            loadScriptsByConsent(preferences); // Załaduj skrypty na podstawie wybranych ustawień
        });
    }

     // Opcjonalnie: Jeśli chcesz, aby linki do polityk w banerze działały pomimo pointer-events na banerze
     // Możesz dodać specjalne style CSS lub upewnić się, że linki do polityk mają wyższe z-index
     // lub są wykluczone z blokowania w inny sposób. Obecna logika w JS odblokowuje wszystkie elementy
     // wewnątrz banera, więc linki do polityk powinny być klikalne. W HTML były linki do polityk,
     // upewnij się, że mają klasę 'cookies-policy-link' jak w CSS i są wewnątrz banera lub ustawień.
});

// Ważna uwaga: Ten kod zakłada, że "Niezbędne" cookies (checkbox w HTML) są zawsze włączone
// i traktuje "functional" jako kategorię, która zawsze jest włączana po kliknięciu dowolnego przycisku zgody.
// Jeśli Twoja definicja "niezbędnych" jest bardzo restrykcyjna, możesz potrzebować rozróżnić
// "essential" (absolutnie wymagane do działania strony, np. sesja użytkownika) i "functional"
// (np. preferencje językowe, wygląd UI, carousels), gdzie tylko essential są ładowane ZAWSZE,
// a functional po zgodzie na tę kategorię. Przyjąłem tutaj, że functional=true dla każdej pozytywnej decyzji.