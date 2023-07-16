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
        variation === 'primary' && 'bg-xantous',
        variation === 'secondary' && 'bg-robinEggBlue',
        shadow &&
            'shadow-button active:shadow-buttonActive active:translate-y-[0.25rem] active:translate-x-[0.3rem] transition duration-250'
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
