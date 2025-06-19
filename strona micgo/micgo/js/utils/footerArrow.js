export function initializeFooterArrow() {
	document.addEventListener('DOMContentLoaded', () => {
		const backToTopButton = document.querySelector('.back-to-top')

		if (backToTopButton) {
			backToTopButton.addEventListener('click', e => {
				e.preventDefault() // Zapobiega domyślnej, skokowej nawigacji

				// Użyj smooth scroll
				window.scrollTo({
					top: 0, // Przewiń do góry strony
					behavior: 'smooth', // Płynne przewijanie
				})

				// Możesz również przewinąć do konkretnego elementu, np. nagłówka, jeśli ma id="top"
				// const targetElement = document.getElementById('top');
				// if (targetElement) {
				//     targetElement.scrollIntoView({
				//         behavior: 'smooth',
				//         block: 'start' // Przewiń tak, aby początek elementu był widoczny
				//     });
				// }
			})
		}
	})
}
