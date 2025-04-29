document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");
    const body = document.body;
    const allElements = document.querySelectorAll("a, input, select, textarea, nav, .navbar a"); // Tylko nawigacja, bez przycisków cookies

    const savedPrefs = localStorage.getItem("cookie-preferences");
    if (savedPrefs) {
        banner.classList.add("hidden");
    } else {
        banner.classList.remove("hidden");
        body.style.overflow = "hidden"; // Blokuje przewijanie
        allElements.forEach(el => el.style.pointerEvents = "none"); // Zablokowanie interakcji
        document.querySelectorAll("nav, .navbar").forEach(nav => nav.style.pointerEvents = "none"); // Zablokuj nawigację
    }

    // Akceptacja wszystkich cookies
    document.getElementById("accept-all").addEventListener("click", () => {
        const preferences = {
            functional: true,
            analytics: true,
            marketing: true
        };
        localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
        banner.classList.add("hidden");
        body.style.overflow = ""; // Odblokowuje przewijanie
        allElements.forEach(el => el.style.pointerEvents = "auto"); // Odblokowuje interakcję
        document.querySelectorAll("nav, .navbar").forEach(nav => nav.style.pointerEvents = "auto"); // Odblokowuje nawigację
    });

    // Akceptacja tylko niezbędnych cookies
    document.getElementById("accept-essential").addEventListener("click", () => {
        const preferences = {
            functional: true,
            analytics: false,
            marketing: false
        };
        localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
        banner.classList.add("hidden");
        body.style.overflow = ""; // Odblokowuje przewijanie
        allElements.forEach(el => el.style.pointerEvents = "auto"); // Odblokowuje interakcję
        document.querySelectorAll("nav, .navbar").forEach(nav => nav.style.pointerEvents = "auto"); // Odblokowuje nawigację
    });

    // Kliknięcie w "Personalizuj"
    document.getElementById("customize").addEventListener("click", () => {
        banner.classList.add("hidden");
        settings.classList.remove("hidden");
    });

    // Zapis ustawień cookies
    document.getElementById("cookie-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const preferences = {
            functional: true,
            analytics: document.getElementById("analytics").checked,
            marketing: document.getElementById("marketing").checked
        };
        localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
        settings.classList.add("hidden");
        banner.classList.add("hidden");
        body.style.overflow = ""; // Odblokowuje przewijanie
        allElements.forEach(el => el.style.pointerEvents = "auto"); // Odblokowuje interakcję
        document.querySelectorAll("nav, .navbar").forEach(nav => nav.style.pointerEvents = "auto"); // Odblokowuje nawigację
    });
});
