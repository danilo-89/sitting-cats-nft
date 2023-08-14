'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { fromHex, parseEther, parseUnits } from 'viem'
import debounce from 'lodash.debounce'

// Components
import AngledContentStripe from '@/components/shared/AngledContentStripe/AngledContentStripe'
import Button from '@/components/common/Button/Button'
import InputNft from '@/components/sections/SectionMint/InputNft'
import Title from '@/components/common/Title/Title'
import Faucet from '@/components/sections/SectionMint/Faucet/Faucet'

import { useUserContext } from '@/context/UserContext'
import { useContractContext } from '@/context/ContractContext'
import { contractConfig } from '@/contract/config'
import loader from '@/assets/loader.svg'
import clsx from 'clsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import StatusMessage from './StatusMessage'
import InfoMessage from './InfoMessage'
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'
import WrongNetworkNotice from './WrongNetworkNotice/WrongNetworkNotice'

// const getIPFSData = async (stringId: string | undefined) => {
//     const res = await axios.get(`https://ipfs.io/ipfs/${stringId}`)
//     const prefix = 'ipfs://'
//     const result = res?.data?.substring(prefix.length)
//     console.log(res, result)
//     return res
// }

const getNFTMetadata = async (tokenId?: number | undefined) => {
    if (tokenId) {
        const res = await axios.get(
            `https://${'polygon-mumbai'}.g.alchemy.com/nft/v2/${
                process.env.NEXT_PUBLIC_ALCHEMY
            }/getNFTMetadata`,
            {
                params: {
                    tokenId: tokenId,
                    contractAddress: process.env.NEXT_PUBLIC_CONTRACT,
                    tokenType: 'ERC721',
                },
            }
        )
        return res
    }
    return undefined
}

