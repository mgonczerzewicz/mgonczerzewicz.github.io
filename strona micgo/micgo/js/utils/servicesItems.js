export function initializeServicesItems() {
	document.querySelectorAll('.service-title').forEach(title => {
		title.addEventListener('click', () => {
			const item = title.closest('.service-item')
			item.classList.toggle('open')
		})
	})
}
