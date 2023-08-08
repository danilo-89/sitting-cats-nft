import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Components
import NftCard from '@/components/NftCard/NftCard'
import Button from '@/components/common/Button'

const getNFTs = async () => {
    const res = await axios.get(
        `https://${'polygon-mumbai'}.g.alchemy.com/nft/v2/${
            process.env.NEXT_PUBLIC_ALCHEMY
        }/getNFTs`,
        {
            params: {
                owner: process.env.NEXT_PUBLIC_CONTRACT_OWNER,
                contractAddresses: [process.env.NEXT_PUBLIC_CONTRACT],
            },
        }
    )
    return res
}
const data = {
    data: {
        ownedNfts: [
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000001',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'test 002',
                description: '',
                tokenUri: {
                    gateway:
                        'https://ipfs.io/ipfs/QmYd1XDTuiNHMmASanJYePN5UkFhrwQcmu12fEw6SSg51h/1',
                    raw: 'ipfs://QmYd1XDTuiNHMmASanJYePN5UkFhrwQcmu12fEw6SSg51h/1',
                },
                media: [
                    {
                        gateway: '',
                        raw: '',
                    },
                ],
                metadata: {
                    name: 'test 002',
                    description: '',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    external_url: '',
                    customAnimationUrl: '',
                    background_color: '#7eb69d',
                },
                timeLastUpdated: '2023-08-05T00:20:10.309Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000002',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'test 003',
                description: '',
                tokenUri: {
                    gateway:
                        'https://ipfs.io/ipfs/QmYmYQtkCuRNfsBoa7FvwckeC6cmm19eNArgYQa9qfSjLH/2',
                    raw: 'ipfs://QmYmYQtkCuRNfsBoa7FvwckeC6cmm19eNArgYQa9qfSjLH/2',
                },
                media: [
                    {
                        gateway: '',
                        raw: '',
                    },
                ],
                metadata: {
                    name: 'test 003',
                    description: '',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    external_url: '',
                    customAnimationUrl: '',
                    background_color: '#e490bf',
                },
                timeLastUpdated: '2023-08-06T13:47:16.097Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000003',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'test 004',
                description: '',
                tokenUri: {
                    gateway:
                        'https://ipfs.io/ipfs/QmUTmgQsSSPr1qyC6AcG8kSHdDB4ZinShTupkE8eBiahAW/3',
                    raw: 'ipfs://QmUTmgQsSSPr1qyC6AcG8kSHdDB4ZinShTupkE8eBiahAW/3',
                },
                media: [
                    {
                        gateway: '',
                        raw: '',
                    },
                ],
                metadata: {
                    name: 'test 004',
                    description: '',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    external_url: '',
                    customAnimationUrl: '',
                    background_color: '#bcc79e',
                },
                timeLastUpdated: '2023-08-05T00:20:11.055Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000004',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'test 005',
                description: 'This is test',
                tokenUri: {
                    gateway:
                        'https://alchemy.mypinata.cloud/ipfs/QmabQ9zKujrCPG2jVcXfkpHhSu4oeEnqkBqmC8ScxJsYub/4',
                    raw: 'ipfs://QmabQ9zKujrCPG2jVcXfkpHhSu4oeEnqkBqmC8ScxJsYub/4',
                },
                media: [
                    {
                        gateway:
                            'https://nft-cdn.alchemy.com/matic-mumbai/e107fa539947d95673c7c092fec3ae00',
                        thumbnail:
                            'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/e107fa539947d95673c7c092fec3ae00',
                        raw: 'ipfs://QmTnhTTYUL9JRxv6R7ARDZX1HwB7P7ochf5Z5nqxo91LMj/4.png',
                        format: 'png',
                        bytes: 19180,
                    },
                ],
                metadata: {
                    image: 'ipfs://QmTnhTTYUL9JRxv6R7ARDZX1HwB7P7ochf5Z5nqxo91LMj/4.png',
                    external_url: '',
                    background_color: '',
                    name: 'test 005',
                    description: 'This is test',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    attributes: [
                        {
                            value: 'red',
                            trait_type: 'color',
                        },
                    ],
                    customAnimationUrl: '',
                },
                timeLastUpdated: '2023-08-05T00:20:10.442Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000005',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'Test 006',
                description: 'lorem ipsum',
                tokenUri: {
                    gateway:
                        'https://alchemy.mypinata.cloud/ipfs/QmWRrvkKigsdkrNQ5DhB1AN4DokkfSwqkYBczJY1bDFpNx/5',
                    raw: 'ipfs://QmWRrvkKigsdkrNQ5DhB1AN4DokkfSwqkYBczJY1bDFpNx/5',
                },
                media: [
                    {
                        gateway:
                            'https://nft-cdn.alchemy.com/matic-mumbai/ee728445d4680b0c1df3fcf80e75e6f5',
                        thumbnail:
                            'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/ee728445d4680b0c1df3fcf80e75e6f5',
                        raw: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                        format: 'png',
                        bytes: 97618,
                    },
                ],
                metadata: {
                    image: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    external_url: '',
                    background_color: '#d4bd8f',
                    name: 'Test 006',
                    description: 'lorem ipsum',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    customAnimationUrl: '',
                },
                timeLastUpdated: '2023-08-06T13:47:16.315Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
            {
                contract: {
                    address: '0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014',
                },
                id: {
                    tokenId:
                        '0x0000000000000000000000000000000000000000000000000000000000000006',
                    tokenMetadata: {
                        tokenType: 'ERC721',
                    },
                },
                balance: '1',
                title: 'Test 007',
                description: '',
                tokenUri: {
                    gateway:
                        'https://alchemy.mypinata.cloud/ipfs/QmP6t6LmSVSSv9BP48ALhcnPN4TpdPxjzFgT82Bk5nBtm4/6',
                    raw: 'ipfs://QmP6t6LmSVSSv9BP48ALhcnPN4TpdPxjzFgT82Bk5nBtm4/6',
                },
                media: [
                    {
                        gateway:
                            'https://nft-cdn.alchemy.com/matic-mumbai/4a8f0699ed985b6cafa64796dff84b93',
                        thumbnail:
                            'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/4a8f0699ed985b6cafa64796dff84b93',
                        raw: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                        format: 'png',
                        bytes: 97618,
                    },
                ],
                metadata: {
                    image: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    external_url: '',
                    background_color: '#b299e0',
                    name: 'Test 007',
                    description:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    customImage: 'https://i.postimg.cc/ZqLH1v0Q/hero-cat.png',
                    customAnimationUrl: '',
                },
                timeLastUpdated: '2023-08-06T13:47:16.293Z',
                contractMetadata: {
                    name: 'cats-test',
                    totalSupply: '6',
                    tokenType: 'ERC721',
                    openSea: {
                        lastIngestedAt: '2023-08-04T22:42:17.000Z',
                    },
                },
            },
        ],
        totalCount: 6,
        blockHash:
            '0x7ca2e18cf27ba4b4649bf3f8255ee72e12962ba6524700f99f1d47fa39a22f61',
    },
    status: 200,
    statusText: '',
    headers: {
        'content-length': '1194',
        'content-type': 'application/json',
    },
    config: {
        transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false,
        },
        adapter: ['xhr', 'http'],
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {},
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
        params: {
            owner: '0x54C28209aA8893bB7b403D91b24Ca48eEf262788',
            contractAddresses: ['0x2b2d8aA76E03FEdFd22E9B5E333F9EAE10488014'],
        },
        method: 'get',
        url: 'https://polygon-mumbai.g.alchemy.com/nft/v2/4wUHd-c4zm8RxA7P3KFxbnZDDyIRKA9T/getNFTs',
    },
    request: {},
}

