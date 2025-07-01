import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressComponent } from '../lib/mi-ui/progress/progress';

const meta: Meta<ProgressComponent> = {
  title: 'Components/Progress',
  component: ProgressComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<ProgressComponent>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: 'default',
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80">
        <mi-progress [value]="value" [max]="max" [size]="size" [variant]="variant"></mi-progress>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 space-y-4">
        <div>
          <p class="text-sm font-medium mb-2">Default</p>
          <mi-progress [value]="60" variant="default"></mi-progress>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Success</p>
          <mi-progress [value]="85" variant="success"></mi-progress>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Warning</p>
          <mi-progress [value]="45" variant="warning"></mi-progress>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Destructive</p>
          <mi-progress [value]="25" variant="destructive"></mi-progress>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 space-y-4">
        <div>
          <p class="text-sm font-medium mb-2">Small</p>
          <mi-progress [value]="75" size="sm"></mi-progress>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Default</p>
          <mi-progress [value]="75" size="default"></mi-progress>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Large</p>
          <mi-progress [value]="75" size="lg"></mi-progress>
        </div>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 space-y-6">
        <div>
          <div class="flex justify-between text-sm mb-2">
            <span>File Upload</span>
            <span>60%</span>
          </div>
          <mi-progress [value]="60"></mi-progress>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-2">
            <span>Storage Used</span>
            <span>85%</span>
          </div>
          <mi-progress [value]="85" variant="warning"></mi-progress>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-2">
            <span>Download</span>
            <span>100%</span>
          </div>
          <mi-progress [value]="100" variant="success"></mi-progress>
        </div>
      </div>
    `,
  }),
};
