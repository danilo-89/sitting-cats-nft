import { useAccount, useDisconnect } from 'wagmi'

// Hooks
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

// Components
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import NFTGalery from '../NFTGallery'

const NFTGalleryModal = ({ isOpen, setIsOpen }: any) => {
    const { isConnected } = useAccount()
    const { isWrongNetwork } = useIsWrongNetwork()
    const { disconnect } = useDisconnect()

    if (isOpen && isConnected && !isWrongNetwork) {
        return (
            <Modal setIsOpen={setIsOpen}>
                <NFTGalery setIsOpen={setIsOpen} />
                <div className="flex justify-end bg-white p-6">
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                            disconnect()
                        }}
                        size="sm"
                        type="button"
                        variation="transparent"
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
