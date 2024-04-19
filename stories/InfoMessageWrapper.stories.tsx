import type { Meta, StoryObj } from '@storybook/react'

// Components
import InfoMessageWrapper from '@/components/sections/SectionMint/InfoMessageWrapper'

const meta = {
    title: 'InfoMessageWrapper',
    component: InfoMessageWrapper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        isActionRequired: true,
        isError: false,
        isLoading: false,
        isMetadataLoading: false,
        isSuccess: false,
        children:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt magni repellendus blanditiis iusto. Fugiat, quos.',
    },
} satisfies Meta<typeof InfoMessageWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
