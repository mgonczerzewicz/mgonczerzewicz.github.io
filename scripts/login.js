const loginInput = document.getElementById('login-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const loginOverlay = document.getElementById('login-overlay');
const pageContent = document.getElementById('page-content');
const loginMessage = document.getElementById('login-message');

// Wartości logowania
const correctLogin = "admin";
const correctPassword = "Legenda997";

let isLoggedIn = false;

// Funkcja logowania
function handleLogin() {
    const enteredLogin = loginInput.value;
    const enteredPassword = passwordInput.value;

    // Sprawdzanie poprawności loginu i hasła
    if (enteredLogin === correctLogin && enteredPassword === correctPassword) {
        console.log("Login successful.");
        isLoggedIn = true;

        // --- Post-Login Actions ---
        // 1. Ukrycie panelu logowania
        if (loginOverlay) loginOverlay.style.display = 'none';

        // 2. Pokazanie głównej zawartości strony
        if (pageContent) {
            pageContent.style.display = 'block';
            console.log("Page content shown.");
        }

        // 3. Dodanie klasy CSS do body
        document.body.classList.add('game-active');
        console.log("Added 'game-active' class to body.");

        // 4. Inicjalizacja gry, jeśli Google Maps API jest już załadowane
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.StreetViewService !== 'undefined') {
            console.log("Google Maps API already loaded. Initializing game from login success.");
            onGoogleMapsReady(); // Uruchomienie gry
        } else {
            console.log("Google Maps API not yet loaded. Game will initialize when API loads.");
        }

    } else {
        console.log("Login failed.");
        // Wyświetlanie wiadomości o błędzie
        if (loginMessage) loginMessage.textContent = 'Nieprawidłowy login lub hasło. Dostęp zablokowany!';

        // Wyczyść pola logowania
        if (loginInput) loginInput.value = '';
        if (passwordInput) passwordInput.value = '';

        // Zablokowanie pól i przycisku logowania
        if (loginInput) loginInput.disabled = true;
        if (passwordInput) passwordInput.disabled = true;
        if (loginButton) loginButton.disabled = true;

        // Opcjonalnie: Odblokowanie po pewnym czasie (np. 5 minut)
        setTimeout(function() {
            if (loginInput) loginInput.disabled = false;
            if (passwordInput) passwordInput.disabled = false;
            if (loginButton) loginButton.disabled = false;
            if (loginMessage) loginMessage.textContent = 'Możesz spróbować ponownie.';
        }, 300000); // 5 minut w milisekundach (300000 ms)
    }
}

// Dodanie event listenera do przycisku logowania
if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
}