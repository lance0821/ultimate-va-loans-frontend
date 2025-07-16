import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { buttonVariants } from './button'

const meta = {
  component: buttonVariants,
} satisfies Meta<typeof buttonVariants>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
