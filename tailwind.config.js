/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            xantous: '#EFBF5B',
            robinEggBlue: '#61C1CE',
            champagne: '#F1DCC1',
            wenge: '#534444',
            linen: '#FBF3E8',
            antiFlashWhite: '#EBEBEB',
            white: '#FFFFFF',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            dropShadow: {
                title: '0 0.055em 0 #534444',
            },
            boxShadow: {
                buttonPrimary: '0.3rem 0.25rem rgba(83, 68, 68, 0.85)',
                buttonPrimaryActive: '-0.3rem -0.25rem rgba(83, 68, 68, 1)',
                buttonSecondary: '0.3rem 0.25rem rgba(220, 220, 220, 0.59)',
                buttonSecondaryActive:
                    '-0.3rem -0.25rem rgba(220, 220, 220, 0.59)',
            },
        },
    },
    plugins: [],
}
