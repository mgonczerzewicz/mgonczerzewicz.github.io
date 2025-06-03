

window.addEventListener('scroll', function () {
	let header = document.querySelector('header') 
	if (window.scrollY > 0) {
		header.classList.add('scrolled')
	} else {
		header.classList.remove('scrolled')
	}
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (event) {
		const target = document.querySelector(this.getAttribute('href'))

		if (target) {
			event.preventDefault(
			)
			window.scrollTo({
				top: target.offsetTop - 100,
				behavior: 'smooth',
			})
		}
	})
})

const hamburgerBtn = document.getElementById('hamburger-button')

hamburgerBtn.addEventListener('click', () => {
	hamburgerBtn.classList.toggle('rotated')
})

document.getElementById('hamburger-button').addEventListener('click', function () {
	document.querySelector('header').classList.toggle('nav-open')
})

document.querySelectorAll('nav a').forEach(function (link) {
	link.addEventListener('click', function () {
		document.querySelector('header').classList.remove('nav-open')
		hamburgerBtn.classList.remove('rotated')
	})
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (event) {
		event.preventDefault()

		const target = document.querySelector(this.getAttribute('href'))

		if (target) {
			window.scrollTo({
				top: target.offsetTop - 100,
				behavior: 'smooth',
			})
		}
	})
})

function checkVisibility() {
	const sections = document.querySelectorAll('section')
	const windowHeight = window.innerHeight 

	sections.forEach(section => {
		const sectionTop = section.getBoundingClientRect().top 
		if (sectionTop < windowHeight - 100) {
			section.classList.add('visible')
		} else {
			if (section.classList.contains('visible')) {
				section.classList.remove('visible')
			}
		}
	})
}

window.addEventListener('scroll', checkVisibility)

document.addEventListener('DOMContentLoaded', checkVisibility)
checkVisibility()