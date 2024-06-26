import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { useAccount, useSwitchChain } from 'wagmi'

// Assets
import catIcon from '@/assets/cat-icon.svg'

// Utilities
import { shortenHexString } from '@/utils'

// Context
import { useUserContext } from '@/context'

// Hooks
import { useIsWrongNetwork } from '@/hooks'

// Components
import { Button, LoaderDots } from '@/components'

interface IProps {
    handleClick: Dispatch<SetStateAction<boolean>>
}

const ButtonAccount = ({ handleClick }: IProps) => {
    const { userTotalNftBalance, isUserTotalNftBalanceFetching } =
        useUserContext()

    const { address } = useAccount()
    const { switchChain } = useSwitchChain()

    const { isWrongNetwork } = useIsWrongNetwork()

    return (
        <Button
            type="button"
            className="ml-auto flex min-w-[12rem] items-center justify-center py-0"
            onClick={() => {
                if (isWrongNetwork) {
                    switchChain?.({
                        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                    })
                } else {
                    handleClick(true)
                }
            }}
            data-cy="btn-account"
            aria-label="open gallery"
        >
            {isWrongNetwork ? <span className="text-[#f30544]">!</span> : null}
            <span className="mr-2">{shortenHexString(address)}</span>
            <figure className="relative">
                <Image
                    src={catIcon}
                    alt="cat icon"
                    height={24}
                />
                <span
                    className="absolute inset-0 top-1 block text-xs font-semibold"
                    data-cy="nft-user-count"
                >
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
