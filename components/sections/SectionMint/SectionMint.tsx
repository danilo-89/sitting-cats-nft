import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { fromHex } from 'viem'
import clsx from 'clsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// Utilities
import { ipfsToHttps } from '@/utils'

// Requests
import { getNFTMetadata } from '@/requests'

// Contexts
import { useContractContext } from '@/context/ContractContext'
import { useUserContext } from '@/context/UserContext'

// Hooks
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'
import useMint from '@/hooks/useMint'

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
    const { state, dispatch, mintNFT } = useMint()

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
    const [mintedNFTClicked, setMintedNFTClicked] = useState(false)

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
        const data = state.receiptData
        if (data?.status === 'success') {
            const logsWithId = data?.logs?.find((item) => item.data === '0x')

            setMintedNFTId(
                logsWithId?.topics?.[3]
                    ? fromHex(logsWithId?.topics?.[3]!, 'number')
                    : undefined
            )
        }
    }, [state.receiptData])

    useEffect(() => {
        setInputValue('1')
        setMintedNFTId(undefined)
        setMintedMetadata(null)
        remove()
        dispatch(undefined)
    }, [address, dispatch, remove])

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
                            state.isPrepareLoading ||
                            state.isReceiptLoading
                        }
                        isMetadataLoading={isClaimedMetadataFetching}
                        isError={
                            state.isError ||
                            isClaimedMetadataError ||
                            !isEnoughBalanceToMint
                        }
                        isActionRequired={state.isWriteLoading}
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
                            isPrepareLoading={state.isPrepareLoading}
                            prepareError={state.prepareError}
                            isWriteLoading={state.isWriteLoading}
                            isReceiptLoading={state.isReceiptLoading}
                            receiptError={state.receiptError}
                            isClaimedMetadataFetching={
                                isClaimedMetadataFetching
                            }
                            transactionError={state.writeError}
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
                                state.isLoading
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
                                state.isLoading ||
                                !isEnoughBalanceToMint
                            }
                            onClick={() => {
                                mintNFT(quantity, address)
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
                            onClick={() => {
                                setShowClaimedNFTModal(true)
                                setMintedNFTClicked(true)
                            }}
                            data-cy="btn-claimed-nft"
                            data-nft-id={mintedMetadata?.id}
                        >
                            {mintedMetadata && !mintedNFTClicked ? (
                                <span className="absolute -bottom-2 -left-2 -right-2 -top-2 z-[0] flex flex-col text-xs text-wenge">
                                    <Image
                                        className="absolute bottom-0 right-0 w-[1.25rem] -rotate-[30deg] animate-pulse"
                                        src={'/pointer.png'}
                                        width={20}
                                        height={26}
                                        alt="pointer"
                                        data-cy="img-pointer"
                                    />
                                </span>
                            ) : null}
                            <Image
                                className="relative z-[1] w-[6.755rem]"
                                width="107"
                                height="216"
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
                                data-cy="img-nft-cat"
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
