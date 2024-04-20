import { createContext, ReactNode, useContext } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance, useReadContract } from 'wagmi'

// Contexts
import { useContractContext } from './ContractContext'

// Contract
import { contractConfig } from '@/contract/config'

interface IProps {
    userTotalNftBalance: undefined | number
    isUserTotalNftBalanceFetching: boolean
    refetchUserTotalNftBalance: () => void
    userPhaseNftBalance: undefined | number
    isUserPhaseNftBalanceFetching: boolean
    refetchUserPhaseNftBalance: () => void
    userBalance:
        | undefined
        | {
              decimals: number
              formatted: string
              symbol: string
              value: bigint
          }
    isUserBalanceFetching: boolean
    refetchUserBalance: () => void
}

const UserContext = createContext<IProps>({
    userTotalNftBalance: undefined,
    isUserTotalNftBalanceFetching: true,
    refetchUserTotalNftBalance: () => null,
    userPhaseNftBalance: undefined,
    isUserPhaseNftBalanceFetching: true,
    refetchUserPhaseNftBalance: () => null,
    userBalance: undefined,
    isUserBalanceFetching: true,
    refetchUserBalance: () => null,
})

export function UserProvider({ children }: { children: ReactNode }) {
    const { address } = useAccount()
    const { activePhaseId } = useContractContext()

    const {
        data: userTotalNftBalanceBigInt,
        isFetching: isUserTotalNftBalanceFetching,
        refetch: refetchUserTotalNftBalance,
        isFetchedAfterMount: isUserTotalNftBalanceChecked,
    } = useReadContract({
        ...contractConfig,
        query: {
            enabled: !!address,
        },
        functionName: 'balanceOf',
        args: [address!],
    })

    const {
        data: userPhaseNftBalanceBigInt,
        isFetching: isUserPhaseNftBalanceFetching,
        refetch: refetchUserPhaseNftBalance,
        isFetchedAfterMount: isUserPhaseNftBalanceChecked,
    } = useReadContract({
        ...contractConfig,
        query: {
            enabled: !!address && activePhaseId !== undefined,
        },
        functionName: 'getSupplyClaimedByWallet',
        args: [
            //@ts-ignore
            activePhaseId !== undefined ? BigInt(activePhaseId) : undefined,
            address!,
        ],
    })

    const {
        data: userBalance,
        refetch: refetchUserBalance,
        isError,
        isLoading,
        isFetching: isUserBalanceFetching,
        isFetchedAfterMount: isUserBalanceChecked,
    } = useBalance({
        address,
    })

    const userTotalNftBalance =
        typeof userTotalNftBalanceBigInt === 'bigint'
            ? +formatUnits(userTotalNftBalanceBigInt, 0)
            : undefined

    const userPhaseNftBalance =
        typeof userPhaseNftBalanceBigInt === 'bigint'
            ? +formatUnits(userPhaseNftBalanceBigInt, 0)
            : undefined

    return (
        <UserContext.Provider
            value={{
                userTotalNftBalance: isUserTotalNftBalanceChecked
                    ? userTotalNftBalance
                    : undefined,
                isUserTotalNftBalanceFetching,
                refetchUserTotalNftBalance,
                userPhaseNftBalance: isUserPhaseNftBalanceChecked
                    ? userPhaseNftBalance
                    : undefined,
                isUserPhaseNftBalanceFetching,
                refetchUserPhaseNftBalance,
                userBalance: isUserBalanceChecked ? userBalance : undefined,
                isUserBalanceFetching,
                refetchUserBalance,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)

    // error handling (if component is not inside context provider)
    if (context === undefined) {
        throw new Error('useUserContext must be used inside a UserProvider')
    }

    return context
}
