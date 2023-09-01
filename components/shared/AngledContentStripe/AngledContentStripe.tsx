import { ReactNode } from 'react'
import clsx from 'clsx'

// TS
interface IProps {
    children: ReactNode
    color?: 'yellow' | 'blue'
}

// ensure tailwind will include styles
const includeStyles = 'bg-seaSerpent fill-seaSerpent fill-xantous'

const AngledContentStripe = ({ children, color = 'yellow' }: IProps) => {
    const backgroundClass = clsx(
        color === 'yellow' && 'xantous',
        color === 'blue' && 'seaSerpent'
    )

    return (
        <div
            className={`relative m-auto bg-${backgroundClass} flex max-w-[1024px]`}
        >
            <svg
                preserveAspectRatio="xMinYMax"
                width="100%"
                height="69"
                viewBox="0 0 1024 68"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={0}
                className={`absolute left-0 top-0 -translate-y-full fill-${backgroundClass}`}
            >
                <path d="M1024 68.5H0L1024 0V68.5Z" />
            </svg>
            <svg
                width="100%"
                height="69"
                viewBox="0 0 1024 68"
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute bottom-0 left-0 translate-y-full fill-${backgroundClass}`}
                strokeWidth={0}
                preserveAspectRatio="xMinYMin"
            >
                <path d="M0 8.95209e-05L1024 0L5.98846e-06 68.5001L0 8.95209e-05Z" />
            </svg>
            {children}
            <span
                className={`absolute bottom-0 left-0 top-0 block h-[calc(100%+68px)] w-screen -translate-x-full bg-${backgroundClass}`}
            ></span>
            <span
                className={`absolute bottom-0 right-[1px] block h-[calc(100%+68px)] w-[calc((100vw-1024px)/2)] translate-x-full bg-${backgroundClass}`}
            ></span>
        </div>
    )
}

export default AngledContentStripe
