document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");
    const body = document.body;
    const mainContentElements = document.querySelectorAll("body > *:not(#cookie-banner):not(#cookie-settings):not(script)");
    const currentPagePath = window.location.pathname;

    const policyPages = [
        '/polityka-cookies.html',
        '/polityka-prywatnosci.html',
    ];

    if (policyPages.includes(currentPagePath)) {
        console.log('Na stronie polityki, pomijam inicjalizację banera cookies.');
        if (banner) banner.classList.add('hidden');
        if (settings) settings.classList.add('hidden');

        body.style.overflow = "";
         mainContentElements.forEach(el => {
              if (el.style.pointerEvents === 'none') {
                  el.style.pointerEvents = ''; 
              }
         });
        return; 
    }

    const savedPrefs = localStorage.getItem("cookie-preferences");


    function loadScript(src, id = null, dataAttributes = {}) {
        if (document.querySelector(`script[src="${src}"]`) || (id && document.getElementById(id))) {
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        if (id) script.id = id;
        script.async = true;
        for (const key in dataAttributes) {
            if (dataAttributes.hasOwnProperty(key)) {
                script.dataset[key] = dataAttributes[key];
            }
        }
        document.body.appendChild(script);
    }
    function loadStylesheet(href, id = null) {
         if (document.querySelector(`link[href="${href}"]`) || (id && document.getElementById(id))) {
             return;
         }
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = href;
         if (id) link.id = id;
         document.head.appendChild(link);
    }
    function loadScriptsByConsent(preferences) {
        console.log("Ładowanie skryptów na podstawie preferencji:", preferences);
        loadScript('scripts/blog-list.js', 'blog-list-script');
        if (preferences.functional) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', 'jquery-script');
            loadScript('https://kit.fontawesome.com/518e7fbed8.js', 'fontawesome-script', { 'crossorigin': 'anonymous' });
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', 'slick-js-script');
            loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css', 'slick-css-script');
            loadStylesheet(
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css',
                'slick-theme-script'
            ); 
            loadScript('scripts/main.js', 'main-script');
            loadScript('scripts/carousel.js', 'carousel-script');
        }
        if (preferences.analytics) {
            console.log("Ładowanie skryptów analitycznych...");
        }
        if (preferences.marketing) {
             console.log("Ładowanie skryptów marketingowych...");
        }
        if (preferences.socialMedia) {
             console.log("Ładowanie skryptów social media...");
        }

    }

    function unlockMainContent() {
        body.style.overflow = ""; 
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



    if (savedPrefs) {
        banner.classList.add("hidden");
        settings.classList.add("hidden");
        unlockMainContent(); 
        try {
             const preferences = JSON.parse(savedPrefs);
             loadScriptsByConsent(preferences); 
         } catch (e) {
             console.error("Błąd parsowania preferencji cookies z localStorage:", e);
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
        banner.classList.remove("hidden");
        settings.classList.add("hidden");
        body.style.overflow = "hidden"; 

        mainContentElements.forEach(el => {
            if (el.style.pointerEvents !== 'none') {
                el._originalPointerEvents = el.style.pointerEvents;
                el.style.pointerEvents = "none";
            }
        });

        if (banner) {
            banner.style.pointerEvents = "auto";
        }
    }


    // --- Obsługa przycisków ---
    const acceptAllBtn = document.getElementById("accept-all");
    if(acceptAllBtn) { 
        acceptAllBtn.addEventListener("click", () => {
            const preferences = { functional: true, analytics: true, marketing: true, socialMedia: true };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden"); settings.classList.add("hidden");
            unlockMainContent(); 
            loadScriptsByConsent(preferences); 
        });
    }

    const acceptEssentialBtn = document.getElementById("accept-essential");
     if(acceptEssentialBtn) { 
        acceptEssentialBtn.addEventListener("click", () => {
            const preferences = { functional: true, analytics: false, marketing: false, socialMedia: false };
            localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
            banner.classList.add("hidden"); settings.classList.add("hidden");
            unlockMainContent(); 
            loadScriptsByConsent(preferences); 
        });
    }

    const customizeBtn = document.getElementById("customize");
     if(customizeBtn) { 
        customizeBtn.addEventListener("click", () => {
            banner.classList.add("hidden");
            settings.classList.remove("hidden");

            if (settings) {
                 settings.style.pointerEvents = "auto";
            }
            if (banner) banner.style.pointerEvents = "none";
        });
    }

    const cookieForm = document.getElementById("cookie-form");
     if(cookieForm) { 
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
            unlockMainContent(); 
            loadScriptsByConsent(preferences); 
        });
    }

}); 

