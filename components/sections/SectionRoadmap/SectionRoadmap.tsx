import Image from 'next/image'
import clsx from 'clsx'

// Components
import Title from '@/components/common/Title'

import arrowExternalIcon from '@/assets/arrow-external.svg'

const phasesConfig = [
    {
        name: 'Phase 1',
        description: 'Launch and Growth',
        src: '/rocket.png',
        alt: 'rocket illustration',
    },
    {
        name: 'Phase 2',
        description: '',
        src: '/question-mark.png',
        alt: 'question mark illustration',
    },
    {
        name: 'Phase 3',
        description: 'PROFIT!',
        src: '/coins.png',
        alt: 'coins illustration',
    },
]

const SectionRoadmap = () => {
    return (
        <section className="bg-antiFlashWhite pb-10 pt-[10rem]">
            <Title title="Roadmap">
                Milestones and strategies to navigate the exciting world of
                non-fungible tokens
            </Title>
            <div className="mx-auto mb-4 flex max-w-[640px] flex-col">
                <div className="mb-10 bg-silver p-8">
                    <span className="font-bold">Note:</span> If you haven&apos;t
                    fully understood the detailed roadmap below, please watch
                    the{' '}
                    <a
                        className="underline-offset-2 hover:underline"
                        href="https://www.youtube.com/watch?v=a5ih_TQWqCA"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        explanatory video
                        <sup className="ml-[0.1rem]">
                            <Image
                                className="inline-block w-[0.65rem] p-[0.05rem] text-moonstone"
                                src={arrowExternalIcon}
                                alt="icon of arrow in box"
                            />
                        </sup>
                    </a>{' '}
                    to gain a better understanding of this business model.
                </div>

                {phasesConfig.map((item, idx) => {
                    const isIndexOdd = idx % 2 !== 0

                    return (
                        <div
                            key={item.name}
                            className="mb-12 flex w-full justify-between bg-linen p-10"
                        >
                            <div
                                className={clsx(
                                    'flex basis-1/2 justify-center',
                                    isIndexOdd && 'order-last'
                                )}
                            >
                                <Image
                                    className="h-[10rem] object-contain"
                                    height={145}
                                    width={145}
                                    alt={item.alt}
                                    src={item.src}
                                />
                            </div>
                            <div
                                className={clsx(
                                    'flex basis-1/2 flex-col justify-center',
                                    isIndexOdd && 'items-center'
                                )}
                            >
                                <h4 className="mb-2 text-2xl font-bold">
                                    {item.name}
                                </h4>
                                <p className="">{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionRoadmap
