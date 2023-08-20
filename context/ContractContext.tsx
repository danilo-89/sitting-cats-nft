'use client'
import { createContext, ReactNode, useContext } from 'react'
import { formatUnits } from 'viem'
import { useContractRead } from 'wagmi'

// Contract
import { contractConfig } from '@/contract/config'

interface IProps {
    totalMinted: number | undefined
    isTotalMintedFetching: boolean
    refetchTotalMinted: () => void
    activePhaseId: number | undefined
    isActivePhaseIdFetching: boolean
    refetchActivePhaseId: () => void
    limitPerWallet: number | undefined
}

const ContractContext = createContext<IProps>({
    totalMinted: undefined,
    isTotalMintedFetching: true,
    refetchTotalMinted: () => null,
    activePhaseId: undefined,
    isActivePhaseIdFetching: true,
    refetchActivePhaseId: () => null,
    limitPerWallet: undefined,
})

export function ContractProvider({ children }: { children: ReactNode }) {
    const {
        data: totalMintedBigInt,
        isFetching: isTotalMintedFetching,
        refetch: refetchTotalMinted,
        isFetchedAfterMount: isTotalMintedChecked,
    } = useContractRead({
        ...contractConfig,
        enabled: true,
        functionName: 'totalMinted',
    })

    const {
        data: activePhaseIdBigInt,
        isFetching: isActivePhaseIdFetching,
        refetch: refetchActivePhaseId,
        isFetchedAfterMount: isActivePhaseIdChecked,
    } = useContractRead({
        ...contractConfig,
        enabled: true,
        functionName: 'getActiveClaimConditionId',
    })

    const totalMinted =
        typeof totalMintedBigInt === 'bigint'
            ? +formatUnits(totalMintedBigInt, 0)
            : undefined

    const activePhaseId =
        typeof activePhaseIdBigInt === 'bigint'
            ? +formatUnits(activePhaseIdBigInt, 0)
            : undefined

    return (
        <ContractContext.Provider
            value={{
                totalMinted: isTotalMintedChecked ? totalMinted : undefined,
                isTotalMintedFetching,
                refetchTotalMinted,
                activePhaseId: isActivePhaseIdChecked
                    ? activePhaseId
                    : undefined,
                isActivePhaseIdFetching,
                refetchActivePhaseId,
                limitPerWallet: Number(
                    process.env.NEXT_PUBLIC_LIMIT_PER_WALLET
                ),
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}

export const useContractContext = () => {
    const context = useContext(ContractContext)

    // error handling (if component is not inside context provider)
    if (context === undefined) {
        throw new Error(
            'useContractContext must be used inside a ContractProvider'
        )
    }

    return context
}
