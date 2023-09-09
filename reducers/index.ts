import { TransactionReceipt } from 'viem'

interface IReducer {
    isLoading: boolean
    isError: boolean
    customError: string | null
    isPrepareLoading: boolean
    isPrepareSuccess: boolean
    prepareError: string | null
    isWriteLoading: boolean
    isWriteSuccess: boolean
    writeError: string | null
    isReceiptLoading: boolean
    isReceiptSuccess: boolean
    receiptError: string | null
    receiptData: TransactionReceipt | null
}

export const useMintReducer = (
    state: IReducer,
    action: Partial<IReducer> | undefined
) => {
    if (action === undefined) {
        return {
            isLoading: false,
            isError: false,
            customError: null,
            isPrepareLoading: false,
            isPrepareSuccess: false,
            prepareError: null,
            isWriteLoading: false,
            isWriteSuccess: false,
            writeError: null,
            isReceiptLoading: false,
            isReceiptSuccess: false,
            receiptError: null,
            receiptData: null,
        }
    } else {
        const newState = { ...state, ...action }
        return {
            ...newState,
            isLoading:
                newState.isPrepareLoading ||
                newState.isWriteLoading ||
                newState.isReceiptLoading,
            isError:
                newState.customError ||
                newState.prepareError ||
                newState.writeError ||
                newState.receiptError
                    ? true
                    : false,
        }
    }
}
