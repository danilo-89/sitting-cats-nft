import Button from '../Button/Button'
import useScrollIndicator from '@/app/hooks/useScrollIndindicator'
import clsx from 'clsx'
import ButtonConnect from '../../shared/ButtonConnect/ButtonConnect'
import useIsMounted from '@/app/hooks/useIsMounted'
import Modal from '../Modal'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import ButtonAccount from '@/components/shared/ButtonAccount/ButtonAccount'
import { useDisconnect } from 'wagmi'
import UserNfts from '@/components/UserNfts'
const includeStyles = 'bg-[url("/paws-pattern-alternative.png")]'

const Nav = () => {
    const { isConnected } = useAccount()

    const [isModalOpened, setIsModalOpened] = useState(false)
    const isMounted = useIsMounted()
    const a = useScrollIndicator()
    const breakpointValue1 = 10
    const breakpointValue2 = 40

    const { disconnect } = useDisconnect()
    console.log({ isModalOpened }, { isConnected })

    const navClasses = clsx(
        'flex w-full z-[1] fixed transition duration-450 bg-transparent',
        a.scrollPosition > breakpointValue1 &&
            'bg-moonstone bg-[url("/paws-pattern-alternative.png")] bg-[size:20%] bg-repeat'

        // a.scrollPosition > breakpointValue2 &&
        //     'bg-[url("/paws-pattern-alternative.png")] bg-[size:20%] bg-repeat'
    )
    const h1Classes = clsx(
        'absolute rotate-[-3.7deg] text-champagne transition duration-1000',
        a.scrollPosition > breakpointValue1
            ? 'left-3 text-[2.3rem] top-[-5%] -translate-x-0 -translate-y-0'
            : 'left-1/2 top-[calc(100vh/2-9rem)] -translate-x-1/2 -translate-y-1/2 text-[8rem]'
    )
    const textCatsClasses = clsx(
        'transition duration-700',
        a.scrollPosition > breakpointValue1
            ? 'absolute -translate-y-full translate-x-full right-[90%] top-[155%]'
            : 'relative'
    )
    const textNftClasses = clsx(
        'transition-transform duration-700',
        'absolute font-sans font-bold',
        a.scrollPosition > breakpointValue1
            ? 'text-champagne text-xs bg-wenge py-1 pr-[0.4rem] pl-3 translate-x-full translate-y-full right-[5%] top-[-15%]'
            : '-right-6 top-10 text-wenge text-base'
    )
    return (
        <nav className={navClasses}>
            <div className="relative m-auto flex w-full max-w-6xl p-4">
                <h1 className={h1Classes}>
                    <span className="relative z-[1] drop-shadow-title">
                        Sitting
                    </span>{' '}
                    <span className={textCatsClasses}>
                        <span className="relative z-[1] drop-shadow-title">
                            Cats
                        </span>{' '}
                        <sup className={textNftClasses}>NFT</sup>
                    </span>
                </h1>
                {isMounted && (
                    <>
                        {isConnected ? (
                            <ButtonAccount handleClick={setIsModalOpened} />
                        ) : (
                            <ButtonConnect />
                        )}
                    </>
                )}
            </div>

            {isModalOpened && isConnected ? (
                <Modal
                    setIsOpen={setIsModalOpened}
                    // preventOverlayClose
                >
                    <UserNfts setIsOpen={setIsModalOpened} />
                    <div className="flex justify-end bg-white p-6">
                        <Button
                            onClick={() => {
                                setIsModalOpened(false)
                                disconnect()
                            }}
                            size="sm"
                            type="button"
                            variation="transparent"
                            // key="modalBtn"
                        >
                            Disconnect
                        </Button>
                    </div>
                </Modal>
            ) : null}
        </nav>
    )
}

export default Nav
