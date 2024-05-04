import { useAccount, useConfig } from 'wagmi'

const useIsWrongNetwork = () => {
    const { chain, address } = useAccount()
    const { chains } = useConfig()

    const isWrongNetwork =
        address && chain?.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)

    return { isWrongNetwork, preferredNetwork: chains?.[0] }
}

export default useIsWrongNetwork
