import type { Meta, StoryObj } from '@storybook/react'

// Components
import LoaderSquare from '../components/common/LoaderSquare'

const meta = {
    title: 'Loaders/LoaderSquare',
    component: LoaderSquare,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof LoaderSquare>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
