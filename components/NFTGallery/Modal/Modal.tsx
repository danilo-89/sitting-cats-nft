import type { Dispatch, SetStateAction } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

import Image from 'next/image'

// Assets
import arrowExternalIcon from '@/assets/arrow-external.svg'

// Hooks
import { useIsWrongNetwork } from '@/hooks'

// Components
import { Button, Faucet, Modal, NFTGallery } from '@/components'

// Contexts
import { useUserContext } from '@/context'

interface IProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

const faucets = process.env.NEXT_PUBLIC_FAUCET?.split(',')

const NFTGalleryModal = ({ isOpen, setIsOpen }: IProps) => {
    const { isConnected } = useAccount()
    const { isWrongNetwork } = useIsWrongNetwork()
    const { disconnect } = useDisconnect()
    const { userBalance } = useUserContext()

    if (isOpen && isConnected && !isWrongNetwork) {
        return (
            <Modal setIsOpen={setIsOpen}>
                <NFTGallery setIsOpen={setIsOpen} />
                <div className="flex flex-col items-center justify-end gap-4 bg-white p-6 sm:flex-row">
                    <div className="flex flex-shrink-0 items-center whitespace-nowrap sm:mr-auto">
                        <span className="mr-2 text-sm font-bold">
                            <span className="font-normal">Balance: </span>
                            {(+(userBalance?.formatted || 0)).toFixed(4)}{' '}
                            {userBalance?.symbol}
                        </span>
                        <div className="flex whitespace-nowrap bg-silver/30 px-2 py-1">
                            <span className="mr-2 text-xs">Get more →</span>
                            <div className="flex whitespace-nowrap text-xs text-moonstone xs:text-center">
                                {faucets?.map((href: string, idx: number) => (
                                    <a
                                        key={href}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mr-2 block font-bold hover:!underline xs:inline-block"
                                    >
                                        <span>
                                            <span>{idx + 1}</span>
                                            <Image
                                                className="ml-[0.3rem] inline-block w-[0.5rem] text-moonstone"
                                                src={arrowExternalIcon}
                                                alt="icon of arrow in box"
                                            />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

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
