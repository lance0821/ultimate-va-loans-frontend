import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import PreApprovalChecklist from './PreApprovalChecklist'

const meta = {
  component: PreApprovalChecklist,
} satisfies Meta<typeof PreApprovalChecklist>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
