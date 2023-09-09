import { useReducer } from 'react'
import { BaseError, TransactionReceipt, parseEther, parseUnits } from 'viem'
import {
    prepareWriteContract,
    writeContract,
    waitForTransaction,
} from '@wagmi/core'

// Contract
import { contractConfig } from '@/contract/config'

// Reducers
import { useMintReducer } from '@/reducers'

// Utilities
import { toErrorWithMessage } from '@/utils'

const pricePerNFT = +process.env.NEXT_PUBLIC_NFT_PRICE! as unknown as number

const useMint = () => {
    const [state, dispatch] = useReducer(useMintReducer, {
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
    })

    const mintNFT = async (
        quantity: string,
        address: `0x${string}` | undefined
    ) => {
        dispatch(undefined)

        let prepareLoading = false
        let writeLoading = false
        let receiptLoading = false

        try {
            prepareLoading = true
            dispatch({ isPrepareLoading: true })

            const config = await prepareWriteContract({
                ...contractConfig,
                functionName: 'claim',
                args: [
                    address!,
                    parseUnits(quantity, 0),
                    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                    parseEther(pricePerNFT.toString()),
                    {
                        proof: [],
                        quantityLimitPerWallet: parseUnits(
                            process.env.NEXT_PUBLIC_LIMIT_PER_WALLET!,
                            0
                        ),
                        pricePerToken: parseEther(pricePerNFT.toString()),
                        currency: '0x0000000000000000000000000000000000000000',
                    },
                    '0x',
                ],
                value: parseEther((pricePerNFT * +quantity).toString()),
            })

            prepareLoading = false
            writeLoading = true
            dispatch({
                isPrepareLoading: false,
                isPrepareSuccess: true,
                isWriteLoading: true,
            })

            const { hash } = await writeContract(config)

            writeLoading = false
            receiptLoading = true
            dispatch({
                isWriteLoading: false,
                isWriteSuccess: true,
                isReceiptLoading: true,
            })

            const data = await waitForTransaction({
                hash,
            })

            receiptLoading = false

            dispatch({
                isReceiptLoading: false,
                isReceiptSuccess: data?.status === 'success',
                receiptData: data,
            })
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                if (prepareLoading) {
                    dispatch({
                        prepareError: error?.shortMessage || error?.message,
                    })
                } else if (writeLoading) {
                    dispatch({
                        writeError: error?.shortMessage || error?.message,
                    })
                } else if (receiptLoading) {
                    dispatch({
                        receiptError: error?.shortMessage || error?.message,
                    })
                }
            } else {
                dispatch({
                    customError: toErrorWithMessage(error).message,
                })
            }
        } finally {
            dispatch({
                isPrepareLoading: false,
                isWriteLoading: false,
                isReceiptLoading: false,
            })
        }
    }

    return { state, dispatch, mintNFT }
}

export default useMint
