import { BaseError } from 'viem'

// Components
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'

interface IProps {
    isUserPhaseNftBalanceFetching: boolean
    isPrepareFetching: boolean
    prepareError: Error | null
    isWriteLoading: boolean
    isReceiptLoading: boolean
    isClaimedMetadataFetching: boolean
    transactionError: Error | null
    claimedMetadataError: unknown
    mintableQuantity: number | undefined
    mintedMetadata: boolean
    mintedQuantity: number
}

const InfoMessage = ({
    isUserPhaseNftBalanceFetching,
    isPrepareFetching,
    prepareError,
    isWriteLoading,
    isReceiptLoading,
    isClaimedMetadataFetching,
    transactionError,
    claimedMetadataError,
    mintableQuantity,
    mintedMetadata,
    mintedQuantity,
}: IProps) => {
    const { shortMessage: shortPrepareErrorMessage } =
        (prepareError as BaseError) || {}
    const { shortMessage: shortTransactionErrorMessage } =
        (transactionError as BaseError) || {}

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

    if (isPrepareFetching)
        return (
            <>
                Please wait. Executing your transaction
                <LoaderDots />
            </>
        )

    if (prepareError) {
        return <>Error: {shortPrepareErrorMessage}. Try again?</>
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

    if (
        transactionError &&
        shortTransactionErrorMessage === 'User rejected the request.'
    ) {
        return <>You&apos;ve canceled the transaction. Try again?</>
    }

    if (transactionError) {
        return <>Error: {shortTransactionErrorMessage}. Try again?</>
    }

    if (isWriteLoading)
        return (
            <>
                <span className="mr-1 font-bold">Action nedded:</span> Confirm
                transaction in your wallet to continue.
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
                NFT{mintedQuantity > 1 ? "'s" : ''} successfully claimed.{' '}
                {continueMintingMessage}
            </>
        )

    if (mintableQuantity === 0)
        return <>You&apos;ve reached your limit for minting NFTs.</>

    return <>Ready for minting</>
}

export default InfoMessage
