import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

// Components
import { Button, NftCard } from '@/components'

// Sample data
import { nftCardData } from './sampleData'

const meta = {
    title: 'NftCard',
    component: NftCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        data: nftCardData,
    },
} satisfies Meta<typeof NftCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TestFlip: Story = {
    args: {},
    decorators: [
        (Story) => {
            const [args, updateArgs] = useArgs()

            return (
                <>
                    <div className="flex justify-center py-5">
                        <Button
                            type="button"
                            variation="transparent"
                            onClick={() =>
                                updateArgs({
                                    data: { ...nftCardData },
                                })
                            }
                        >
                            flip it
                        </Button>
                    </div>
                    <Story
                        args={{
                            ...args,
                        }}
                    />
                </>
            )
        },
    ],
}
