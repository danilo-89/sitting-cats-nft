import type { Dispatch, SetStateAction } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

// Hooks
import { useIsWrongNetwork } from '@/hooks'

// Components
import { Button, Modal, NFTGallery } from '@/components'

interface IProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

const NFTGalleryModal = ({ isOpen, setIsOpen }: IProps) => {
    const { isConnected } = useAccount()
    const { isWrongNetwork } = useIsWrongNetwork()
    const { disconnect } = useDisconnect()

    if (isOpen && isConnected && !isWrongNetwork) {
        return (
            <Modal setIsOpen={setIsOpen}>
                <NFTGallery setIsOpen={setIsOpen} />
                <div className="flex justify-end bg-white p-6">
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                            disconnect()
                        }}
                        size="sm"
                        type="button"
                        variation="transparent"
                        data-cy="btn-disconnect"
                    >
                        Disconnect
                    </Button>
                </div>
            </Modal>
        )
    }

    return null
}

export default NFTGalleryModal
