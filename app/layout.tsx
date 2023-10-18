import './globals.css'
import type { Metadata } from 'next'
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
                {/* <!-- HTML Meta Tags --> */}
                <title>Sitting Cats NFT</title>
                <meta
                    name="description"
                    content="Demonstrating NFT minting on the Polygon Mumbai test network"
                />

                {/* <!-- Facebook Meta Tags --> */}
                <meta
                    property="og:url"
                    content="https://sitting-cats-nft.vercel.app/"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="Sitting Cats NFT"
                />
                <meta
                    property="og:description"
                    content="Demonstrating NFT minting on the Polygon Mumbai test network"
                />
                <meta
                    property="og:image"
                    content="https://sitting-cats-nft.vercel.app/og-cover.jpg"
                />

                {/* <!-- Twitter Meta Tags --> */}
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    property="twitter:domain"
                    content="sitting-cats-nft.vercel.app"
                />
                <meta
                    property="twitter:url"
                    content="https://sitting-cats-nft.vercel.app/"
                />
                <meta
                    name="twitter:title"
                    content="Sitting Cats NFT"
                />
                <meta
                    name="twitter:description"
                    content="Demonstrating NFT minting on the Polygon Mumbai test network"
                />
                <meta
                    name="twitter:image"
                    content="https://sitting-cats-nft.vercel.app/og-cover.jpg"
                />
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
