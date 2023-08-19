import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { fromHex, parseEther, parseUnits } from 'viem'
import debounce from 'lodash.debounce'
import clsx from 'clsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// Contract
import { contractConfig } from '@/contract/config'

// Utilities
import { ipfsToHttps } from '@/utils'

// Requests
import { getNFTMetadata } from '@/requests'

// Contexts
import { useContractContext } from '@/context/ContractContext'
import { useUserContext } from '@/context/UserContext'

// Hooks
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

// Components
import AngledContentStripe from '@/components/shared/AngledContentStripe/AngledContentStripe'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button/Button'
import InputNft from '@/components/sections/SectionMint/InputNft'
import Title from '@/components/common/Title/Title'
import Faucet from '@/components/sections/SectionMint/Faucet/Faucet'
import LoaderDots from '@/components/common/LoaderDots/LoaderDots'
import NFTGalleryModal from '@/components/NFTGallery/Modal'
import StatusMessage from './StatusMessage'
import InfoMessage from './InfoMessage'
import WrongNetworkNotice from './WrongNetworkNotice/WrongNetworkNotice'
import NotConnectedNotice from './NotConnectedNotice/NotConnectedNotice'
import InfoMessageWrapper from './InfoMessageWrapper'
import ClaimedNFT from './ClaimedNFT'

const SectionMint = () => {
    const { address, isConnected } = useAccount()
    const queryClient = useQueryClient()
    const { userBalance, isUserBalanceFetching, refetchUserBalance } =
        useUserContext()

    const [showClaimedNFTModal, setShowClaimedNFTModal] = useState(false)
    const [showNFTGalleryModal, setShowNFTGalleryModal] = useState(false)

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
        isError: isPrepareError,
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
        isLoading: isTransactionLoading,
        write,
        isError: isTransactionError,
        data: transactionData,
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
        isError: isReceiptError,
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
        isError: isClaimedMetadataError,
        data: claimedMetadata,
        refetch: fetchClaimedMetadata,
        error: claimedMetadataError,
        isSuccess: isClaimedMetadataSuccess,
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
        { isTransactionLoading },
        { isReceiptLoading }
    )

    const claimedNFTModalData = useMemo(
        () => ({
            metadata: mintedMetadata,
            id: { tokenId: mintedMetadata?.id },
        }),
        [mintedMetadata]
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
            setMintedMetadata({
                ...claimedMetadata?.data?.metadata,
                id: claimedMetadata?.data?.id?.tokenId,
                quantity,
            })

            console.log('CHECK this', { claimedMetadata })

            if (+quantity > 1) {
                queryClient.invalidateQueries({
                    queryKey: ['userNfts', address],
                    refetchType: 'none',
                })
            } else if (+quantity === 1) {
                queryClient.setQueryData(
                    ['userNfts', address],
                    (oldData: any) => {
                        if (oldData?.data) {
                            return {
                                ...oldData,
                                data: {
                                    ownedNfts: [
                                        ...oldData.data.ownedNfts,
                                        { ...claimedMetadata?.data },
                                    ],
                                },
                            }
                        }
                    }
                )
            }
        }
    }, [
        claimedMetadataStatus,
        claimedMetadata,
        refetchTotalMinted,
        refetchUserTotalNftBalance,
        refetchUserPhaseNftBalance,
        quantity,
        queryClient,
        address,
    ])

    useEffect(() => {
        setInputValue('1')
        setMintedNFTId(undefined)
        setMintedMetadata(null)
    }, [address])

    console.log({ transactionData })
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

            {/* Notices */}
            {!isConnected ? <NotConnectedNotice /> : null}
            {isConnected && lowUserBalance && !isWrongNetwork ? (
                <Faucet />
            ) : null}
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
                    <InfoMessageWrapper
                        isLoading={
                            isUserPhaseNftBalanceFetching ||
                            isPrepareFetching ||
                            isReceiptLoading
                        }
                        isMetadataLoading={isClaimedMetadataFetching}
                        isError={
                            isPrepareError ||
                            isTransactionError ||
                            isClaimedMetadataError
                        }
                        isActionRequired={isTransactionLoading}
                        isSuccess={
                            mintedMetadata && !isUserPhaseNftBalanceFetching
                        }
                    >
                        <InfoMessage
                            isUserPhaseNftBalanceFetching={
                                isUserPhaseNftBalanceFetching
                            }
                            isPrepareFetching={isPrepareFetching}
                            prepareError={prepareError}
                            claimedMetadataError={claimedMetadataError}
                            isWriteLoading={isTransactionLoading}
                            isReceiptLoading={isReceiptLoading}
                            isClaimedMetadataFetching={
                                isClaimedMetadataFetching
                            }
                            transactionError={transactionError}
                            mintableQuantity={mintableQuantity}
                            mintedMetadata={mintedMetadata}
                            mintedQuantity={
                                claimedNFTModalData?.metadata?.quantity
                            }
                        />
                    </InfoMessageWrapper>
                ) : null}
                <div className="mb-[10rem] flex bg-linen">
                    <div className="flex-column flex basis-2/3 flex-col items-center justify-center p-10 text-center">
                        <InputNft
                            value={inputValue}
                            setValue={setInputValue}
                            mintableQuantity={mintableQuantity}
                            isDisabled={
                                !isConnected ||
                                lowUserBalance ||
                                isWrongNetwork ||
                                isUserPhaseNftBalanceFetching ||
                                isPrepareFetching ||
                                isTransactionLoading ||
                                isReceiptLoading
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
                                isTransactionLoading ||
                                isReceiptLoading
                            }
                            onClick={() => {
                                mintNFT()
                            }}
                        >
                            MINT
                        </Button>
                    </div>

                    {/* cat avatar image */}
                    <div className="relative grow p-10 text-center">
                        <div className="triangle absolute left-1/2 top-0 -translate-x-1/2 transform border-t-antiFlashWhite"></div>
                        <button
                            type="button"
                            className={clsx(
                                'relative',
                                !mintedMetadata && 'cursor-default'
                            )}
                            disabled={!mintedMetadata}
                            onClick={() => setShowClaimedNFTModal(true)}
                        >
                            {/* {!mintedMetadata ? (
                                <span className="absolute right-[3rem] top-3/4 z-[0] flex -translate-x-[-100%] -translate-y-1/2 flex-col bg-silver text-xs text-wenge">
                                    <span className="ml-4 whitespace-nowrap px-3 py-1">
                                        click me
                                    </span>
                                </span>
                            ) : null} */}
                            <Image
                                className="relative z-[1]"
                                width="100"
                                height="50"
                                src={
                                    mintedMetadata?.image
                                        ? ipfsToHttps(mintedMetadata?.image)
                                        : undefined || '/NFT-placeholder.png'
                                }
                                alt={
                                    mintedMetadata?.name
                                        ? `${mintedMetadata?.name} NFT cat`
                                        : undefined ||
                                          'cat silhouette with question sign inside'
                                }
                            />
                        </button>
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

            {/* Modals */}
            {showClaimedNFTModal ? (
                <Modal setIsOpen={setShowClaimedNFTModal}>
                    <ClaimedNFT
                        quantity={mintedMetadata?.quantity}
                        setShowModal={setShowClaimedNFTModal}
                        setShowNFTGalleryModal={setShowNFTGalleryModal}
                        data={claimedNFTModalData}
                    />
                </Modal>
            ) : null}
            <NFTGalleryModal
                isOpen={showNFTGalleryModal}
                setIsOpen={setShowNFTGalleryModal}
            />
        </section>
    )
}

export default SectionMint
