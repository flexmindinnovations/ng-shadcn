import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from '../lib/mi-ui/calendar/calendar';

const meta: Meta<CalendarComponent> = {
  title: 'Components/Calendar',
  component: CalendarComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date field component that allows users to enter and edit date.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'date',
      description: 'The selected date',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the calendar is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<CalendarComponent>;

export const Default: Story = {
  args: {},
};

export const WithSelectedDate: Story = {
  args: {
    selected: new Date(),
  },
};

export const WithDateRange: Story = {
  args: {
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
