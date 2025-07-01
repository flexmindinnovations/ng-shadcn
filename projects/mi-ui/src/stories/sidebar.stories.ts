import type { Meta, StoryObj } from '@storybook/angular';
import { Sidebar } from '../lib/mi-ui/sidebar/sidebar';

const meta: Meta<Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right']
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'inset', 'floating']
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none']
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<Sidebar>;

export const Default: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
    className: '',
  },
};

export const Right: Story = {
  args: {
    side: 'right',
    variant: 'sidebar',
    collapsible: 'offcanvas',
    className: '',
  },
};

export const IconCollapsible: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    className: '',
  },
};

export const NonCollapsible: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'none',
    className: '',
  },
};

export const Inset: Story = {
  args: {
    side: 'left',
    variant: 'inset',
    collapsible: 'offcanvas',
    className: '',
  },
};

export const Floating: Story = {
  args: {
    side: 'left',
    variant: 'floating',
    collapsible: 'offcanvas',
    className: '',
  },
};
