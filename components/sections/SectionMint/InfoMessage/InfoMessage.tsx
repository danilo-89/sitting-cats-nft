import { BaseError } from 'viem'

// Components
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'

// Types
import { IMintedMetadata, INFTDataWithId } from '@/types/getNftsAPI'

interface IProps {
    isUserPhaseNftBalanceFetching: boolean
    isWriteLoading: boolean
    isReceiptLoading: boolean
    isClaimedMetadataFetching: boolean
    transactionError: Error | null
    claimedMetadataError: unknown
    mintableQuantity: number | undefined
    mintedMetadata: IMintedMetadata | null | undefined
    mintedQuantity: string | undefined
    isEnoughBalanceToMint: boolean
}

const InfoMessage = ({
    isUserPhaseNftBalanceFetching,
    // isPrepareFetching,
    // prepareError,
    isWriteLoading,
    isReceiptLoading,
    isClaimedMetadataFetching,
    transactionError,
    claimedMetadataError,
    mintableQuantity,
    mintedMetadata,
    mintedQuantity,
    isEnoughBalanceToMint,
}: IProps) => {
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
                <span>
                    Executing your transaction.
                    <br />
                    <span className="font-bold">
                        Once ready, confirm it in your wallet to continue.
                    </span>
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
