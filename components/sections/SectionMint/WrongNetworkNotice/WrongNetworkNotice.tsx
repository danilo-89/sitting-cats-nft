import Button from '@/components/common/Button'
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'
import { useSwitchNetwork } from 'wagmi'

const WrongNetworkNotice = () => {
    const { chains, error, isLoading, pendingChainId, switchNetwork } =
        useSwitchNetwork()
    const { preferredNetwork } = useIsWrongNetwork()

    return (
        <div className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5">
            <span className="mb-4 block">
                <span className="font-bold">Wrong network!</span>
                <br />
                Please swich it to {preferredNetwork?.name} to be able to claim
                NFTs.
            </span>
            <div className="text-center">
                <Button
                    type="button"
                    onClick={() =>
                        switchNetwork?.(
                            Number(process.env.NEXT_PUBLIC_CHAIN_ID)
                        )
                    }
                >
                    Switch Network
                </Button>
            </div>
        </div>
    )
}

export default WrongNetworkNotice
