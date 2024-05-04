import { useConnect } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

// Components
import { Button } from '@/components'

const ButtonConnect = () => {
    const { openConnectModal } = useConnectModal()
    const { isPending } = useConnect()

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
                    {isPending && ' ...'}
                </Button>
            ) : null}
        </>
    )
}

export default ButtonConnect
