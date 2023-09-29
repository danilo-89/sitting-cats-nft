import Image from 'next/image'

// Assets
import arrowExternalIcon from '@/assets/arrow-external.svg'

// Hooks
import useIsMounted from '@/hooks/useIsMounted'
import useIsWrongNetwork from '@/hooks/useIsWrongNetwork'

// Data
import { contractInfoLabelsData } from './data'

const Footer = () => {
    const isMounted = useIsMounted()
    const { preferredNetwork } = useIsWrongNetwork()

    const nativeCurrency = isMounted
        ? preferredNetwork?.nativeCurrency?.symbol
        : ''

    return (
        <footer className="max-w-full overflow-x-hidden bg-linen">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
                {/* smart contract info */}
                <div className="basis-1/2">
                    <div className="border bg-white p-2">
                        <h4 className="mb-1 text-2xl font-bold">
                            Smart Contract Info
                        </h4>
                        <span className="mb-[0.8rem] block border-b border-wenge/5"></span>
                        <p className="flex justify-between py-[0.1rem] text-xs font-bold">
                            <span className="inline-block pr-4">
                                SittingCats <sup>NFT</sup>
                            </span>
                            <span>2023</span>
                        </p>
                        <span className="mb-[0.1rem] block border-b-4 border-wenge pt-[0.2rem]" />
                        <ul className="text-xs">
                            {contractInfoLabelsData.map((item) => (
                                <li
                                    key={item.name}
                                    className="flex justify-between pt-[0.1rem] [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-wenge [&:not(:last-of-type)]:pb-[0.1rem]"
                                >
                                    <span className="inline-block pr-4">
                                        {item.name}
                                    </span>
                                    {item.href ? (
                                        <a
                                            className="inline-block"
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="inline-block">
                                            {item.value}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <span className="mb-1 block border-b-4 border-wenge pt-1"></span>
                        <p className="text-[0.55rem]">
                            *Having enough {nativeCurrency || 'wallet ballance'}{' '}
                            ensures you can claim NFTs and cover the transaction
                            fees.
                        </p>
                    </div>
                </div>

                {/* contact */}
                <div className="flex h-auto basis-1/2 flex-col pb-2 text-sm">
                    <div className="mb-2 flex flex-col md:flex-row">
                        <div className="mr-2 flex flex-col pt-2">
                            <div>
                                <h5 className="inline font-bold">Contact: </h5>
                                <p className="inline">
                                    whether you have inquiries or employment
                                    opportunities to discuss, feel free to get
                                    in touch. You can visit link or scan this
                                    qr-code to go to my linkedin profile.
                                </p>
                            </div>
                            <p className="mt-auto pt-2 font-bold">
                                <a
                                    className="mb-1 inline-block underline-offset-2 hover:underline"
                                    href="https://www.linkedin.com/in/danilo-bozinovic/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        className="mr-[0.2rem] inline-block w-[0.9rem] pb-[0.2rem] text-moonstone"
                                        src={arrowExternalIcon}
                                        alt="icon of arrow in box"
                                    />
                                    linkedin
                                </a>
                                <br />
                                <a
                                    className="underline-offset-2 hover:underline"
                                    href="https://github.com/danilo-89"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        className="mr-[0.2rem] inline-block w-[0.9rem] pb-[0.2rem] text-moonstone"
                                        src={arrowExternalIcon}
                                        alt="icon of arrow in box"
                                    />
                                    github
                                </a>
                            </p>
                        </div>

                        <Image
                            className="mx-auto min-w-0 flex-shrink-0 flex-grow basis-auto self-baseline"
                            src="/qr-code.png"
                            width="125"
                            height="125"
                            alt="linkedin profile qrcode"
                        />
                    </div>
                    <p className="mt-auto">
                        My friend and colleague was also actively involved in
                        testing this project. Check it out here:{' '}
                        <a
                            href="https://github.com/markomilenkovic546/sitting-cats-nft-test-automation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold underline-offset-2 hover:underline"
                        >
                            sitting cats nft test automation{' '}
                            <Image
                                className="mr-[0.2rem] inline-block w-[0.9rem] pb-[0.3rem] text-moonstone"
                                src={arrowExternalIcon}
                                alt="icon of arrow in box"
                            />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
