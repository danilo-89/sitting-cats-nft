import Image from 'next/image'

// Components
import AngledContentStripe from '@/components/shared/AngledContentStripe'

const SectionMintBottom = () => {
    return (
        <AngledContentStripe color="blue">
            <div className="mx-auto flex max-w-[820px] flex-col px-5 py-4 xs:flex-row">
                <p className="text-md max-w-auto basis shrink grow pt-2">
                    NFTs are like digital collector&apos;s items, and by
                    claiming them, you embrace the fusion of history and
                    innovation, where Julie de Graag&apos;s artistic ingenuity
                    meets the blockchain&apos;s immutability.
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
    )
}

export default SectionMintBottom
