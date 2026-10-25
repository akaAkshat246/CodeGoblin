/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        goblin: {
          bg: '#09090F',
          secondary: '#11111B',
          card: '#171725',
          cardHover: '#1E1E32',
          border: 'rgba(139, 92, 246, 0.18)',
          borderHover: 'rgba(163, 230, 53, 0.4)',
          purple: '#8B5CF6',
          violet: '#A855F7',
          green: '#A3E635',
          greenDark: '#84cc16',
          textMuted: '#A1A1B5',
          textBright: '#F5F3FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-green': '0 0 25px -5px rgba(163, 230, 53, 0.35)',
        'glow-combined': '0 0 30px -5px rgba(139, 92, 246, 0.25), 0 0 20px -5px rgba(163, 230, 53, 0.2)',
      },
      backgroundImage: {
        'goblin-radial': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(9, 9, 15, 0) 70%)',
        'goblin-hero': 'radial-gradient(ellipse at top, rgba(168, 85, 247, 0.15) 0%, rgba(163, 230, 53, 0.05) 40%, rgba(9, 9, 15, 1) 90%)',
      }
    },
  },
  plugins: [],
}
