interface IProps {
    userPhaseNftBalance: number | undefined
    limitPerWallet: number | undefined
}

const StatusMessage = ({ userPhaseNftBalance, limitPerWallet }: IProps) => {
    return (
        <>
            {userPhaseNftBalance} of {limitPerWallet} NFT
            {typeof userPhaseNftBalance === 'number' && userPhaseNftBalance > 1
                ? 's'
                : ''}{' '}
            claimed
        </>
    )
}

export default StatusMessage
