'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {  WagmiProvider, http } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
import { defineChain } from 'viem'
import { polygonMumbai } from 'viem/chains'
// import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
    RainbowKitProvider,
    connectorsForWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit'

import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'
// Contexts
import { UserProvider } from '@/context/UserContext'
import { ContractProvider } from '@/context/ContractContext'

// Hooks
import useIsMounted from '@/hooks/useIsMounted'

// Components
import Nav from '@/components/common/Nav'
import SectionHero from '@/components/sections/SectionHero'
import SectionMint from '@/components/sections/SectionMint'
import SectionRoadmap from '@/components/sections/SectionRoadmap/SectionRoadmap'
import Footer from '@/components/common/Footer/Footer'

const RPC_PUBLIC = process.env.NEXT_PUBLIC_RPC_PUBLIC as string
const WALLET_CONNECT_PROJECT_ID = process.env
    .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string

console.log('Public RPC: ', RPC_PUBLIC)

const preferredChain = defineChain({
    ...polygonMumbai,
    rpcUrls: {
        ...polygonMumbai.rpcUrls,
        default: {
            http: [RPC_PUBLIC],
        },
        public: {
            http: [RPC_PUBLIC],
        },
    },
})

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//     [preferredChain],
//     [
//         publicProvider(),
//         alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY || '' }),
//     ]
// )

const config = getDefaultConfig({
    appName: 'SittingCatsNFT',
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: [preferredChain],
    transports: {
      [preferredChain.id]: http('https://polygon-mumbai.g.alchemy.com/v2/4wUHd-c4zm8RxA7P3KFxbnZDDyIRKA9T'),
    },
    // wallets: [{
    //     groupName: 'Recommended',
    //     wallets: [metaMaskWallet],
    //   }],
  })

// const connectors = connectorsForWallets([
//     {
//         groupName: 'Recommended',
//         wallets: [
//             metaMaskWallet({
//                 projectId: WALLET_CONNECT_PROJECT_ID,
//                 chains,
//             }),
//         ],
//     },
// ])

// const config = createConfig({
//     autoConnect: true,
//     publicClient,
//     webSocketPublicClient,
//     connectors,
// })

const queryClient = new QueryClient()

export default function Home() {
    const isMounted = useIsMounted()

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
                modalSize="compact"
                // chains={chains} 
                
                >
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
