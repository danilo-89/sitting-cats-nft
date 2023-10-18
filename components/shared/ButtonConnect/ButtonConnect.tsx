import { useConnect } from 'wagmi'

// Components
import Button from '@/components/common/Button'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const ButtonConnect = () => {
    const { openConnectModal } = useConnectModal()
    const { isLoading } = useConnect({
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    })

    return (
        <>
            {openConnectModal ? (
                <Button
                    className="ml-auto flex min-w-[11.5rem] items-center justify-center"
                    type="button"
                    // disabled={!connector.ready}
                    // key={connector.id}
                    onClick={() => {
                        openConnectModal()
                        // connect({ connector })
                    }}
                    data-cy="btn-connect"
                >
                    Connect Wallet
                    {isLoading && ' ...'}
                </Button>
            ) : null}
        </>
    )
}

export default ButtonConnect
