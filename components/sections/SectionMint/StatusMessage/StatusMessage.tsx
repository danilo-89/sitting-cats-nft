import clsx from 'clsx'

// Hooks
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

interface IProps {
    userPhaseNftBalance: number | undefined
    limitPerWallet: number | undefined
    totalPrice: number | undefined
    isEnoughBalanceToMint: boolean
}

const StatusMessage = ({
    userPhaseNftBalance,
    limitPerWallet,
    totalPrice,
    isEnoughBalanceToMint,
}: IProps) => {
    const { preferredNetwork } = useIsWrongNetwork()

    return (
        <>
            {totalPrice ? (
                <span
                    className={clsx(
                        isEnoughBalanceToMint
                            ? 'bg-antiFlashWhite'
                            : 'bg-[#ffc5c5]',
                        'mb-2 block  px-3 py-1.5 font-bold'
                    )}
                >
                    Price: {totalPrice}{' '}
                    {preferredNetwork?.nativeCurrency?.symbol}
                </span>
            ) : null}
            <span>
                {userPhaseNftBalance} of {limitPerWallet} NFT
                {typeof userPhaseNftBalance === 'number' &&
                userPhaseNftBalance > 1
                    ? 's'
                    : ''}{' '}
                claimed
            </span>
        </>
    )
}

export default StatusMessage
