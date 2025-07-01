import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationMenu } from '../lib/mi-ui/navigation-menu/navigation-menu';

const meta: Meta<NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
  },
};

export default meta;
type Story = StoryObj<NavigationMenu>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const WithSubmenu: Story = {
  args: {
    orientation: 'horizontal',
  },
};
