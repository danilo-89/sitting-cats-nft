import type { ReactNode } from 'react'

interface IProps {
    title: string
    children: ReactNode
}

const Title = ({ title, children }: IProps) => {
    return (
        <div className="mx-auto mb-12 flex flex-col px-4 sm:w-[640px] sm:flex-row">
            <h2 className="mb-5 mr-8 shrink-0 grow rotate-[-3.7deg] text-6xl">
                {title}
            </h2>
            <p className="px-3 pt-2 md:px-0">{children}</p>
        </div>
    )
}

export default Title
