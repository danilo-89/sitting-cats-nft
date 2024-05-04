const NotConnectedNotice = () => {
    return (
        <div
            className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5"
            data-cy="notice-not-connected"
        >
            <span className="block">
                <span className="font-bold">Not connected!</span>
                <br />
                <span className="mb-4 block">
                    Please connect your wallet to be able to mint NFTs*.
                </span>
                <span className="mb-5 block border-b border-dashed border-wenge/40"></span>
                <span className="text-sm">
                    *Minting on this site uses testnet, so no real money is
                    spent, letting you try NFT minting without financial risk.
                </span>
            </span>
        </div>
    )
}

export default NotConnectedNotice
