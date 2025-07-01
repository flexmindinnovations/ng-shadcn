import type { Meta, StoryObj } from '@storybook/angular';
import { SonnerToaster } from '../lib/mi-ui/sonner/sonner';

const meta: Meta<SonnerToaster> = {
  title: 'Components/Sonner',
  component: SonnerToaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    toasts: { control: 'object' },
    showIcon: { control: 'boolean' },
    maxToasts: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<SonnerToaster>;

const sampleToasts = [
  {
    id: '1',
    title: 'Success',
    description: 'Your changes have been saved.',
    variant: 'success' as const,
    position: 'bottom-right' as const,
  },
  {
    id: '2',
    title: 'Warning',
    description: 'Please check your input.',
    variant: 'warning' as const,
    position: 'bottom-right' as const,
  },
  {
    id: '3',
    title: 'Error',
    description: 'Something went wrong.',
    variant: 'destructive' as const,
    position: 'bottom-right' as const,
  },
];

export const Default: Story = {
  args: {
    toasts: [],
    showIcon: true,
    maxToasts: 5,
  },
};

export const WithToasts: Story = {
  args: {
    toasts: sampleToasts,
    showIcon: true,
    maxToasts: 5,
  },
};

export const WithoutIcons: Story = {
  args: {
    toasts: sampleToasts,
    showIcon: false,
    maxToasts: 5,
  },
};

export const LimitedToasts: Story = {
  args: {
    toasts: [
      ...sampleToasts,
      {
        id: '4',
        title: 'Info',
        description: 'This is an info message.',
        variant: 'info' as const,
        position: 'bottom-right' as const,
      },
      {
        id: '5',
        title: 'Default',
        description: 'This is a default message.',
        variant: 'default' as const,
        position: 'bottom-right' as const,
      },
    ],
    showIcon: true,
    maxToasts: 3,
  },
};
