import Image from 'next/image'

// Assets
import arrowExternalIcon from '@/assets/arrow-external.svg'

// Contexts
import { useUserContext } from '@/context/UserContext'

// Hooks
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

// Components
import Button from '@/components/common/Button/Button'
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'

const faucets = process.env.NEXT_PUBLIC_FAUCET?.split(',')

const Faucet = () => {
    const { userBalance, isUserBalanceFetching, refetchUserBalance } =
        useUserContext()

    const { preferredNetwork } = useIsWrongNetwork()
    const nativeCurrency = preferredNetwork?.nativeCurrency?.symbol

    return (
        <div className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5">
            <span className="mb-4 block">
                <span className="font-bold">
                    You&apos;re low on {nativeCurrency}!
                </span>
                <br />
                Your current balance is {userBalance?.formatted}{' '}
                {nativeCurrency}. Having enough balance ensures you can claim
                NFTs and cover the transaction fees.
            </span>
            <span className="mb-5 block border-b border-dashed border-wenge/40"></span>
            <span className="mb-4 block">
                1. Go get some {nativeCurrency} for free:
            </span>
            <div className="mb-8 xs:text-center">
                {faucets?.map((href: string, idx: number) => (
                    <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-8 block font-bold hover:!underline xs:inline-block"
                    >
                        <span>
                            <span>faucet {idx + 1}</span>
                            <Image
                                className="ml-[0.3rem] inline-block w-[0.8rem] pb-[0.3rem] text-moonstone"
                                src={arrowExternalIcon}
                                alt="icon of arrow in box"
                            />
                        </span>
                    </a>
                    // </Button>
                ))}
            </div>
            <div>
                2. After you&apos;ve claimed some,{' '}
                <Button
                    className="mr-2"
                    size="sm"
                    disabled={isUserBalanceFetching}
                    type="button"
                    onClick={refetchUserBalance}
                >
                    recheck {isUserBalanceFetching ? <LoaderDots /> : null}
                </Button>{' '}
                your balance.
            </div>
        </div>
    )
}

export default Faucet
