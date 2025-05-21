

window.addEventListener('scroll', function () {
	let header = document.querySelector('header') // let blurTarget = document.querySelector('.blur-target'); // Ta linia nie jest używana w obecnym kodzie // Jeśli przewinięto stronę więcej niż 0 pikseli (czyli w ogóle przewinięto z samej góry)
	if (window.scrollY > 0) {
		header.classList.add('scrolled')
	} else {
		// Jeśli strona jest na samej górze
		header.classList.remove('scrolled')
	}
})

// PIERWSZY BLOK - Płynne przewijanie dla wszystkich linków prowadzących do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (event) {
		const target = document.querySelector(this.getAttribute('href'))

		if (target) {
			event.preventDefault() // Zatrzymaj domyślne przewijanie

			window.scrollTo({
				top: target.offsetTop - 100,
				behavior: 'smooth',
			})
		}
	})
})

const hamburgerBtn = document.getElementById('hamburger-button')

// PIERWSZY BLOK - Listener hamburgera - obraca ikonę
hamburgerBtn.addEventListener('click', () => {
	hamburgerBtn.classList.toggle('rotated')
})

// DRUGI BLOK - Listener hamburgera - otwiera/zamyka menu
document.getElementById('hamburger-button').addEventListener('click', function () {
	// Dodajemy lub usuwamy klasę 'nav-open' z headera
	document.querySelector('header').classList.toggle('nav-open')
})

// BLOK - Listener dla linków W NAV - zamyka menu
// ZMODYFIKOWANY: Dodano reset rotacji przycisku hamburgera.
document.querySelectorAll('nav a').forEach(function (link) {
	link.addEventListener('click', function () {
		// Zamykamy menu
		document.querySelector('header').classList.remove('nav-open')
		// DODANE: Resetujemy animację obrotu przycisku hamburgera
		// Upewnij się, że zmienna `hamburgerBtn` jest dostępna w tym zasięgu (jest globalnie na górze)
		hamburgerBtn.classList.remove('rotated')
	})
})

// DRUGI BLOK - Płynne przewijanie dla wszystkich linków prowadzących do sekcji (DUPLIKAT)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (event) {
		event.preventDefault()

		const target = document.querySelector(this.getAttribute('href'))

		// Dodany check na istnienie targetu, brakowało go w Twoim drugim bloku
		if (target) {
			window.scrollTo({
				top: target.offsetTop - 100, // Dostosuj margines, by widoczna była sekcja
				behavior: 'smooth',
			})
		}
	})
})

// Funkcja do sprawdzenia, czy sekcja jest w obszarze widoczności (pozostawiona bez zmian)
function checkVisibility() {
	const sections = document.querySelectorAll('section') // Pobieramy wszystkie sekcje
	const windowHeight = window.innerHeight // Wysokość widocznej części ekranu

	sections.forEach(section => {
		const sectionTop = section.getBoundingClientRect().top // Odległość sekcji od góry ekranu // Jeśli sekcja znajduje się w widocznej części ekranu (plus offset, żeby dać efekt "wejścia")

		if (sectionTop < windowHeight - 100) {
			section.classList.add('visible') // Dodanie klasy .visible
		} else {
			// Usunięcie klasy .visible, jeśli nie jest widoczna i była wcześniej dodana
			if (section.classList.contains('visible')) {
				section.classList.remove('visible')
			}
		}
	})
}

// Nasłuchiwacz zdarzenia dla scrolla (pozostawiony bez zmian)
window.addEventListener('scroll', checkVisibility)

// Wywołanie funkcji po załadowaniu strony, żeby sprawdzić sekcje od razu (pozostawione bez zmian)
document.addEventListener('DOMContentLoaded', checkVisibility)
// Dodatkowe wywołanie checkVisibility na końcu, żeby sprawdzić widoczność od razu
checkVisibility()

/*
    Twój CSS dla rotacji (.hamburger.rotated) jest poprawny i powinien pozostać taki, jak podałeś:
    
    .hamburger {
        // ... inne style ...
        transition: all 0.3s ease; // Ważne dla płynności animacji obrotu
    }
    
    .hamburger.rotated {
        rotate: 90deg;
    }
    
    Pamiętaj też o stylach CSS kontrolujących samo wyświetlanie menu nawigacyjnego (np. elementu <nav>) w zależności od tego, czy element header ma klasę 'nav-open'.
    */
