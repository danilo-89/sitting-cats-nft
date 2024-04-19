import type { Meta, StoryObj } from '@storybook/react'

// Components
import Title from '../components/common/Title'

const meta = {
    title: 'Title',
    component: Title,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        title: 'Lorem Ipsum',
        children:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt magni repellendus blanditiis iusto. Fugiat, quos.',
    },
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
