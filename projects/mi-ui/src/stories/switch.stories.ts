import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from '../lib/mi-ui/switch/switch';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'default',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    size: 'default',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    size: 'default',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <mi-switch size="sm" [checked]="true">Small</mi-switch>
        </div>
        <div class="flex items-center gap-2">
          <mi-switch size="default" [checked]="true">Default</mi-switch>
        </div>
        <div class="flex items-center gap-2">
          <mi-switch size="lg" [checked]="true">Large</mi-switch>
        </div>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <mi-switch [checked]="false">Airplane Mode</mi-switch>
        </div>
        <div class="flex items-center gap-2">
          <mi-switch [checked]="true">Wi-Fi</mi-switch>
        </div>
        <div class="flex items-center gap-2">
          <mi-switch [checked]="false" [disabled]="true">Bluetooth</mi-switch>
        </div>
      </div>
    `,
  }),
};
