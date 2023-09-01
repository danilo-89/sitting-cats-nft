import { useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import clsx from 'clsx'

// Hooks
import useScrollIndicator from '@/hooks/useScrollIndindicator'
import useIsMounted from '@/hooks/useIsMounted'

// Components
import NFTGalleryModal from '@/components/NFTGallery/Modal'
import ButtonAccount from '@/components/shared/ButtonAccount/ButtonAccount'
import ButtonConnect from '@/components/shared/ButtonConnect/ButtonConnect'

const includeStyles = 'bg-[url("/paws-pattern-alternative.png")]'

const Nav = () => {
    const navRef = useRef<HTMLElement>(null)
    const isMounted = useIsMounted()
    const { isConnected } = useAccount()

    const [isModalOpened, setIsModalOpened] = useState(false)
    const { isOverHeight, isHeightChecked } = useScrollIndicator(
        navRef?.current?.clientHeight
            ? navRef?.current?.clientHeight * 2
            : undefined
    )

    const navClasses = clsx(
        'flex w-full z-[2] fixed transition duration-450 bg-transparent',
        isOverHeight &&
            'bg-moonstone bg-[url("/paws-pattern-alternative.png")] bg-[size:20%] bg-repeat'
    )
    const h1Classes = clsx(
        'absolute rotate-[-3.7deg] text-champagne transition duration-1000 sm:whitespace-nowrap',
        !isHeightChecked && 'opacity-0',
        isOverHeight
            ? 'left-3 text-[2.3rem] top-[-5%] -translate-x-0 -translate-y-0'
            : 'left-1/2 top-[15rem] sm:top-[calc(100vh/2-9rem)] -translate-x-1/2 -translate-y-1/2 text-[6.5rem] md:text-[8rem]'
    )
    const textCatsClasses = clsx(
        'transition duration-700',
        isOverHeight
            ? 'absolute -translate-y-full translate-x-full right-[90%] top-[155%]'
            : 'relative top-[-3rem] sm:top-[unset]'
    )
    const textNftClasses = clsx(
        'transition-transform duration-700',
        'absolute font-sans font-bold',
        isOverHeight
            ? 'text-champagne text-xs bg-wenge py-1 pr-[0.4rem] pl-3 translate-x-full translate-y-full right-[5%] top-[-15%]'
            : '-right-6 top-8 md:top-10 text-wenge text-base'
    )
    return (
        <nav
            className={navClasses}
            ref={navRef}
        >
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
            <NFTGalleryModal
                isOpen={isModalOpened}
                setIsOpen={setIsModalOpened}
            />
        </nav>
    )
}

export default Nav
