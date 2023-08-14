import LoaderDots from '@/components/common/LoaderDots/LoaderDots'

const InfoMessage = ({
    isPrepareFetching,
    prepareError,
    isWriteLoading,
    isReceiptLoading,
    isClaimedMetadataFetching,
    transactionError,
    userPhaseNftBalance,
    limitPerWallet,
    mintableQuantity,
}: any) => {
    const { shortMessage: shortPrepareErrorMessage } = prepareError || {}
    const { shortMessage: shortTransactionErrorMessage } =
        transactionError || {}

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

    if (
        transactionError &&
        shortTransactionErrorMessage === 'User rejected the request.'
    ) {
        return <>You&apos;ve canceled the transaction. Try again?</>
    }

    if (transactionError) {
        return <>Error: {shortTransactionErrorMessage}. Try again?</>
    }

    if (mintableQuantity === 0)
        return <>You&apos;ve reached your limit for minting NFTs.</>

    if (isWriteLoading)
        return (
            <>
                Action nedded: Confirm transaction it in your wallet to
                continue.
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
    return <>Ready for minting</>
}

export default InfoMessage
