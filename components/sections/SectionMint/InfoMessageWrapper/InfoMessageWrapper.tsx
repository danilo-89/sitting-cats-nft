import { type ReactNode } from 'react'
import clsx from 'clsx'

interface IProps {
    children: ReactNode
    isLoading: boolean
    isError: boolean
    isActionRequired: boolean
    isMetadataLoading: boolean
    isSuccess: boolean
}

const includeStyles =
    'bg-[#ffdf9a] bg-[#effbad] bg-[#ffc5c5] bg-[#a9d8e9] bg-[#a9e9ae]'

const InfoMessageWrapper = ({
    children,
    isLoading,
    isError,
    isActionRequired,
    isMetadataLoading,
    isSuccess,
}: IProps) => {
    const colorStyle = clsx({
        '!bg-[#ffdf9a] [&_+__*__.triangle]:!border-t-[#ffdf9a]': isLoading,
        '!bg-[#effbad] [&_+__*__.triangle]:!border-t-[#effbad]':
            isMetadataLoading,
        '!bg-[#ffc5c5] [&_+__*__.triangle]:!border-t-[#ffc5c5]': isError,
        '!bg-[#a9d8e9] [&_+__*__.triangle]:!border-t-[#a9d8e9]':
            isActionRequired,
        '!bg-[#a9e9ae] [&_+__*__.triangle]:!border-t-[#a9e9ae]': isSuccess,
    })

    return (
        <div
            className={`flex justify-center bg-antiFlashWhite p-4 text-center transition-colors ${colorStyle}`}
            data-cy="container-info-message"
        >
            {children}
        </div>
    )
}

export default InfoMessageWrapper
