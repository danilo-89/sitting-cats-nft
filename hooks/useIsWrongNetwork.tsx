import { useAccount, useNetwork } from 'wagmi'

const useIsWrongNetwork = () => {
    const { address } = useAccount()
    const { chain, chains } = useNetwork()

    const isWrongNetwork =
        address && chain?.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)

    return { isWrongNetwork, preferredNetwork: chains?.[0] }
}

export default useIsWrongNetwork
