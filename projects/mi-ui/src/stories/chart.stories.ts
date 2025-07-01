import type { Meta, StoryObj } from '@storybook/angular';
import { ChartContainer } from '../lib/mi-ui/chart/chart';

const meta: Meta<ChartContainer> = {
  title: 'Components/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ChartContainer>;

export const Small: Story = {
  args: {
    size: 'sm',
    className: '',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    className: '',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    className: '',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    className: '',
  },
};
