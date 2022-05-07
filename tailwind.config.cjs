module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'gray-light': '#EEEAE2',
				'light-blue': '#CFE4E7',
				'dk-slate': '#2F2E2E',
				'sky-blue': '#4c8bf5',
				'navy-blue': '#000080',
				'danger-red': '#ff3333'
			},
			boxShadow: {
				'3xl': '0 10px 10px 5px rgba(0, 0, 0, 0.3)'
			},
			fontFamily: {
				Poppins: ['Poppins', 'sans-serif'],
				Voltaire: ['Voltaire', 'sans-serif']
			}
		}
	},
	plugins: []
};
