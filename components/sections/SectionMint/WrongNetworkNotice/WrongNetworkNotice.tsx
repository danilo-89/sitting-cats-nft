import { useSwitchChain } from 'wagmi'

// Components
import { Button } from '@/components'

// Hooks
import { useIsWrongNetwork } from '@/hooks'

const WrongNetworkNotice = () => {
    const { switchChain } = useSwitchChain()
    const { preferredNetwork } = useIsWrongNetwork()

    return (
        <div
            className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5"
            data-cy="notice-not-wrong-network"
        >
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
                        switchChain?.({
                            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                        })
                    }
                >
                    Switch Network
                </Button>
            </div>
        </div>
    )
}

export default WrongNetworkNotice
