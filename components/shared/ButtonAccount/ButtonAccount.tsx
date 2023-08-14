import Button from '@/components/common/Button/Button'
import { shortenHexString } from '@/utils'
import { useAccount, useSwitchNetwork } from 'wagmi'
import catIcon from '@/assets/cat-icon.svg'
import Image from 'next/image'
import { useUserContext } from '@/context/UserContext'
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

interface IProps {
    handleClick: (arg?: any) => void
}

const ButtonAccount = ({ handleClick }: IProps) => {
    const { userTotalNftBalance, isUserTotalNftBalanceFetching } =
        useUserContext()
    const { address } = useAccount()

    const { chains, error, isLoading, pendingChainId, switchNetwork } =
        useSwitchNetwork()

    const { isWrongNetwork } = useIsWrongNetwork()

    return (
        <Button
            type="button"
            className="ml-auto flex min-w-[12rem] items-center justify-center py-0"
            onClick={() => {
                if (isWrongNetwork) {
                    switchNetwork?.(Number(process.env.NEXT_PUBLIC_CHAIN_ID))
                } else {
                    handleClick(true)
                }
            }}
        >
            {isWrongNetwork ? <span className="text-[#f30544]">!</span> : null}
            <span className="mr-2">{shortenHexString(address)}</span>
            <figure className="relative">
                <Image
                    src={catIcon}
                    alt="cat icon"
                />
                <span className="absolute inset-0 top-1 block text-sm font-semibold">
                    {isUserTotalNftBalanceFetching ? (
                        <LoaderDots />
                    ) : (
                        userTotalNftBalance || 0
                    )}
                </span>
            </figure>
        </Button>
    )
}

export default ButtonAccount
