import type { Meta, StoryObj } from '@storybook/angular';
import { SeparatorComponent } from '../lib/mi-ui/separator/separator';

const meta: Meta<SeparatorComponent> = {
  title: 'Components/Separator',
  component: SeparatorComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<SeparatorComponent>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80">
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
          <p class="text-sm text-gray-500">An open-source UI component library.</p>
        </div>
        <mi-separator [orientation]="orientation" class="my-4"></mi-separator>
        <div class="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <mi-separator orientation="vertical"></mi-separator>
          <div>Docs</div>
          <mi-separator orientation="vertical"></mi-separator>
          <div>Source</div>
        </div>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <mi-separator [orientation]="orientation"></mi-separator>
        <div>Docs</div>
        <mi-separator [orientation]="orientation"></mi-separator>
        <div>Source</div>
      </div>
    `,
  }),
};

export const InContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">Account Settings</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage your account preferences.</p>
        </div>
        <mi-separator class="my-4"></mi-separator>
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">Privacy Settings</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">Control your privacy and data usage.</p>
        </div>
        <mi-separator class="my-4"></mi-separator>
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">Notification Settings</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">Configure how you receive notifications.</p>
        </div>
      </div>
    `,
  }),
};
