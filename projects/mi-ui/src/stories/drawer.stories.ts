import type { Meta, StoryObj } from '@storybook/angular';
import { Drawer } from '../lib/mi-ui/drawer/drawer';

const meta: Meta<Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom']
    },
    open: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Drawer>;

export const Default: Story = {
  args: {
    side: 'right',
    open: false,
    dismissible: true,
    modal: true,
  },
};

export const LeftSide: Story = {
  args: {
    side: 'left',
    open: false,
    dismissible: true,
    modal: true,
  },
};

export const TopSide: Story = {
  args: {
    side: 'top',
    open: false,
    dismissible: true,
    modal: true,
  },
};

export const BottomSide: Story = {
  args: {
    side: 'bottom',
    open: false,
    dismissible: true,
    modal: true,
  },
};

export const NonDismissible: Story = {
  args: {
    side: 'right',
    open: false,
    dismissible: false,
    modal: true,
  },
};

export const NonModal: Story = {
  args: {
    side: 'right',
    open: false,
    dismissible: true,
    modal: false,
  },
};
