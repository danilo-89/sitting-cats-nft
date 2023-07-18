import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

// TS
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variation?: 'primary' | 'secondary'
    className?: string
}

const Button = ({
    children,
    variation = 'primary',
    className,
    ...attributes
}: IProps) => {
    const classes = clsx(
        'relative px-5 py-3 font-bold',
        variation === 'primary' &&
            'bg-xantous shadow-buttonPrimary active:shadow-buttonPrimaryActive',
        variation === 'secondary' &&
            'bg-robinEggBlue text-white shadow-buttonSecondary active:shadow-buttonSecondaryActive',
        'active:translate-y-[0.25rem] active:translate-x-[0.3rem] transition duration-250',
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
