import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface IProps {
    children: ReactNode
    preventOverlayClose?: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

const Modal = ({ children, preventOverlayClose, setIsOpen }: IProps) => {
    return (
        <Dialog.Root
            onOpenChange={setIsOpen}
            modal
            open
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.80)]">
                    <Dialog.Content
                        className="mx-auto max-h-full max-w-full overflow-auto rounded bg-white"
                        onInteractOutside={(e) => {
                            if (preventOverlayClose) e.preventDefault()
                        }}
                    >
                        {children}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
