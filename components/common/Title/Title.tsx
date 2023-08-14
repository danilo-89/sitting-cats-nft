import { ReactNode } from 'react'

interface IProps {
    title: string
    children: ReactNode
}

const Title = ({ title, children }: IProps) => {
    return (
        <div className="mx-auto mb-12 flex w-[640px] px-4">
            <h2 className="mr-8 shrink-0 grow rotate-[-3.7deg] text-6xl">
                {title}
            </h2>
            <p className="pt-2">{children}</p>
        </div>
    )
}

export default Title
