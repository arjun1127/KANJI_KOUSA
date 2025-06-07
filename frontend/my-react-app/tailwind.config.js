// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // adjust paths as needed
  ],
  theme: {
    extend: {
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px #22d3ee' },
          '50%': { boxShadow: '0 0 20px #22d3ee' },
        },
      },
    },
  },
  plugins: [],
};
