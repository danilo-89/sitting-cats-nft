import AngledContentStripe from '@/components/AngledContentStripe/AngledContentStripe'
import Button from '@/components/Button/Button'
import InputNft from '@/components/InputNft'
import Title from '@/components/Title/Title'
import Image from 'next/image'

const SectionMint = () => {
    return (
        <section>
            <Title title="Mint now">
                Lorem Ipsum is simply dummy text of the printy. Minted 21 of
                1000.
            </Title>
            <div className="mx-auto mb-[10rem] flex max-w-[640px] bg-antiFlashWhite">
                <div className="flex-column flex-row items-center p-10 text-center">
                    <InputNft />
                    <p className="mb-9 text-sm">
                        You’ve haven’t reached your minting limit.
                    </p>
                    <Button>MINT</Button>
                </div>
                <div className="p-10 text-center">
                    <Image
                        width="100"
                        height="50"
                        src="/NFT-placeholder.png"
                        alt="cat silhouette with question sign inside"
                    />
                </div>
            </div>
            <AngledContentStripe color="blue">
                <div className="mx-auto flex max-w-[820px] px-5 py-4">
                    <p className="text-md max-w-auto basis shrink grow pt-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only ...
                    </p>
                    <figure className="ml-4 h-full w-6 min-w-[120px] shrink-0 grow">
                        <Image
                            className="absolute -top-24"
                            alt="cat"
                            width="120"
                            height="100"
                            src="/hero-cat.png"
                        />
                    </figure>
                </div>
            </AngledContentStripe>
        </section>
    )
}

export default SectionMint
