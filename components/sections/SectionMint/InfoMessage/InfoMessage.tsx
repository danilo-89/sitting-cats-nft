// Components
import { LoaderDots } from '@/components'

// Types
import { IMintedMetadata } from '@/types'

interface IProps {
    isUserPhaseNftBalanceFetching: boolean
    isPrepareLoading: boolean
    prepareError: string | null
    isWriteLoading: boolean
    isReceiptLoading: boolean
    receiptError: string | null
    isClaimedMetadataFetching: boolean
    transactionError: string | null
    claimedMetadataError: unknown
    mintableQuantity: number | undefined
    mintedMetadata: IMintedMetadata | null | undefined
    mintedQuantity: string | undefined
    isEnoughBalanceToMint: boolean
}

const InfoMessage = ({
    isUserPhaseNftBalanceFetching,
    isPrepareLoading,
    prepareError,
    isWriteLoading,
    isReceiptLoading,
    receiptError,
    isClaimedMetadataFetching,
    transactionError,
    claimedMetadataError,
    mintableQuantity,
    mintedMetadata,
    mintedQuantity,
    isEnoughBalanceToMint,
}: IProps) => {
    const continueMintingMessage =
        mintableQuantity === 0
            ? 'Maximum NFTs per wallet minted.'
            : 'You can continue minting.'

    if (isUserPhaseNftBalanceFetching)
        return (
            <>
                {mintedMetadata ? 'Succesfully claimed. ' : ''}Preparing, please
                wait <LoaderDots />
            </>
        )

    if (!isEnoughBalanceToMint) {
        return <>Error: Not enough balance.</>
    }

    if (claimedMetadataError) {
        return (
            <>
                No need to worry. While you&apos;ve successfully claimed the
                NFT, there seems to be an error in fetching the metadata.{' '}
                {continueMintingMessage}
            </>
        )
    }

    if (prepareError) {
        return <>Error: {prepareError}. Try again?</>
    }

    if (transactionError === 'User rejected the request.') {
        return <>You&apos;ve canceled the transaction. Try again?</>
    }

    if (transactionError) {
        return <>Error: {transactionError}. Try again?</>
    }

    if (receiptError) {
        return <>Error: {receiptError}. Try again?</>
    }

    if (isPrepareLoading) {
        return (
            <>
                <span>
                    Executing your transaction. Please wait
                    <LoaderDots />
                </span>
            </>
        )
    }

    if (isWriteLoading)
        return (
            <>
                <span>
                    <span className="font-bold">Action required: </span>
                    Please confirm transaction in your wallet to continue.
                </span>
            </>
        )

    if (isReceiptLoading)
        return (
            <>
                Waiting for the receipt
                <LoaderDots />
            </>
        )

    if (isClaimedMetadataFetching)
        return (
            <>
                Transaction sucessfull, getting claimed NFT info
                <LoaderDots />
            </>
        )

    if (mintedMetadata)
        return (
            <>
                NFT{mintedQuantity && +mintedQuantity > 1 ? 's' : ''}{' '}
                successfully claimed. {continueMintingMessage}
            </>
        )

    if (mintableQuantity === 0)
        return <>You&apos;ve reached your limit for minting NFTs.</>

    return <>Ready for minting</>
}

export default InfoMessage
