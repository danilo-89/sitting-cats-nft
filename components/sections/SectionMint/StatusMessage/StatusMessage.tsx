const StatusMessage = ({
    userPhaseNftBalance,
    limitPerWallet,
    mintableQuantity,
}: any) => {
    return (
        <>
            {userPhaseNftBalance} of {limitPerWallet} NFT
            {userPhaseNftBalance > 1 ? 's' : ''} claimed
        </>
    )
}

export default StatusMessage