function UserNfts({ setIsOpen }: any) {
    const [nftData, setNftData] = useState<any | null>(null)

    // const { data } = useQuery({
    //     queryKey: ['userNfts'],
    //     queryFn: getNFTs,
    //     staleTime: Infinity,
    //     refetchOnWindowFocus: false,
    //     // cacheTime: 5000,
    // })

    console.log(data)

    useEffect(() => {
        // if (data?.data?.totalCount) {
        //     setNftData(data?.data?.ownedNfts?.[0] || null)
        // }
    }, [data])

    return (
        <div className="flex w-[40rem]">
            <section className="w-1/2 bg-linen p-5">
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
                    {/* <span>
                        To learn more about any specific artwork, simply click
                        on it, and you&apos;ll be able to explore additional
                        details. Happy exploring!
                    </span> */}
                    {/* <span>
                        Hang on for a quick moment as we track down your NFTs.
                        We&apos;ll have them ready for you to explore in no
                        time.
                    </span> */}
                    <span>
                        Looks like you don&apos;t have any NFTs right now. No
                        problem, just head to the minting section and claim your
                        first NFT!
                    </span>
                </p>
                {/* <div className="flex h-[17.5rem] flex-col items-center justify-center py-5">
                    <p className="mb-2 block text-center text-sm text-wenge/70">
                        searching for NFTs
                    </p>

                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40px"
                            height="auto"
                            viewBox="0 0 100 100"
                        >
                            <rect
                                x="20"
                                y="20"
                                width="60"
                                height="60"
                                stroke="#dcdcdc"
                                stroke-width="20"
                                fill="none"
                            ></rect>
                            <rect
                                x="20"
                                y="20"
                                width="60"
                                height="60"
                                stroke="#61C1CE"
                                stroke-width="20"
                                stroke-lincap="undefined"
                                fill="none"
                            >
                                <animate
                                    attributeName="stroke-dasharray"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    keyTimes="0;0.5;1"
                                    values="24 216;120 120;24 216"
                                ></animate>
                                <animate
                                    attributeName="stroke-dashoffset"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    keyTimes="0;0.5;1"
                                    values="0;-120;-240"
                                ></animate>
                            </rect>
                        </svg>
                    </div>
                </div> */}
                <div className="grid h-[17.5rem] grid-cols-2 gap-4 overflow-auto">
                    {/* {[0, 1, 2, 3].map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="relative w-full pt-[100%]"
                            onClick={() => setId(item)}
                        >
                            <figure className="absolute inset-0 bg-antiFlashWhite p-4">
                                <Image
                                    className="m-auto max-h-[100%] w-auto"
                                    width="60"
                                    height="40"
                                    src="/hero-cat.png"
                                    alt="logo"
                                />
                            </figure>
                        </button>
                    ))} */}

                    {/* {[0, 1, 2, 3].map((item: any) => (
                        <div
                            key={item}
                            className="relative w-full pt-[100%]"
                        >
                            <figure className="absolute inset-0 bg-gradient-placeholder p-4">
                            </figure>
                        </div>
                    ))} */}
                    {data?.data?.ownedNfts?.map((item: any) => (
                        <button
                            key={item?.id?.tokenId}
                            type="button"
                            className="relative w-full pt-[100%]"
                            onClick={() => setNftData(item)}
                        >
                            <figure
                                className="absolute inset-0 bg-antiFlashWhite p-4"
                                style={{
                                    backgroundColor:
                                        item?.metadata?.background_color,
                                }}
                            >
                                <Image
                                    className="m-auto max-h-[100%] w-auto"
                                    width="60"
                                    height="40"
                                    src={item?.metadata?.customImage}
                                    alt="logo"
                                />
                            </figure>
                        </button>
                    ))}
                </div>
            </section>
            <section className="flex w-1/2 flex-col items-center justify-center bg-antiFlashWhite p-8">
                <NftCard data={nftData} />
            </section>
        </div>
    )
}

export default UserNfts
