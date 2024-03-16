import React from 'react'
import type { Preview } from '@storybook/react'
import { Poppins, Yellowtail } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-poppins',
})
const yellowtail = Yellowtail({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-yellowtail',
})

import '../app/globals.css'

const preview: Preview = {
    decorators: [
        (Story) => (
            <main
                className={`${poppins.variable} ${yellowtail.variable} bg-champagne text-wenge`}
            >
                <Story />
            </main>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
