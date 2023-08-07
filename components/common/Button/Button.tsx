import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

// TS
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variation?: 'primary' | 'secondary' | 'neutral' | 'transparent'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const Button = ({
    children,
    variation = 'primary',
    size = 'md',
    className,
    ...attributes
}: IProps) => {
    const classes = clsx(
        'relative font-bold disabled:opacity-40  disabled:cursor-not-allowed',
        'active:translate-y-[0.25rem] active:translate-x-[0.3rem] transition duration-250',
        // size
        size === 'sm' &&
            'px-3 py-1 shadow-[0.18rem_0.15rem] active:shadow-[-0.18rem_-0.15rem] text-sm',
        size === 'md' &&
            'px-5 py-3 shadow-[0.3rem_0.25rem] active:shadow-[-0.3rem_-0.25rem] text-base',
        size === 'lg' &&
            'px-7 py-5 shadow-[0.5rem_0.4rem] active:shadow-[-0.5rem_-0.4rem] text-lg',
        // variation
        variation === 'primary' &&
            'bg-xantous shadow-wenge active:shadow-wenge',
        variation === 'secondary' &&
            'bg-robinEggBlue text-white shadow-silver/40 active:shadow-silver/40',
        variation === 'neutral' && 'bg-silver shadow-wenge active:shadow-wenge',
        variation === 'transparent' &&
            'bg-[transparent] shadow-wenge active:shadow-wenge',
        // additional
        className
    )

    return (
        <button
            {...attributes}
            className={classes}
        >
            {children}
        </button>
    )
}

export default Button