const SectionMint = () => {
    const { address, isConnected } = useAccount()
    const { userBalance, isUserBalanceFetching, refetchUserBalance } =
        useUserContext()

    const { isWrongNetwork } = useIsWrongNetwork()

    const {
        limitPerWallet,
        totalMinted,
        isTotalMintedFetching,
        refetchTotalMinted,
    } = useContractContext()
    const {
        userPhaseNftBalance,
        isUserPhaseNftBalanceFetching,
        refetchUserTotalNftBalance,
        refetchUserPhaseNftBalance,
    } = useUserContext()
    const [inputValue, setInputValue] = useState('1')
    const [quantity, setQuantity] = useState(inputValue)
    const [hash, setHash] = useState<any>(undefined)
    const [mintedNFTId, setMintedNFTId] = useState<number | undefined>(
        undefined
    )
    const [mintedMetadata, setMintedMetadata] = useState<any>(null)

    const mintableQuantity =
        limitPerWallet && typeof userPhaseNftBalance === 'number'
            ? limitPerWallet - userPhaseNftBalance
            : undefined

    // prevent excessive request sending
    const handleSearchDebounced = useRef(
        debounce((searchText: string) => setQuantity(searchText), 800)
    ).current

    useEffect(() => {
        handleSearchDebounced(inputValue)
    }, [inputValue, handleSearchDebounced])

    const {
        config,
        error: prepareError,
        isFetching: isPrepareFetching,
        isLoading: isPrepareLoading,
        isFetchedAfterMount: isPrepareFetchedAfterMount,
        refetch: refetchPrepare,
    } = usePrepareContractWrite({
        ...contractConfig,
        enabled: false,
        // enabled: false,
        functionName: 'claim',
        args: [
            address!,
            parseUnits(quantity, 0),
            '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            parseEther('0'),
            {
                proof: [],
                quantityLimitPerWallet: parseUnits('3', 0),
                pricePerToken: parseUnits('0', 0),
                currency: '0x0000000000000000000000000000000000000000',
            },
            '0x',
        ],
        value: parseEther('0'),
    })

    const {
        isLoading: isWriteLoading,
        write,
        data: cWData,
        error: transactionError,
        reset,
    } = useContractWrite({
        ...config,
        onSuccess(data) {
            setHash(data?.hash)
        },
    })

    console.log({ transactionError })

    const {
        data: receiptData,
        isError,
        isLoading: isReceiptLoading,
    } = useWaitForTransaction({
        hash,
        onSettled(data) {
            setHash(undefined)
            setMintedNFTId(
                data?.logs?.[0]?.topics?.[3]
                    ? fromHex(data?.logs?.[0]?.topics?.[3], 'number')
                    : undefined
            )
        },
    })

    const {
        status: claimedMetadataStatus,
        isFetching: isClaimedMetadataFetching,
        data: claimedMetadata,
        refetch: fetchClaimedMetadata,
    } = useQuery({
        enabled: false,
        queryKey: ['nftURILink', mintedNFTId],
        queryFn: () => getNFTMetadata(mintedNFTId),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        // cacheTime: 5000,
    })

    const mintNFT = async () => {
        reset()
        setMintedMetadata(null)
        const prepareResponse = await refetchPrepare()
        console.log({ prepareResponse })
        if (prepareResponse.isSuccess) {
            write?.()
        }
    }

    console.log({ claimedMetadata })

    console.log(
        { isClaimedMetadataFetching },
        { isPrepareFetching },
        { isWriteLoading },
        { isReceiptLoading }
    )

    // fetch metadata for minted NFT
    useEffect(() => {
        if (mintedNFTId) {
            console.log('fetched metadata')

            fetchClaimedMetadata()
        }
    }, [mintedNFTId, fetchClaimedMetadata])

    useEffect(() => {
        if (claimedMetadataStatus === 'success') {
            setMintedNFTId(undefined)
            refetchTotalMinted()
            refetchUserTotalNftBalance()
            refetchUserPhaseNftBalance()
            setInputValue('1')
            setMintedMetadata(claimedMetadata?.data?.metadata)
        }
    }, [
        claimedMetadataStatus,
        claimedMetadata,
        refetchTotalMinted,
        refetchUserTotalNftBalance,
        refetchUserPhaseNftBalance,
    ])

    useEffect(() => {
        setInputValue('1')
        setMintedNFTId(undefined)
        setMintedMetadata(null)
    }, [address])

    console.log({ cWData })
    console.log({ receiptData })
    console.log(
        receiptData?.logs?.[0]?.topics?.[3]
            ? fromHex(receiptData?.logs?.[0]?.topics?.[3], 'number')
            : 'no data'
    )

    //read method on blockchain tokenURI

    console.log({ userBalance })

    const lowUserBalance =
        typeof userBalance?.formatted === 'string' &&
        +userBalance.formatted < 0.001

    return (
        <section className="pt-[10rem]">
            <Title title="Mint now">
                Claiming an NFT is like putting a digital trophy on your virtual
                shelf. Total claimed NFTs:{' '}
                {isTotalMintedFetching ? <LoaderDots /> : totalMinted}
            </Title>

            {/* {isConnected ? '' : ''} */}
            {lowUserBalance && !isWrongNetwork ? <Faucet /> : null}
            {isWrongNetwork ? <WrongNetworkNotice /> : null}

            <div
                className={clsx(
                    'mx-auto max-w-[640px]',
                    (isConnected === false ||
                        lowUserBalance ||
                        isWrongNetwork) &&
                        'opacity-30'
                )}
            >
                {isConnected && !lowUserBalance && !isWrongNetwork ? (
                    <div className="flex justify-center bg-antiFlashWhite p-4 text-center">
                        {isUserPhaseNftBalanceFetching ? (
                            <>
                                Checking, please wait <LoaderDots />
                            </>
                        ) : (
                            <InfoMessage
                                isPrepareFetching={isPrepareFetching}
                                prepareError={prepareError}
                                isWriteLoading={isWriteLoading}
                                isReceiptLoading={isReceiptLoading}
                                isClaimedMetadataFetching={
                                    isClaimedMetadataFetching
                                }
                                transactionError={transactionError}
                                userPhaseNftBalance={userPhaseNftBalance}
                                limitPerWallet={limitPerWallet}
                                mintableQuantity={mintableQuantity}
                            />
                        )}
                    </div>
                ) : null}
                <div className="mb-[10rem] flex bg-linen">
                    <div className="flex-column flex basis-2/3 flex-col items-center justify-center p-10 text-center">
                        <InputNft
                            value={inputValue}
                            setValue={setInputValue}
                            mintableQuantity={mintableQuantity}
                            isDisabled={
                                !isConnected || lowUserBalance || isWrongNetwork
                            }
                        />
                        <p className="mb-9 text-sm">
                            {isConnected ? (
                                <>
                                    {isUserPhaseNftBalanceFetching ? (
                                        <>-</>
                                    ) : (
                                        <StatusMessage
                                            userPhaseNftBalance={
                                                userPhaseNftBalance
                                            }
                                            limitPerWallet={limitPerWallet}
                                            mintableQuantity={mintableQuantity}
                                        />
                                    )}
                                </>
                            ) : null}
                        </p>
                        <Button
                            className="min-w-[8rem]"
                            type="button"
                            disabled={
                                !inputValue ||
                                isWrongNetwork ||
                                !mintableQuantity ||
                                lowUserBalance ||
                                isClaimedMetadataFetching ||
                                isPrepareFetching ||
                                isWriteLoading ||
                                isReceiptLoading
                            }
                            onClick={() => {
                                mintNFT()
                            }}
                        >
                            MINT
                        </Button>
                    </div>
                    <div className="relative grow p-10 text-center">
                        <div className="triangle absolute left-1/2 top-0 -translate-x-1/2 transform border-t-antiFlashWhite"></div>
                        <Image
                            width="100"
                            height="50"
                            src={
                                mintedMetadata?.image || '/NFT-placeholder.png'
                            }
                            alt="cat silhouette with question sign inside"
                        />
                    </div>
                </div>
            </div>
            <AngledContentStripe color="blue">
                <div className="mx-auto flex max-w-[820px] px-5 py-4">
                    <p className="text-md max-w-auto basis shrink grow pt-2">
                        NFTs are like digital collector&apos;s items, and by
                        claiming them, you embrace the fusion of history and
                        innovation, where Julie de Graag&apos;s artistic
                        ingenuity meets the blockchain&apos;s immutability.
                        <br />
                        <br />
                        <span className="text-lg">
                            The{' '}
                            <span className="font-bold">
                                Sitting Cats
                                <sup>NFT</sup>
                            </span>{' '}
                            welcomes you to explore, own, and be a part of this
                            artistic adventure.
                        </span>
                    </p>
                    <figure className="ml-4 h-full w-6 min-w-[120px] shrink-0 grow">
                        <Image
                            className="relative top-[-1.5rem]"
                            alt="paw"
                            width="120"
                            height="100"
                            src="/paw-light-blue.png"
                        />
                    </figure>
                </div>
            </AngledContentStripe>
        </section>
    )
}

export default SectionMint

// two tokens minted:

// {address
// :
// "0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014"
// blockHash
// :
// "0x09e7926138968f21cc5425d1ed9a8a33c4a9994b5e3c8a8f4c5f4bb438a5062b"
// blockNumber
// :
// 38751829n
// data
// :
// "0x"
// logIndex
// :
// 69
// removed
// :
// false
// topics
// :
// (4) ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x00000000000000000000000054c28209aa8893bb7b403d91b24ca48eef262788', '0x0000000000000000000000000000000000000000000000000000000000000012']
// transactionHash
// :
// "0xbca7d998901fa49bc4d5e1a9f7508f8dc182e161dc41629b9ac70b7544db6d78"
// transactionIndex
// :
// 5}
