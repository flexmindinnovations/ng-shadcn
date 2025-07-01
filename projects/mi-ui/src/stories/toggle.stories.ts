import type { Meta, StoryObj } from '@storybook/angular';
import { Toggle } from '../lib/mi-ui/toggle/toggle';

const meta: Meta<Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'outline'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg'],
    },
    pressed: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<Toggle>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </mi-toggle>
    `,
  }),
};

export const Text: Story = {
  args: {
    variant: 'default',
    size: 'default',
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        Toggle
      </mi-toggle>
    `,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/>
          <path d="M5.5 4h13l-.5 7.5a2 2 0 0 1-2 1.5h-8a2 2 0 0 1-2-1.5L5.5 4z"/>
          <path d="M11 11v-1a2 2 0 1 1 4 0v1"/>
        </svg>
      </mi-toggle>
    `,
  }),
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </mi-toggle>
    `,
  }),
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </mi-toggle>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'default',
    pressed: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-toggle
        [variant]="variant"
        [size]="size"
        [pressed]="pressed"
        [disabled]="disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </mi-toggle>
    `,
  }),
};
