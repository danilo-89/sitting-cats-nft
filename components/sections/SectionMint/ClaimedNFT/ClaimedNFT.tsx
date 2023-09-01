import { Dispatch, SetStateAction } from 'react'

// Components
import NftCard from '@/components/NftCard'
import Button from '@/components/common/Button'

// Types
import { INFT } from '@/types/getNftsAPI'

interface IProps {
    setShowModal: Dispatch<SetStateAction<boolean>> | (() => void)
    setShowNFTGalleryModal: Dispatch<SetStateAction<boolean>> | (() => void)
    quantity: string | undefined
    data: Partial<INFT> | null | undefined
}

const ClaimedNFT = ({
    setShowModal,
    setShowNFTGalleryModal,
    quantity,
    data,
}: IProps) => {
    return (
        <div
            className="w-[22rem] max-w-[100%] bg-linen"
            data-cy="container-modal-claimed"
        >
            <div className="flex items-center justify-between bg-linen px-3 pb-2 pt-3">
                <h3 className="text-lg font-bold">Claimed NFT </h3>
                <Button
                    type="button"
                    size="sm"
                    variation="transparent"
                    onClick={() => setShowModal(false)}
                    data-cy="btn-modal-close"
                    aria-label="close modal"
                >
                    x
                </Button>
            </div>
            <span className="mx-2 block border-b border-dashed border-wenge/40 pt-1" />
            <div className="flex flex-col items-center px-4 pb-7 pt-5">
                <span className="mb-6 max-w-[100%] text-xsP">
                    Congratulations! Behold your freshly minted NFT.
                </span>
                <NftCard data={data} />
            </div>
            <div className="flex bg-white">
                <span className="mb-6 mt-6 max-w-[100%] px-4 text-xsP">
                    {quantity && +quantity > 1 ? (
                        <>
                            <span className="font-bold">
                                1 of {quantity} freshly minted NFTs shown.
                            </span>
                            <br />
                        </>
                    ) : null}
                    To view all the NFTs you&apos;ve collected so far, visit
                    your personalized NFT gallery.
                </span>
                <Button
                    type="button"
                    onClick={() => {
                        setShowModal(false)
                        setShowNFTGalleryModal(true)
                    }}
                    insideClassName="py-3 px-4"
                    size="sm"
                    data-cy="btn-gallery-open"
                >
                    NFT Gallery
                </Button>
            </div>
        </div>
    )
}

export default ClaimedNFT
