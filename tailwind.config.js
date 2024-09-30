/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				secondary: {
					400: "#A9AFD9",
					500: "var(--secondary-ligth)",
					700: "var(--secondary)",
				},
				third: "var(--third)",
				text: "var(--text)",
			},
		},
	},
	plugins: [],
};
