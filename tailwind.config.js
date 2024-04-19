const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        colors: {
            xantous: '#EFBF5B',
            moonstone: '#319CAB',
            seaSerpent: '#69C5D1',
            robinEggBlue: '#61C1CE',
            champagne: '#F1DCC1',
            wenge: '#534444',
            linen: '#FBF3E8',
            antiFlashWhite: '#EBEBEB',
            white: '#FFFFFF',
            silver: '#C5CBCB',
        },
        // #0a7c8c
        // #b7d9de
        // #e2e6e7
        extend: {
            screens: {
                xshort: { raw: '(max-height: 380px)' },
                short: { raw: '(max-height: 576px)' },
            },
            fontSize: {
                xsP: ['0.75rem', '1.15rem'],
                smP: ['0.875rem', 'normal'],
                baseP: ['1rem', 'normal'],
                lgP: ['1.125rem', 'normal'],
                xlP: ['1.25rem', 'normal'],
                '2xlP': ['1.5rem', 'normal'],
                '3xlP': ['1.875rem', 'normal'],
                '4xlP': ['2.25rem', 'normal'],
                '5xlP': ['3rem', 'normal'],
                '6xlP': ['3.75rem', 'normal'],
                '7xlP': ['4.5rem', 'normal'],
                '8xlP': ['6rem', 'normal'],
                '9xlP': ['8rem', 'normal'],
            },
            animation: {
                flip: 'flip-frames 0.7s ease-in forwards',
            },
            keyframes: {
                'flip-frames': {
                    '0%': { transform: 'rotateY(0turn)' },
                    '50%': { transform: 'rotateY(0.5turn)' },
                    '100%': { transform: 'rotateY(0turn)' },
                },
                'dot-1': {
                    '0%': { opacity: '0.1' },
                    '10%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
                'dot-2': {
                    '0%': { opacity: '0.05' },
                    '30%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
                'dot-3': {
                    '0%': { opacity: '0' },
                    '70%': { opacity: '0.1' },
                    '100%': { opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-placeholder':
                    'linear-gradient(90deg, rgba(235,235,235,1) 40%, transparent 100%)',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            dropShadow: {
                title: '0 0.055em 0 #534444',
            },
        },
    },
    variants: {},
    plugins: [],
}
