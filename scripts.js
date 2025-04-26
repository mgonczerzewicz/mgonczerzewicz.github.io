// Kod JavaScript do obsługi logowania i menu mobilnego

// Używamy DOMContentLoaded, aby skrypty inicjalizujące uruchomiły się po załadowaniu struktury DOM
document.addEventListener('DOMContentLoaded', function() {
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.querySelector('#login-panel button'); // Zakładamy, że przycisk jest wewnątrz #login-panel

    // Funkcja do sprawdzania loginu i hasła
    function checkLoginCredentials() {
        const enteredLogin = loginInput.value;
        const enteredPassword = passwordInput.value;

        // *** TUTAJ ZDEFINIUJ POPRAWNY LOGIN I HASŁO ***
        // Pamiętaj, aby zmienić "TwójLogin" i "TwojeHaslo" na wartości, których chcesz użyć!
        const correctLogin = "admin"; // Poprawny login
        const correctPassword = "admin";
        // **********************************************

        const loginOverlay = document.getElementById('login-overlay');
        const pageContent = document.getElementById('page-content');
        const loginMessage = document.getElementById('login-message');

        // Sprawdzanie loginu ORAZ hasła
        if (enteredLogin === correctLogin && enteredPassword === correctPassword) {
            // Login i hasło są poprawne
            loginOverlay.style.display = 'none'; // Ukryj panel logowania

            // Pokaż treść strony, jeśli element page-content istnieje
            if (pageContent) {
                 pageContent.style.display = 'block';
            }


            // Opcjonalnie: usuń login overlay z DOM po udanym logowaniu
            // loginOverlay.remove();

            // Zainicjuj funkcje strony po udanym logowaniu (jeśli istnieją)
            // Sprawdzamy czy funkcje są zdefiniowane przed ich wywołaniem
            if (typeof initScrollHeader === 'function') {
                 initScrollHeader();
            }
            if (typeof initHamburgerMenu === 'function') {
                 initHamburgerMenu();
            }


        } else {
            // Login LUB hasło jest nieprawidłowe
            loginMessage.textContent = 'Nieprawidłowy login lub hasło. Dostęp zablokowany!'; // Zmieniony komunikat
            loginInput.value = '';    // Wyczyść pole loginu
            passwordInput.value = ''; // Wyczyść pole hasła

            // !!! BLOKUJEMY POLA PO PIERWSZEJ NIEUDANEJ PRÓBIE !!!
            loginInput.disabled = true;    // Zablokuj pole loginu
            passwordInput.disabled = true; // Zablokuj pole hasła
            if (loginButton) { // Sprawdź, czy przycisk został znaleziony
               loginButton.disabled = true; // Zablokuj przycisk
            }

            // Opcjonalnie: Możesz dodać tutaj timer, który po 5 minutach odblokuje pola
            // (ale pamiętaj, że to blokada tylko po stronie przeglądarki)
            // setTimeout(function() {
            //     loginInput.disabled = false;
            //     passwordInput.disabled = false;
            //     if (loginButton) {
            //         loginButton.disabled = false;
            //     }
            //     loginMessage.textContent = 'Możesz spróbować ponownie.';
            // }, 300000); // 300000 milisekund = 5 minut
        }
    }

    // Dodajemy listener do przycisku Wejdź
    if (loginButton) {
        loginButton.addEventListener('click', checkLoginCredentials);
    }

    // Pozwól na logowanie po naciśnięciu Enter w polu loginu
    if (loginInput) {
        loginInput.addEventListener('keypress', function(event) {
             // Sprawdź, czy naciśnięty klawisz to Enter
             if (event.key === 'Enter' || event.keyCode === 13) {
                 event.preventDefault(); // Zapobiega domyślnemu zachowaniu przeglądarki
                 checkLoginCredentials(); // Wywołaj funkcję sprawdzającą dane logowania
             }
        });
    }

    // Pozwól na logowanie po naciśnięciu Enter w polu hasła
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
             // Sprawdź, czy naciśnięty klawisz to Enter
             if (event.key === 'Enter' || event.keyCode === 13) {
                 event.preventDefault(); // Zapobiega domyślnemu zachowaniu przeglądarki
                 checkLoginCredentials(); // Wywołaj funkcję sprawdzającą dane logowania
             }
        });
    }

    // UWAGA: Funkcje initScrollHeader i initHamburgerMenu są teraz wywoływane TYLKO po udanym logowaniu
    // Usunąłem ich wywołania bezpośrednio w DOMContentLoaded.
});

// Usunięta stara funkcja checkPassword i zbędne bloki DOMContentLoaded
// Kod CSS i HTML pozostaje bez zmian w tym pliku.