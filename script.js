/* --- LOGIKA PLIKU script.js --- */

document.addEventListener('DOMContentLoaded', () => {
	// 1. Definicja elementów
	const header = document.getElementById('mainHeader')
	const hamburger = document.getElementById('hamburgerButton')
	const menu = document.getElementById('fullscreenMenu')
	const SCROLL_THRESHOLD = 100 // Próg przewijania w pikselach

	// Elementy Formularza Kontaktowego
	const form = document.getElementById('contactForm')
	const submitButton = document.getElementById('submitButton')

	// Elementy Cookies
	const cookieBanner = document.getElementById('cookieBanner')
	const acceptButton = document.getElementById('acceptCookies')
	const settingsButton = document.getElementById('settingsCookies')

	// NOWE ELEMENTY PANELA COOKIES
	const mainContent = document.getElementById('mainCookieContent')
	const preferencesPanel = document.getElementById('preferencesPanel')
	const savePreferencesButton = document.getElementById('savePreferences')
	const backButton = document.getElementById('backToMain')

	// KLUCZE LOCALSTORAGE
	const COOKIE_CONSENT_KEY = 'agroExpert_cookies_accepted'
	const CONSENT_PREFERENCES_KEY = 'agroExpert_consent_prefs'
	const PRIVACY_POLICY_ID = 'privacy-policy'

	/* ===================================================
       1. LOGIKA SCROLL-TRIGGER (EFEKT LIQUID GLASS)
    =================================================== */

	function handleScroll() {
		if (window.scrollY > SCROLL_THRESHOLD) {
			header.classList.add('scrolled')
		} else {
			header.classList.remove('scrolled')
		}
	}

	if (header) {
		window.addEventListener('scroll', handleScroll)
		handleScroll()
	}

	/* ===================================================
       2. LOGIKA MENU HAMBURGERA (OTWIERANIE/ZAMYKANIE)
    =================================================== */

	function closeMenu() {
		if (hamburger) hamburger.classList.remove('is-active')
		if (menu) menu.classList.remove('is-open')
		document.body.style.overflow = ''
		if (header) header.classList.remove('menu-is-open')
	}

	function openMenu() {
		if (hamburger) hamburger.classList.add('is-active')
		if (menu) menu.classList.add('is-open')
		document.body.style.overflow = 'hidden' // Blokada scrolla
		if (header) header.classList.add('menu-is-open')
	}

	function toggleMenu() {
		if (menu && menu.classList.contains('is-open')) {
			closeMenu()
		} else {
			openMenu()
		}
	}

	// A. Nasłuchiwanie na kliknięcie w ikonę hamburgera
	if (hamburger) {
		hamburger.addEventListener('click', toggleMenu)
	}

	// B. Nasłuchiwanie na kliknięcie w linki w menu (aby zamknąć menu)
	const menuLinks = menu ? menu.querySelectorAll('a') : []
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			closeMenu()
		})
	})

	/* ===================================================
       3. LOGIKA FORMULARZA KONTAKTOWEGO (AJAX)
    =================================================== */

	if (form && submitButton) {
		form.addEventListener('submit', function (e) {
			e.preventDefault()

			const formData = new FormData(this)
			const originalButtonText = submitButton.textContent

			// Stan ładowania
			submitButton.classList.add('loading')
			submitButton.disabled = true
			submitButton.textContent = 'Wysyłanie...'

			fetch(this.action, {
				method: 'POST',
				body: formData,
			})
				.then(response => response.json())
				.then(data => {
					submitButton.classList.remove('loading')
					submitButton.disabled = false

					if (data.success) {
						// SUKCES
						submitButton.textContent = 'Wiadomość wysłana!'
						submitButton.classList.add('success')
						submitButton.disabled = true
						form.reset()
					} else {
						// BŁĄD
						submitButton.textContent = originalButtonText
						alert('Błąd wysyłki: ' + data.message)
					}
				})
				.catch(error => {
					// BŁĄD SIECI/SERWERA
					submitButton.classList.remove('loading')
					submitButton.disabled = false
					submitButton.textContent = originalButtonText
					alert('Wystąpił błąd sieci. Spróbuj ponownie później.')
				})
		})
	}

	/* ===================================================
       4. LOGIKA BANERU COOKIES I RODO (LocalStorage)
    =================================================== */

	if (cookieBanner) {
		/**
		 * Przełącza widok między głównym banerem a panelem ustawień.
		 */
		function togglePreferencesPanel() {
			if (mainContent && preferencesPanel) {
				// KLUCZOWA AKCJA: Dodaje 'hidden' do głównego kontentu (ukrywa go)
				mainContent.classList.toggle('hidden')
				// KLUCZOWA AKCJA: Usuwa 'hidden' z panelu preferencji (pokazuje go)
				preferencesPanel.classList.toggle('hidden')
			}
		}

		/**
		 * Pobiera stan checkboxów i zapisuje preferencje użytkownika.
		 */
		function savePreferences() {
			const analyticsChecked = document.getElementById('consent-analytics').checked

			const prefs = {
				required: true,
				analytics: analyticsChecked,
			}

			// Zapis stanu zgód
			localStorage.setItem(CONSENT_PREFERENCES_KEY, JSON.stringify(prefs))

			// Zapis głównej zgody (baner się nie pokaże przy kolejnej wizycie)
			localStorage.setItem(COOKIE_CONSENT_KEY, 'true')

			// Ukrycie baneru
			cookieBanner.classList.add('hidden')
			console.log('Preferencje zapisane:', prefs)

			// TUTAJ MOŻNA WARUNKOWO WŁĄCZYĆ SKRYPTY ŚLEDZĄCE
		}

		/**
		 * Akceptuje zgody (wszystkie domyślnie)
		 */
		function acceptConsent() {
			// Ustaw domyślnie wszystko na true przy akceptacji
			localStorage.setItem(CONSENT_PREFERENCES_KEY, JSON.stringify({ required: true, analytics: true }))
			localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
			cookieBanner.classList.add('hidden')
			console.log('Zgoda na cookies (wszystkie) akceptowana.')
		}

		/**
		 * Sprawdza stan zgody i wyświetla baner, jeśli jest potrzebny.
		 */
		function checkCookieConsent() {
			cookieBanner.classList.add('hidden')

			if (localStorage.getItem(COOKIE_CONSENT_KEY) !== 'true') {
				// Pokaż baner z opóźnieniem
				setTimeout(() => {
					cookieBanner.classList.remove('hidden')
				}, 1000)
			}
		}

		// A. PRZYPISANIE FUNKCJI PRZEŁĄCZAJĄCYCH
		if (settingsButton) {
			settingsButton.addEventListener('click', togglePreferencesPanel)
		}
		if (backButton) {
			backButton.addEventListener('click', togglePreferencesPanel) // Powrót na ekran główny
		}

		// B. PRZYPISANIE FUNKCJI ZAPISU I AKCEPTACJI
		if (savePreferencesButton) {
			savePreferencesButton.addEventListener('click', savePreferences)
		}
		if (acceptButton) {
			acceptButton.addEventListener('click', acceptConsent)
		}

		// Uruchomienie kontroli przy ładowaniu strony
		checkCookieConsent()
	}
})

/* --- LOGIKA SCROLL REVEAL (Intersection Observer) --- */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Sprawdza, czy element jest widoczny (przecina viewport)
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcjonalnie: Przestań obserwować, by animacja działała tylko raz
            observer.unobserve(entry.target); 
        }
        // Możesz dodać else if (!entry.isIntersecting) { ... } jeśli chcesz resetować animację po przewinięciu w górę
    });
}, {
    // Opcje obserwatora
    threshold: 0.1, // Element staje się aktywny, gdy 10% jest widoczne
    rootMargin: '0px 0px -50px 0px' // Zaczyna działać 50px przed końcem ekranu
});

// Zbieramy wszystkie elementy z klasą 'reveal'
const revealElements = document.querySelectorAll('.reveal');

// Przypisujemy obserwatora do każdego elementu
revealElements.forEach((element) => {
    observer.observe(element);
});