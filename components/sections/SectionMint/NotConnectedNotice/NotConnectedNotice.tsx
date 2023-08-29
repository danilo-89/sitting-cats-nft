const NotConnectedNotice = () => {
    return (
        <div
            className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5"
            data-cy="notice-not-connected"
        >
            <span className="block">
                <span className="font-bold">Not connected!</span>
                <br />
                Please connect your wallet to be able to mint NFTs.
            </span>
        </div>
    )
}

export default NotConnectedNotice
