// Kod JavaScript do obsługi logowania i menu mobilnego

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    // Pobierz również przycisk "Wejdź"
    const loginButton = document.querySelector('#login-panel button'); // Zakładamy, że przycisk jest wewnątrz #login-panel
    const password = passwordInput.value;
    const correctPassword = "123"; // <--- ZMIEŃ TO NA SWOJE HASŁO!
    const loginOverlay = document.getElementById('login-overlay');
    const pageContent = document.getElementById('page-content');
    const loginMessage = document.getElementById('login-message');

    // Sprawdzanie hasła
    if (password === correctPassword) {
        loginOverlay.style.display = 'none'; // Ukryj panel logowania
        pageContent.style.display = 'block'; // Pokaż treść strony
        // Opcjonalnie: usuń login overlay z DOM po udanym logowaniu
        // loginOverlay.remove();

        // Zainicjuj funkcje strony po udanym logowaniu
        initScrollHeader();
        initHamburgerMenu();


    } else {
        // Hasło jest nieprawidłowe
        loginMessage.textContent = 'Nieprawidłowe hasło. Dalsze próby zostały zablokowane.'; // Zmieniony komunikat
        passwordInput.value = ''; // Wyczyść pole hasła

        // !!! BLOKUJEMY POLA PO PIERWSZEJ NIEUDANEJ PRÓBIE !!!
        passwordInput.disabled = true; // Zablokuj pole hasła
        if (loginButton) { // Sprawdź, czy przycisk został znaleziony
           loginButton.disabled = true; // Zablokuj przycisk
        }

        // Opcjonalnie: Możesz dodać tutaj timer, który po 5 minutach odblokuje pola
        // (ale pamiętaj, że to blokada tylko po stronie przeglądarki)
        // setTimeout(function() {
        //     passwordInput.disabled = false;
        //     if (loginButton) {
        //         loginButton.disabled = false;
        //     }
        //     loginMessage.textContent = 'Możesz spróbować ponownie.';
        // }, 300000); // 300000 milisekund = 5 minut
    }
}

// Funkcja obsługująca zmianę wyglądu nagłówka podczas przewijania
function initScrollHeader() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Wywołaj raz przy ładowaniu
}

// Funkcja obsługująca menu hamburger
function initHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const header = document.querySelector('header'); // Element, do którego dodajemy klasę 'nav-open'

    if (hamburgerButton && header) {
        hamburgerButton.addEventListener('click', function() {
            // Przełącz klasę 'nav-open' na elemencie header
            header.classList.toggle('nav-open');

            // Opcjonalnie: Zamknij menu, gdy kliknięto poza nim
            // const nav = header.querySelector('nav');
            // if (header.classList.contains('nav-open')) {
            //     document.addEventListener('click', closeMenuOutside);
            // } else {
            //     document.removeEventListener('click', closeMenuOutside);
            // }
        });
    }
}

// Opcjonalna funkcja do zamykania menu po kliknięciu poza nim
// function closeMenuOutside(event) {
//     const header = document.querySelector('header');
//     const nav = header.querySelector('nav');
//     const hamburgerButton = document.getElementById('hamburger-button');
//     // Sprawdź, czy kliknięcie nastąpiło poza menu nawigacji i poza przyciskiem hamburgera
//     if (!nav.contains(event.target) && !hamburgerButton.contains(event.target) && header.classList.contains('nav-open')) {
//         header.classList.remove('nav-open');
//         document.removeEventListener('click', closeMenuOutside);
//     }
// }


// Pozwól na logowanie po naciśnięciu Enter w polu hasła
// Używamy DOMContentLoaded, aby skrypty inicjalizujące uruchomiły się po załadowaniu struktury DOM
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
             if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();
                checkPassword();
            }
        });
    }

    // Wywołaj funkcje inicjalizujące TUTAJ,
    // aby działały od razu po załadowaniu strony, niezależnie od logowania.
    initScrollHeader();
    initHamburgerMenu();
});

// Funkcja obsługująca kliknięcie przycisku "Wejdź"
// Dodajemy listener do przycisku Wejdź, aby wywoływać checkPassword()
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('#login-panel button');
    if (loginButton) {
        loginButton.addEventListener('click', checkPassword);
    }
});