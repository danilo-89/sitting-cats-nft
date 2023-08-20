import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

// Utilities
import { ipfsToHttps } from '@/utils'

// Requests
import { getNFTs } from '@/requests'

// Components
import NftCard from '@/components/NftCard/NftCard'
import Button from '@/components/common/Button'
import LoaderSquare from '@/components/common/LoaderSquare'

// Types
import { INFT } from '@/types/getNftsAPI'

interface IProps {
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

function NFTGalery({ setIsOpen }: IProps) {
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
        if (data?.data?.totalCount) {
            setNftData(data?.data?.ownedNfts?.[0] || null)
        }
    }, [data])

    return (
        <div className="flex min-h-[32rem] w-[40rem]">
            <section className="flex w-1/2 flex-col bg-linen p-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Your NFT Collection</h3>
                    <Button
                        type="button"
                        size="sm"
                        variation="transparent"
                        onClick={() => setIsOpen(false)}
                    >
                        x
                    </Button>
                </div>
                <span className="mb-7 block border-b border-dashed border-wenge/40 pt-3" />
                <p className="mb-6 text-xsP">
                    <span className="mb-1 inline-block">
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
                    <div className="grid h-[17.5rem] grid-cols-2 gap-4 overflow-auto">
                        {data?.data?.ownedNfts?.map((item: INFT) => (
                            <button
                                key={item?.id?.tokenId}
                                type="button"
                                className="relative w-full pt-[100%]"
                                onClick={() => setNftData(item)}
                            >
                                <figure
                                    className="absolute inset-0 bg-antiFlashWhite p-4"
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
                                        alt="logo"
                                    />
                                </figure>
                            </button>
                        ))}
                    </div>
                )}
            </section>
            <section className="flex w-1/2 flex-col items-center justify-center bg-antiFlashWhite p-8">
                <NftCard data={nftData} />
            </section>
        </div>
    )
}

export default NFTGalery
