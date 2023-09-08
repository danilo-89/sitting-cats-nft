'use client'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai } from 'viem/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'

// Components
import Nav from '@/components/common/Nav'
import SectionHero from '@/components/sections/SectionHero'
import SectionMint from '@/components/sections/SectionMint'
import SectionRoadmap from '@/components/sections/SectionRoadmap/SectionRoadmap'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from '@/context/UserContext'
import { ContractProvider } from '@/context/ContractContext'
import Footer from '@/components/common/Footer/Footer'
import useIsMounted from '@/hooks/useIsMounted'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [
        publicProvider(),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY || '' }),
    ]
)

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
        new InjectedConnector({
            chains,
        }),
    ],
})

const queryClient = new QueryClient()

export default function Home() {
    const isMounted = useIsMounted()

    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <ContractProvider>
                    <UserProvider>
                        <main className="max-w-full overflow-x-hidden">
                            <Nav />
                            <SectionHero />
                            {isMounted ? <SectionMint /> : null}
                            <SectionRoadmap />
                        </main>
                        <Footer />
                    </UserProvider>
                </ContractProvider>
            </QueryClientProvider>
        </WagmiConfig>
    )
}
