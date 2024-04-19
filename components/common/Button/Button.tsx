import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

// TS
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variation?: 'primary' | 'secondary' | 'neutral' | 'transparent'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    insideClassName?: string
}

const Button = ({
    children,
    variation = 'primary',
    size = 'md',
    className,
    insideClassName,
    ...attributes
}: IProps) => {
    const classes = clsx(
        'group relative font-bold disabled:opacity-40 disabled:cursor-not-allowed transition duration-250',
        // additional
        className
    )
    const insideClasses = clsx(
        'duration-250 relative bottom-0 left-0 flex h-full w-full items-center justify-center transition-all group-active:translate-x-[-0.10rem] group-active:translate-y-[-0.12rem]',
        // size
        size === 'sm' &&
            'px-3 py-1 text-sm shadow-[0.18rem_0.15rem] group-active:shadow-[-0.18rem_-0.15rem]',
        size === 'md' &&
            'px-5 py-3 text-base shadow-[0.3rem_0.25rem] group-active:shadow-[-0.3rem_-0.25rem]',
        size === 'lg' &&
            'px-7 py-5 text-lg shadow-[0.5rem_0.4rem] group-active:shadow-[-0.5rem_-0.4rem]',
        // variation
        variation === 'primary' &&
            'text-wenge bg-xantous shadow-wenge group-active:shadow-wenge',
        variation === 'secondary' &&
            'text-wenge bg-robinEggBlue shadow-silver/40 group-active:shadow-silver/40',
        variation === 'neutral' &&
            'text-wenge bg-silver shadow-wenge group-active:shadow-wenge',
        variation === 'transparent' &&
            'text-wenge bg-[transparent] shadow-wenge group-active:shadow-wenge',
        // additional
        insideClassName
    )

    return (
        <button
            {...attributes}
            className={classes}
        >
            <span className={insideClasses}>{children}</span>
        </button>
    )
}

export default Button
