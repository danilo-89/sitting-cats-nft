import Image from 'next/image'
import React from 'react'
import AngledContentStripe from '../../shared/AngledContentStripe/AngledContentStripe'
import arrowExternalIcon from '@/assets/arrow-external.svg'

const SectionHero = () => {
    return (
        <div className="z-1 relative m-auto">
            <div className="flex h-[calc(100vh-13rem)] min-h-[30rem] justify-center bg-robinEggBlue bg-[url('/paws-pattern.png')] bg-[size:35%] bg-repeat"></div>
            <AngledContentStripe color="yellow">
                <div className="mx-auto flex max-w-[820px] flex-col px-5 py-4 xs:flex-row">
                    <figure className="mx-auto h-[11rem] w-6 min-w-[130px] shrink-0 grow xs:ml-[unset] xs:mr-4 xs:h-full">
                        <Image
                            className="absolute -top-[5.5rem] h-auto w-[130px]"
                            alt="siamese-style cat illustration"
                            width="130"
                            height="100"
                            src="/hero-cat.png"
                        />
                    </figure>
                    <p className="text-md max-w-auto basis shrink grow">
                        Anna Julia &quot;Julie&quot; de Graag, a renowned Dutch
                        watercolourist, printmaker, and painter, contributed
                        significantly to the Art Nouveau movement. Her work has
                        been described as powerful, and as showing a technical
                        mastery.
                        <br />
                        <br />
                        <span className="text-lg">
                            The{' '}
                            <span className="font-bold">
                                Sitting Cats<sup>NFT</sup>
                            </span>{' '}
                            collection is directly inspired by Julie de
                            Graag&apos;s cat drawings, specifically her work{' '}
                            <a
                                target="_blank"
                                href="https://commons.wikimedia.org/wiki/File:Zittende_kat,_RP-P-1935-892.jpg"
                                className="underline-offset-2 hover:underline"
                            >
                                &quot;Zittende kat&quot; (Sitting Cat)
                                <sup className="ml-[0.1rem]">
                                    <Image
                                        className="inline-block w-[0.8rem] p-[0.05rem] text-moonstone"
                                        src={arrowExternalIcon}
                                        alt="icon of arrow in box"
                                    />
                                </sup>
                            </a>
                            .
                        </span>
                    </p>
                </div>
            </AngledContentStripe>
        </div>
    )
}

export default SectionHero
