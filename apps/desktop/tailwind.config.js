/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		borderRadius: {
			none: '0',
			sm: 'var(--radius-sm, 0.125rem)',
			DEFAULT: 'var(--radius, 0.25rem)',
			md: 'var(--radius-md, 0.375rem)',
			lg: 'var(--radius-lg, 0.5rem)',
			xl: 'var(--radius-xl, 0.75rem)'
		},

		extend: {
			borderColor: {
				DEFAULT: 'var(--border-color)'
			},
			colors: {
				base: {
					50: 'var(--color-base-50)',
					100: 'var(--color-base-100)',
					200: 'var(--color-base-200)',
					300: 'var(--color-base-300)',
					400: 'var(--color-base-400)',
					500: 'var(--color-base-500)',
					600: 'var(--color-base-600)',
					700: 'var(--color-base-700)',
					800: 'var(--color-base-800)',
					900: 'var(--color-base-900)',
					950: 'var(--color-base-950)'
				},
				bg: {
					primary: 'var(--background-primary)',
					'primary-alt': 'var(--background-primary-alt)',
					secondary: 'var(--background-secondary)',
					'secondary-alt': 'var(--background-secondary-alt)'
				},
				text: {
					base: 'var(--text-base)',
					light: 'var(--text-light)',
					lighter: 'var(--text-lighter)'
				},
				border: {
					divider: 'var(--border-color)'
				},
				hover: {
					icon: 'var(--hover-icon-color)',
					DEFAULT: 'var(--hover-color)'
				}
			}
		}
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
