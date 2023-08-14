import { useContractRead } from 'wagmi'

// ABI
import { contractABI } from '@/contract/contractABI'

const useContractPhase = () => {
    const {
        data,
        isError,
        isLoading,
        isFetching,
        refetch,
        isFetchedAfterMount,
    } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT as '0x${string}',
        abi: contractABI,
        functionName: 'getActiveClaimConditionId',
    })

    return {
        data,
        isError,
        isLoading,
        isFetching,
        isFetchedAfterMount,
        refetch,
    }
}

export default useContractPhase
