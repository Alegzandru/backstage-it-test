/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      md: '640px',
      mdFilters: '800px',
      lg: '1248px',
    },
    maxWidth: {
      '1200px': '1200px',
      '800px': '800px',
      '600px': '600px',
    },
    maxHeight: {
      filters: 'calc(100vh - 144px)',
    },
    extend: {
      spacing: {
        'image-ratio': '100%',
        'spacing-lg': 'calc((100% - 1200px) / 2)',
      },
      colors: {
        beige: '#F8F5EE',
        uigreen: '#22c55e',
        uiwhite: '#ffffff',
        uibrown: '#a16207',
        uiorange: '#f97316',
        uiblack: '#000000',
        uinatural: '#fed7aa',
        uiyellow: '#facc15',
        uiblue: '#3b82f6',
        uired: '#ef4444',
        uipurple: '#a855f7',
        uigold: '#fde047',
        uisilver: '#e4e4e7',
        uigrey: '#9ca3af',
        uipink: '#ec4899',
      },
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg)-ui(green|white|brown|orange|black|natural|yellow|blue|red|purple|gold|silver|grey|pink)/,
  }],
}

