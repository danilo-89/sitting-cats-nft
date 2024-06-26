import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import clsx from 'clsx'

// Utilities
import { getIdFromHash, ipfsToHttps } from '@/utils'

// Requests
import { getNFTs } from '@/requests'

// Components
import { Button, LoaderSquare, NftCard } from '@/components'

// Types
import { INFT } from '@/types'

interface IProps {
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

function NFTGallery({ setIsOpen }: IProps) {
    const { address } = useAccount()
    const [nftData, setNftData] = useState<INFT | null>(null)

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['userNfts', address],
        enabled: !!address,
        queryFn: () => getNFTs(address),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        const totalCount = data?.data?.totalCount
        if (totalCount) {
            setNftData(data?.data?.ownedNfts?.[totalCount - 1] || null)
        }
    }, [data])

    return (
        <div
            className="flex flex-col md:min-h-[32rem] md:w-[40rem] md:flex-row"
            data-cy="container-nft-gallery"
        >
            <section className="flex flex-col bg-linen p-5 md:w-1/2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Your NFT Collection</h3>
                    <Button
                        type="button"
                        size="sm"
                        variation="transparent"
                        onClick={() => setIsOpen(false)}
                        data-cy="btn-modal-close"
                        aria-label="close modal"
                    >
                        x
                    </Button>
                </div>
                <span className="mb-7 block border-b border-dashed border-wenge/40 pt-3" />
                <p className="mb-6 text-xsP">
                    <span className="mb-2 block font-semibold">
                        Welcome to your SittingCats <sup>NFT</sup> collection
                        showcase.
                    </span>
                    {isLoading || isFetching ? (
                        <span>
                            Hang on for a quick moment as we track down your
                            NFTs. We&apos;ll have them ready for you to explore
                            in no time.
                        </span>
                    ) : data?.data?.ownedNfts?.length ? (
                        <span>
                            To learn more about any specific artwork, simply
                            click on it, and you&apos;ll be able to see
                            additional details. Happy exploring!
                        </span>
                    ) : (
                        <span>
                            Looks like you don&apos;t have any NFTs right now.
                            No problem, just head to the minting section and
                            claim your first NFT!
                        </span>
                    )}
                </p>

                {isLoading || isFetching ? (
                    <div className="flex h-auto w-full grow items-center justify-center">
                        <LoaderSquare />
                    </div>
                ) : (
                    <div className="grid auto-cols-[minmax(33%,_1fr)] grid-flow-col grid-cols-[repeat(3,minmax(33%,1fr))] gap-4 overflow-auto md:h-[17.5rem] md:grid-flow-row md:grid-cols-2">
                        {data?.data?.ownedNfts
                            ?.map((item: INFT) => (
                                <button
                                    key={item?.id?.tokenId}
                                    type="button"
                                    className="relative max-h-0.5 pt-[100%] md:w-full"
                                    onClick={() => setNftData(item)}
                                    data-cy={`btn-nft-item-${getIdFromHash(
                                        item?.id?.tokenId
                                    )}`}
                                >
                                    <figure
                                        className={clsx(
                                            'absolute inset-0 flex bg-antiFlashWhite p-4',
                                            item?.id &&
                                                nftData?.id === item?.id &&
                                                'shadow-[inset_2px_2px_#EFBF5B,inset_-2px_-2px_#EFBF5B]'
                                        )}
                                        style={{
                                            backgroundColor: `#${item?.metadata?.background_color}`,
                                        }}
                                    >
                                        <Image
                                            className="m-auto max-h-[100%] w-auto"
                                            width="60"
                                            height="40"
                                            src={ipfsToHttps(
                                                item?.metadata?.image || ''
                                            )}
                                            alt={
                                                item?.metadata?.name ||
                                                'cat silhouette'
                                            }
                                        />
                                    </figure>
                                </button>
                            ))
                            .reverse()}
                    </div>
                )}
            </section>
            <section className="flex flex-col items-center justify-center bg-antiFlashWhite p-8 md:w-1/2">
                <NftCard data={nftData} />
            </section>
        </div>
    )
}

export default NFTGallery
