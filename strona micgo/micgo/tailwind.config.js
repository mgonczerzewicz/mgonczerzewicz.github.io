/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./.en/**/*.html', './js/**/*.js', './styles/**/*.css', './*.html'],
	theme: {
		extend: {
			keyframes: {
				blink: {
					'0%, 50%, 100%': { opacity: '1' },
					'25%, 75%': { opacity: '0' },
				},
				jump: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
			},
			animation: {
				blink: 'blink 1s step-start infinite',
				jump: 'jump 0.6s ease-in-out infinite',
			},
			colors: {
				'accent-blue': 'var(--color-accent-blue)',
				'accent-blue-hover': 'var(--color-accent-blue-hover)',
				background: 'var(--color-background)',
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-headings': 'var(--color-text-headings)',
				surface: 'var(--color-surface)',
			},
			fontFamily: {
				sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			maxWidth: {
				prose: '75ch',
			},
		},
	},
	plugins: [],
}
