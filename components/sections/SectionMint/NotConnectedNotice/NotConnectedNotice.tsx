const NotConnectedNotice = () => {
    return (
        <div className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5">
            <span className="block">
                <span className="font-bold">Not connected!</span>
                <br />
                Please connect your wallet to be able to claim NFTs.
            </span>
        </div>
    )
}

export default NotConnectedNotice
