import Image from 'next/image'
import React from 'react'
import AngledContentStripe from '../../shared/AngledContentStripe/AngledContentStripe'

const SectionHero = () => {
    return (
        <div className="z-1 relative m-auto">
            <div className="flex min-h-[calc(100vh-13rem)] justify-center bg-robinEggBlue bg-[url('/paws-pattern.png')] bg-[size:35%] bg-repeat"></div>
            <AngledContentStripe color="yellow">
                <div className="mx-auto flex max-w-[820px] px-5 py-4">
                    <figure className="mr-4 h-full w-6 min-w-[130px] shrink-0 grow">
                        <Image
                            className="absolute -top-[5.5rem]"
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
                        The Sitting Cats<sup>NFT</sup> collection is directly
                        inspired by Julie de Graag&apos;s cat drawings,
                        specifically her work{' '}
                        <a
                            target="_blank"
                            href="https://commons.wikimedia.org/wiki/File:Zittende_kat,_RP-P-1935-892.jpg"
                        >
                            &quot;Zittende kat&quot; (Sitting Cat)
                        </a>
                        .
                    </p>
                </div>
            </AngledContentStripe>
        </div>
    )
}

export default SectionHero
