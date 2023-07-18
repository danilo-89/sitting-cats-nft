'use client'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// Components
import Nav from '@/components/Nav'
import SectionHero from '@/components/sections/SectionHero'
import SectionMint from '@/components/sections/SectionMint'
import SectionRoadmap from '@/components/sections/SectionRoadmap/SectionRoadmap'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [publicProvider()]
)

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
})

export default function Home() {
    return (
        <WagmiConfig config={config}>
            <main className="max-w-full overflow-x-hidden">
                <Nav />
                <SectionHero />
                <SectionMint />
                <SectionRoadmap />
            </main>
        </WagmiConfig>
    )
}
