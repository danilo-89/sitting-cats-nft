import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { fromHex, parseEther, parseUnits } from 'viem'
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
import WrongNetworkNotice from './WrongNetworkNotice'
import NotConnectedNotice from './NotConnectedNotice'
import InfoMessageWrapper from './InfoMessageWrapper'
import ClaimedNFT from './ClaimedNFT'

// Types
import { GetNfts, IMintedMetadata } from '@/types/getNftsAPI'

const pricePerNFT = +process.env.NEXT_PUBLIC_NFT_PRICE! as unknown as number

const SectionMint = () => {
    const { address, isConnected } = useAccount()
    const queryClient = useQueryClient()
    const { isWrongNetwork } = useIsWrongNetwork()

    const {
        limitPerWallet,
        totalMinted,
        isTotalMintedFetching,
        refetchTotalMinted,
    } = useContractContext()
    const {
        userBalance,
        userPhaseNftBalance,
        isUserPhaseNftBalanceFetching,
        isUserBalanceFetching,
        refetchUserTotalNftBalance,
        refetchUserPhaseNftBalance,
        refetchUserBalance,
    } = useUserContext()

    const [showClaimedNFTModal, setShowClaimedNFTModal] = useState(false)
    const [showNFTGalleryModal, setShowNFTGalleryModal] = useState(false)
    const [inputValue, setInputValue] = useState('1')
    const [quantity, setQuantity] = useState(inputValue)
    const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
    const [mintedNFTId, setMintedNFTId] = useState<number | undefined>(
        undefined
    )
    const [mintedMetadata, setMintedMetadata] = useState<
        IMintedMetadata | null | undefined
    >(null)

    const lowUserBalance =
        typeof userBalance?.formatted === 'string' &&
        +userBalance.formatted < 0.001

    const totalPrice = quantity ? pricePerNFT * +quantity : undefined
    const isEnoughBalanceToMint =
        typeof userBalance?.formatted === 'string' && totalPrice
            ? +userBalance.formatted >= totalPrice
            : true

    const mintableQuantity =
        limitPerWallet && typeof userPhaseNftBalance === 'number'
            ? limitPerWallet - userPhaseNftBalance
            : undefined

    const {
        isLoading: isTransactionLoading,
        write,
        isError: isTransactionError,
        error: transactionError,
        reset,
    } = useContractWrite({
        ...contractConfig,
        enabled: false,
        functionName: 'claim',
        args: [
            address!,
            parseUnits(quantity, 0),
            '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            parseEther(pricePerNFT.toString()),
            {
                proof: [],
                quantityLimitPerWallet: parseUnits(
                    process.env.NEXT_PUBLIC_LIMIT_PER_WALLET!,
                    0
                ),
                pricePerToken: parseEther(pricePerNFT.toString()),
                currency: '0x0000000000000000000000000000000000000000',
            },
            '0x',
        ],
        value: parseEther((pricePerNFT * +quantity).toString()),
        onSuccess(data) {
            setHash(data?.hash)
        },
    })

    const {
        data: receiptData,
        isError: isReceiptError,
        isLoading: isReceiptLoading,
    } = useWaitForTransaction({
        hash,
        onSettled(data) {
            setHash(undefined)

            const logsWithId = data?.logs?.find((item) => item.data === '0x')

            setMintedNFTId(
                logsWithId?.topics?.[3]
                    ? fromHex(logsWithId?.topics?.[3]!, 'number')
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
        remove,
    } = useQuery({
        enabled: false,
        queryKey: ['nftURILink', mintedNFTId],
        queryFn: () => getNFTMetadata(mintedNFTId),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    const mintNFT = async () => {
        remove()
        reset()
        setMintedMetadata(null)
        write?.()
    }

    const claimedNFTModalData = useMemo(
        () => ({
            metadata: mintedMetadata,
            id: { tokenId: mintedMetadata?.id },
        }),
        [mintedMetadata]
    )

    useEffect(() => {
        setQuantity(inputValue)
    }, [inputValue])

    // fetch metadata for minted NFT
    useEffect(() => {
        if (mintedNFTId) {
            fetchClaimedMetadata()
        }
    }, [mintedNFTId, fetchClaimedMetadata])

    useEffect(() => {
        if (
            claimedMetadataStatus === 'success' ||
            claimedMetadataStatus === 'error'
        ) {
            setMintedNFTId(undefined)
            refetchTotalMinted()
            refetchUserTotalNftBalance()
            refetchUserPhaseNftBalance()
            refetchUserBalance()
            setInputValue('1')
            setMintedMetadata({
                ...claimedMetadata?.data?.metadata,
                id: claimedMetadata?.data?.id?.tokenId,
                quantity,
            })

            if (+quantity > 1) {
                queryClient.invalidateQueries({
                    queryKey: ['userNfts', address],
                    refetchType: 'none',
                })
            } else if (+quantity === 1) {
                queryClient.setQueryData(
                    ['userNfts', address],
                    (oldData: null | undefined | GetNfts) => {
                        if (oldData?.data) {
                            return {
                                ...oldData,
                                data: {
                                    ...oldData.data,
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
        quantity,
        queryClient,
        address,
        refetchTotalMinted,
        refetchUserTotalNftBalance,
        refetchUserPhaseNftBalance,
        refetchUserBalance,
    ])

    useEffect(() => {
        setInputValue('1')
        setMintedNFTId(undefined)
        setMintedMetadata(null)
    }, [address])

    return (
        <section className="pt-[7rem] md:pt-[10rem]">
            <Title title="Mint now">
                Claiming an NFT is like putting a digital trophy on your virtual
                shelf.{' '}
                <span className="">
                    Total claimed NFTs:{' '}
                    {isTotalMintedFetching ? <LoaderDots /> : totalMinted}
                </span>
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
                            userPhaseNftBalance === undefined ||
                            isUserPhaseNftBalanceFetching ||
                            isReceiptLoading
                        }
                        isMetadataLoading={isClaimedMetadataFetching}
                        isError={
                            isTransactionError ||
                            isClaimedMetadataError ||
                            !isEnoughBalanceToMint
                        }
                        isActionRequired={isTransactionLoading}
                        isSuccess={
                            !!mintedMetadata && !isUserPhaseNftBalanceFetching
                        }
                    >
                        <InfoMessage
                            isUserPhaseNftBalanceFetching={
                                userPhaseNftBalance === undefined ||
                                isUserPhaseNftBalanceFetching
                            }
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
                            isEnoughBalanceToMint={isEnoughBalanceToMint}
                        />
                    </InfoMessageWrapper>
                ) : null}
                <div
                    className="mb-[10rem] flex flex-col bg-linen md:flex-row"
                    data-cy="container-minting"
                >
                    <div className="flex-column order-last flex basis-2/3 flex-col items-center justify-center p-10 text-center md:order-first">
                        <InputNft
                            value={inputValue}
                            setValue={setInputValue}
                            mintableQuantity={mintableQuantity}
                            isDisabled={
                                !isConnected ||
                                lowUserBalance ||
                                isWrongNetwork ||
                                userPhaseNftBalance === undefined ||
                                isUserPhaseNftBalanceFetching ||
                                isTransactionLoading ||
                                isReceiptLoading
                            }
                        />
                        <p className="mb-9 text-sm">
                            {isConnected ? (
                                <>
                                    {userPhaseNftBalance === undefined ||
                                    isUserPhaseNftBalanceFetching ? (
                                        <>-</>
                                    ) : (
                                        <StatusMessage
                                            userPhaseNftBalance={
                                                userPhaseNftBalance
                                            }
                                            limitPerWallet={limitPerWallet}
                                            totalPrice={totalPrice}
                                            isEnoughBalanceToMint={
                                                isEnoughBalanceToMint
                                            }
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
                                isUserBalanceFetching ||
                                isTransactionLoading ||
                                isReceiptLoading ||
                                !isEnoughBalanceToMint
                            }
                            onClick={() => {
                                mintNFT()
                            }}
                            data-cy="btn-mint"
                        >
                            MINT
                        </Button>
                    </div>

                    {/* cat avatar image */}
                    <div className="relative grow pt-10 text-center md:p-10 ">
                        <div className="triangle absolute left-1/2 top-0 -translate-x-1/2 transform border-t-antiFlashWhite"></div>
                        <button
                            type="button"
                            className={clsx(
                                'relative h-[10rem] md:h-[13.5rem]',
                                !mintedMetadata && 'cursor-default'
                            )}
                            disabled={!mintedMetadata}
                            onClick={() => setShowClaimedNFTModal(true)}
                            data-cy="btn-claimed-nft"
                            data-nft-id={mintedMetadata?.id}
                        >
                            {/* {!mintedMetadata ? (
                                <span className="absolute right-[3rem] top-3/4 z-[0] flex -translate-x-[-100%] -translate-y-1/2 flex-col bg-silver text-xs text-wenge">
                                    <span className="ml-4 whitespace-nowrap px-3 py-1">
                                        click me
                                    </span>
                                </span>
                            ) : null} */}
                            <Image
                                className="relative z-[1] h-full w-full"
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
                <div className="mx-auto flex max-w-[820px] flex-col px-5 py-4 xs:flex-row">
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
                    <figure className="sx:mr-[unset] mx-auto mt-4 h-auto w-6 min-w-[120px] shrink-0 grow xs:ml-4 xs:h-full md:mt-0">
                        <Image
                            className="relative xs:top-[-1.5rem]"
                            alt="paw"
                            width="120"
                            height="133"
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
