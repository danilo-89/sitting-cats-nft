import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fromHex } from 'viem'
import clsx from 'clsx'

interface IProps {
    data: any
}

const NftCard = ({ data }: IProps) => {
    const [flip, setFlip] = useState(false)
    const [currentData, setCurrentData] = useState<any>(null)
    const [isChanging, setIsChanging] = useState(false)
    const id = data?.id?.tokenId ? fromHex(data?.id?.tokenId, 'number') : ''

    const cardClass = clsx(
        'relative h-full w-full [transform-style:preserve-3d] [transition:transform_0.7s_ease_0s]',
        flip && 'animate-flip'
    )

    useEffect(() => {
        if (typeof id === 'number' && isFinite(id)) {
            setIsChanging(true)
            setFlip((curr) => true)
            const to = setTimeout(() => {
                setFlip((curr) => false)
                setCurrentData({ ...data, id: id })
                setIsChanging(false)
            }, 700)

            return () => {
                console.log('return uef')
                // setFlip((curr) => false)
                if (to) {
                    setCurrentData({ ...data, id: id })
                }
                setFlip((curr) => false)
                setIsChanging(false)
                clearTimeout(to)
            }
        }
    }, [id])

    return (
        <>
            <div className="h-[24rem] w-60 [perspective:1000px]">
                <div className={cardClass}>
                    {/* card front */}
                    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-md bg-linen shadow-md [backface-visibility:hidden]">
                        <div className="flex items-center justify-between bg-wenge bg-[url('/paws-pattern-brown.png')] bg-[size:180px] bg-right-top bg-repeat px-2 py-1.5">
                            <Image
                                // className="m-auto"
                                width="60"
                                height="40"
                                src="/logo.png"
                                alt="logo"
                            />
                            {currentData?.id ? (
                                <a
                                    href={`https://mumbai.polygonscan.com/token/0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014?a=${currentData?.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-champagne px-1 text-xsP font-semibold"
                                >
                                    {currentData?.id}
                                </a>
                            ) : null}
                        </div>

                        <div
                            className={clsx(
                                'flex h-auto flex-grow flex-col p-2.5 pt-1.5 transition-opacity',
                                isChanging && 'opacity-50'
                            )}
                        >
                            <h4
                                className={clsx(
                                    'mb-1.5 truncate text-sm font-semibold',
                                    !currentData && 'bg-gradient-placeholder'
                                )}
                            >
                                {!currentData ? (
                                    <span>&nbsp;</span>
                                ) : (
                                    currentData?.metadata?.name
                                )}
                            </h4>
                            <figure
                                className={clsx(
                                    'relative mb-1.5 w-full pt-[100%]',
                                    !currentData && 'bg-gradient-placeholder'
                                )}
                                style={{
                                    backgroundColor:
                                        currentData?.metadata?.background_color,
                                }}
                            >
                                {currentData ? (
                                    <Image
                                        className="absolute inset-0 m-auto"
                                        width="90"
                                        height="50"
                                        src={currentData?.metadata?.customImage}
                                        alt="cat silhouette with question sign inside"
                                    />
                                ) : null}
                            </figure>
                            <p
                                className={clsx(
                                    'my-auto max-h-[4rem] overflow-hidden text-xsP',
                                    !currentData &&
                                        'h-full bg-gradient-placeholder'
                                )}
                            >
                                {/* Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has b */}
                                {currentData?.metadata?.description}
                            </p>
                        </div>
                    </div>
                    {/* card back */}
                    <div className="absolute inset-0 rounded-md bg-wenge bg-[url('/paws-pattern-brown.png')] bg-[size:250px] bg-repeat [backface-visibility:hidden] [transform:rotateY(180deg)]" />
                </div>
            </div>
        </>
    )
}

export default NftCard