'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { defineChain } from 'viem'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'

// Contexts
import { UserProvider, ContractProvider } from '@/context'

// Hooks
import { useIsMounted } from '@/hooks'

// Components
import {
    Nav,
    SectionHero,
    SectionMint,
    SectionRoadmap,
    Footer,
} from '@/components'

const RPC_PUBLIC = process.env.NEXT_PUBLIC_RPC_PUBLIC as string
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as string
const WALLET_CONNECT_PROJECT_ID = process.env
    .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY as string

const preferredChain = defineChain({
    id: Number(CHAIN_ID),
    name: 'Polygon Amoy',
    network: 'polygonamoy',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    rpcUrls: {
        alchemy: {
            http: ['https://polygon-amoy.g.alchemy.com/v2'],
            webSocket: ['wss://polygon-amoy.g.alchemy.com/v2'],
        },
        infura: {
            http: ['https://polygon-amoy.infura.io/v3'],
            webSocket: ['wss://polygon-amoy.infura.io/ws/v3'],
        },
        default: {
            http: [RPC_PUBLIC],
        },
        public: {
            http: [RPC_PUBLIC],
        },
    },
    blockExplorers: {
        etherscan: {
            name: 'PolygonScan',
            url: 'https://amoy.polygonscan.com',
        },
        default: {
            name: 'PolygonScan',
            url: 'https://amoy.polygonscan.com',
        },
    },
    testnet: true,
})

const config = getDefaultConfig({
    appName: 'SittingCatsNFT',
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: [preferredChain],
    transports: {
        [preferredChain.id]: http(
            `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_ID}`
        ),
    },
    wallets: [
        {
            groupName: 'Suggested',
            wallets: [injectedWallet, metaMaskWallet],
        },
    ],
    ssr: true,
})

const queryClient = new QueryClient()

export default function Home() {
    const isMounted = useIsMounted()

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact">
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
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
