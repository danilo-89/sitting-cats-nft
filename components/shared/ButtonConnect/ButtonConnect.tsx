'use client'
import { useAccount, useConnect } from 'wagmi'

import Button from '@/components/common/Button'
import useIsMounted from '@/app/hooks/useIsMounted'
import { useEffect } from 'react'

const ButtonConnect = () => {
    const isMounted = useIsMounted()
    const { connector: activeConnector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()

    useEffect(() => {
        if (error) alert(error.message)
    }, [error])

    return (
        <>
            {isConnected && <div>Connected to {activeConnector?.id}</div>}

            {connectors.map((connector) => (
                <Button
                    className="ml-auto"
                    type="button"
                    disabled={isMounted ? !connector.ready : false}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {isMounted ? connector.name : '...'}
                    {isLoading &&
                        pendingConnector?.id === connector.id &&
                        ' (connecting)'}
                </Button>
            ))}
        </>
    )
}

export default ButtonConnect
