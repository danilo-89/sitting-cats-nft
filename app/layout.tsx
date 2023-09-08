import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Yellowtail } from 'next/font/google'

declare global {
    interface Window {
        ethereum: any
    }
}

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

export const metadata: Metadata = {
    title: 'Sitting Cats NFT',
    description: 'Demonstrating NFT minting on the Polygon Mumbai test network',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link
                    rel="manifest"
                    href="/site.webmanifest"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                />
                <meta
                    name="msapplication-TileColor"
                    content="#da532c"
                />
                <meta
                    name="msapplication-config"
                    content="/browserconfig.xml"
                />
                <meta
                    name="theme-color"
                    content="#ffffff"
                />
            </head>
            <body
                className={`${poppins.variable} ${yellowtail.variable} bg-champagne text-wenge`}
            >
                {children}
            </body>
        </html>
    )
}
