'use client'
import { useAccount, useConnect, useNetwork } from 'wagmi'

import Button from '@/components/common/Button'
import { useEffect } from 'react'

const ButtonConnect = () => {
    const { connector: activeConnector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect({
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        })

    const { chain, chains } = useNetwork()

    console.log('CHAIN CONNECTED: ', chain)

    useEffect(() => {
        if (error) alert(error.message)
    }, [error])

    return (
        <>
            {isConnected && <div>Connected to {activeConnector?.name}</div>}

            {connectors.map((connector) => (
                <Button
                    className="ml-auto flex min-w-[11.5rem] items-center justify-center"
                    type="button"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => {
                        connect({ connector })
                    }}
                >
                    {connector.name}
                    {isLoading &&
                        pendingConnector?.id === connector.id &&
                        ' ...'}
                </Button>
            ))}
        </>
    )
}

export default ButtonConnect
