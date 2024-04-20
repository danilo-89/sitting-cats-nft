import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { children: 'Lorem Ipsum' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

// Variations

export const Primary: Story = {}

export const Secondary: Story = {
    args: {
        variation: 'secondary',
    },
}

export const Neutral: Story = {
    args: {
        variation: 'neutral',
    },
}

export const Transparent: Story = {
    args: {
        variation: 'transparent',
    },
}

// Sizes

export const Small: Story = {
    args: {
        size: 'sm',
    },
}

export const Medium: Story = {
    args: {
        size: 'md',
    },
}

export const Large: Story = {
    args: {
        size: 'lg',
    },
}
