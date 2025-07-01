import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from '../lib/mi-ui/skeleton/skeleton';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'text', 'avatar', 'button'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    width: '200px',
    height: '20px',
  },
};

export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium mb-2">Default</p>
          <mi-skeleton variant="default" width="200px" height="20px"></mi-skeleton>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Text</p>
          <mi-skeleton variant="text" width="150px"></mi-skeleton>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Avatar</p>
          <mi-skeleton variant="avatar" width="40px" height="40px"></mi-skeleton>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Button</p>
          <mi-skeleton variant="button" width="100px"></mi-skeleton>
        </div>
      </div>
    `,
  }),
};

export const Card: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div class="flex items-center space-x-4 mb-4">
          <mi-skeleton variant="avatar" width="40px" height="40px"></mi-skeleton>
          <div class="space-y-2 flex-1">
            <mi-skeleton variant="text" width="120px"></mi-skeleton>
            <mi-skeleton variant="text" width="80px"></mi-skeleton>
          </div>
        </div>
        <div class="space-y-2">
          <mi-skeleton variant="text" width="100%"></mi-skeleton>
          <mi-skeleton variant="text" width="100%"></mi-skeleton>
          <mi-skeleton variant="text" width="60%"></mi-skeleton>
        </div>
        <div class="mt-4 flex justify-between">
          <mi-skeleton variant="button" width="80px"></mi-skeleton>
          <mi-skeleton variant="button" width="60px"></mi-skeleton>
        </div>
      </div>
    `,
  }),
};

export const Table: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-full">
        <div class="space-y-3">
          <div class="flex space-x-4">
            <mi-skeleton variant="text" width="100px"></mi-skeleton>
            <mi-skeleton variant="text" width="150px"></mi-skeleton>
            <mi-skeleton variant="text" width="80px"></mi-skeleton>
            <mi-skeleton variant="text" width="120px"></mi-skeleton>
          </div>
          <div class="flex space-x-4">
            <mi-skeleton variant="text" width="100px"></mi-skeleton>
            <mi-skeleton variant="text" width="150px"></mi-skeleton>
            <mi-skeleton variant="text" width="80px"></mi-skeleton>
            <mi-skeleton variant="text" width="120px"></mi-skeleton>
          </div>
          <div class="flex space-x-4">
            <mi-skeleton variant="text" width="100px"></mi-skeleton>
            <mi-skeleton variant="text" width="150px"></mi-skeleton>
            <mi-skeleton variant="text" width="80px"></mi-skeleton>
            <mi-skeleton variant="text" width="120px"></mi-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};
