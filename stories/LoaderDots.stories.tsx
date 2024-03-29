import type { Meta, StoryObj } from '@storybook/react'

// Components
import LoaderDots from '../components/common/LoaderDots'

const meta = {
    title: 'Loaders/LoaderDots',
    component: LoaderDots,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof LoaderDots>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
