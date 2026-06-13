/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#13131A',
        surface2: '#1A1A24',
        border: '#1E1E2E',
        accent: '#7C6EF5',
        'accent-hover': '#9B8FF7',
        'text-primary': '#E8E8F0',
        'text-secondary': '#666680',
        'text-muted': '#3D3D52',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        free: '#22C55E',
        paid: '#F59E0B',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '20px',
        icon: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(124,110,245,0.15)',
        glow: '0 0 20px rgba(124,110,245,0.2)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.05) translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
