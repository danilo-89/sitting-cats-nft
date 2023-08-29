import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { useAccount, useSwitchNetwork } from 'wagmi'

// Assets
import catIcon from '@/assets/cat-icon.svg'

// Utilities
import { shortenHexString } from '@/utils'

// Context
import { useUserContext } from '@/context/UserContext'

// Components
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'
import Button from '@/components/common/Button/Button'

interface IProps {
    handleClick: Dispatch<SetStateAction<boolean>>
}

const ButtonAccount = ({ handleClick }: IProps) => {
    const { userTotalNftBalance, isUserTotalNftBalanceFetching } =
        useUserContext()

    const { address } = useAccount()
    const { switchNetwork } = useSwitchNetwork()

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
            data-cy="btn-account"
        >
            {isWrongNetwork ? <span className="text-[#f30544]">!</span> : null}
            <span className="mr-2">{shortenHexString(address)}</span>
            <figure className="relative">
                <Image
                    src={catIcon}
                    alt="cat icon"
                    height={24}
                />
                <span className="absolute inset-0 top-1 block text-xs font-semibold">
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
