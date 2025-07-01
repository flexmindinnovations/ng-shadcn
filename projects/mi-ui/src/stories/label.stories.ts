import type { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from '../lib/mi-ui/label/label';

const meta: Meta<LabelComponent> = {
  title: 'Components/Label',
  component: LabelComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    for: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<LabelComponent>;

export const Default: Story = {
  args: {
    size: 'default',
    for: 'email',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-2">
        <mi-label [for]="for" [size]="size">Email address</mi-label>
        <input id="email" type="email" class="px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your email" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <mi-label size="sm">Small Label</mi-label>
        <mi-label size="default">Default Label</mi-label>
        <mi-label size="lg">Large Label</mi-label>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <form class="flex flex-col gap-4 w-80">
        <div class="flex flex-col gap-2">
          <mi-label for="name">Full Name</mi-label>
          <input id="name" type="text" class="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" placeholder="John Doe" />
        </div>
        <div class="flex flex-col gap-2">
          <mi-label for="email-form">Email Address</mi-label>
          <input id="email-form" type="email" class="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" placeholder="john@example.com" />
        </div>
        <div class="flex items-center gap-2">
          <input id="terms" type="checkbox" class="w-4 h-4" />
          <mi-label for="terms" size="sm">I accept the terms and conditions</mi-label>
        </div>
      </form>
    `,
  }),
};
