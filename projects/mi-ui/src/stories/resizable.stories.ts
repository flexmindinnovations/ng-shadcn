import type { Meta, StoryObj } from '@storybook/angular';
import { ResizablePanelGroup } from '../lib/mi-ui/resizable/resizable';

const meta: Meta<ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
  },
};

export default meta;
type Story = StoryObj<ResizablePanelGroup>;

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
};

export const WithHandle: Story = {
  args: {
    direction: 'horizontal',
  },
};
