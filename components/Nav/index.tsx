import Button from '../Button/Button'
import useScrollIndicator from '@/app/hooks/useScrollIndindicator'
import clsx from 'clsx'

const Nav = () => {
    const a = useScrollIndicator()
    const breakpointValue1 = 10
    const breakpointValue2 = 40
    console.log(a)

    const navClasses = clsx(
        'flex w-full p-4 z-[1]',
        a.scrollPosition > breakpointValue1
            ? 'fixed bg-robinEggBlue'
            : 'absolute',
        a.scrollPosition > breakpointValue2 &&
            'bg-[url("/paws-pattern.png")] bg-[size:20%] bg-repeat'
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
            <Button
                className="ml-auto"
                type="button"
            >
                Connect Wallet
            </Button>
        </nav>
    )
}

export default Nav
