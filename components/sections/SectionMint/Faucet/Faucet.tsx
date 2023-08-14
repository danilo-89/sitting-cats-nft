import Image from 'next/image'
import { useUserContext } from '@/context/UserContext'
import Button from '../../../common/Button/Button'
import arrowExternalIcon from '@/assets/arrow-external.svg'

// Components
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'

const faucets = process.env.NEXT_PUBLIC_FAUCET?.split(',')

const Faucet = () => {
    const { userBalance, isUserBalanceFetching, refetchUserBalance } =
        useUserContext()

    return (
        <div className="mx-auto mb-5 flex max-w-[640px] flex-col bg-silver p-5">
            <span className="mb-4 block">
                <span className="font-bold">You&apos;re low on gas!</span>
                <br />
                Current balance is {userBalance?.formatted}{' '}
                {userBalance?.symbol}. Having enough balance for gas ensures you
                can cover the transaction fees required to claim your NFTs.
            </span>
            <span className="mb-5 block border-b border-dashed border-wenge/40"></span>
            <span className="mb-4 block">
                1. Go get some {userBalance?.symbol} for free:
            </span>
            <div className="mb-8 text-center">
                {faucets?.map((href: string, idx) => (
                    <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-8 inline-block font-bold hover:!underline"
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
