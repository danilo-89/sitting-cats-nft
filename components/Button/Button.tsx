import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variation?: 'primary' | 'secondary'
    shadow?: boolean
}

const Button = ({
    children,
    variation = 'primary',
    shadow = true,
    ...attributes
}: IProps) => {
    const classes = clsx(
        'relative px-5 py-3 font-bold',
        variation === 'primary' &&
            'bg-xantous  shadow-button active:shadow-buttonActive',
        variation === 'secondary' &&
            'bg-robinEggBlue text-white shadow-buttonLinen active:shadow-buttonActiveSecondary',
        'active:translate-y-[0.25rem] active:translate-x-[0.3rem] transition duration-250',
        attributes.className
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
