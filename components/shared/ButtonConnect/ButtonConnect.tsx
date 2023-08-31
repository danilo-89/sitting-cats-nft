import { useConnect } from 'wagmi'

// Components
import Button from '@/components/common/Button'

const ButtonConnect = () => {
    const { connect, connectors, isLoading, pendingConnector } = useConnect({
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    })

    const metamaskAvaiable = typeof window?.ethereum !== 'undefined'

    if (!metamaskAvaiable)
        return (
            <a
                className="ml-auto flex min-w-[11.5rem] items-center justify-center"
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button
                    type="button"
                    data-cy="btn-connect"
                >
                    Connect Wallet
                </Button>
            </a>
        )

    return (
        <>
            {connectors.map((connector) => (
                <Button
                    className="ml-auto flex min-w-[11.5rem] items-center justify-center"
                    type="button"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => {
                        connect({ connector })
                    }}
                    data-cy="btn-connect"
                >
                    Connect Wallet
                    {isLoading &&
                        pendingConnector?.id === connector.id &&
                        ' ...'}
                </Button>
            ))}
        </>
    )
}

export default ButtonConnect
