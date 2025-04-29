// COOKIES

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const settings = document.getElementById("cookie-settings");

    const savedPrefs = localStorage.getItem("cookie-preferences");
    if (savedPrefs) {
        banner.classList.add("hidden"); // Ukrywa banner, jeśli preferencje są zapisane
    } else {
        banner.classList.remove("hidden"); // Pokazuje banner, jeśli brak zapisanych preferencji
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
            functional: true, // Funkcjonalne zawsze włączone
            analytics: document.getElementById("analytics").checked,
            marketing: document.getElementById("marketing").checked
        };
        localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
        settings.classList.add("hidden");
        banner.classList.add("hidden");
    });
});