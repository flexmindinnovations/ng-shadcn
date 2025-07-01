import type { Meta, StoryObj } from '@storybook/angular';
import { DatePickerComponent } from '../lib/mi-ui/date-picker/date-picker';

const meta: Meta<DatePickerComponent> = {
  title: 'Components/Date Picker',
  component: DatePickerComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date picker component that allows users to select a date from a calendar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'The selected date',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date',
    },
    format: {
      control: 'select',
      options: ['MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd', 'MMM dd, yyyy'],
      description: 'The date format to display',
    },
    showToday: {
      control: 'boolean',
      description: 'Whether to show the "Today" button',
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
  },
  render: (args) => ({
    props: {
      ...args,
      onDateSelect: (date: Date) => {
        console.log('Date selected:', date);
      },
      onValueChange: (date: Date) => {
        console.log('Value changed:', date);
      },
    },
    template: `
      <div class="w-64">
        <label class="text-sm font-medium mb-2 block">Select Date</label>
        <mi-date-picker
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [format]="format"
          [showToday]="showToday"
          (dateSelect)="onDateSelect($event)"
          (valueChange)="onValueChange($event)">
        </mi-date-picker>
      </div>
    `,
  }),
};

export const WithPreselectedDate: Story = {
  args: {
    value: new Date(),
    placeholder: 'Pick a date',
  },
  render: (args) => ({
    props: {
      ...args,
      onDateSelect: (date: Date) => {
        console.log('Date selected:', date);
      },
    },
    template: `
      <div class="w-64">
        <label class="text-sm font-medium mb-2 block">Birthday</label>
        <mi-date-picker
          [value]="value"
          [placeholder]="placeholder"
          (dateSelect)="onDateSelect($event)">
        </mi-date-picker>
      </div>
    `,
  }),
};

export const WithDateRange: Story = {
  args: {
    placeholder: 'Select appointment date',
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  render: (args) => ({
    props: {
      ...args,
      onDateSelect: (date: Date) => {
        console.log('Appointment date selected:', date);
      },
    },
    template: `
      <div class="w-64">
        <label class="text-sm font-medium mb-2 block">Appointment Date</label>
        <p class="text-sm text-muted-foreground mb-2">Select a date within the next 30 days</p>
        <mi-date-picker
          [placeholder]="placeholder"
          [minDate]="minDate"
          [maxDate]="maxDate"
          (dateSelect)="onDateSelect($event)">
        </mi-date-picker>
      </div>
    `,
  }),
};

export const DifferentFormats: Story = {
  render: () => ({
    props: {
      onDateSelect: (date: Date, format: string) => {
        console.log(`Date selected in ${format}:`, date);
      },
    },
    template: `
      <div class="space-y-6">
        <div class="w-64">
          <label class="text-sm font-medium mb-2 block">MM/dd/yyyy Format</label>
          <mi-date-picker
            placeholder="Select date"
            format="MM/dd/yyyy"
            (dateSelect)="onDateSelect($event, 'MM/dd/yyyy')">
          </mi-date-picker>
        </div>

        <div class="w-64">
          <label class="text-sm font-medium mb-2 block">dd/MM/yyyy Format</label>
          <mi-date-picker
            placeholder="Select date"
            format="dd/MM/yyyy"
            (dateSelect)="onDateSelect($event, 'dd/MM/yyyy')">
          </mi-date-picker>
        </div>

        <div class="w-64">
          <label class="text-sm font-medium mb-2 block">yyyy-MM-dd Format</label>
          <mi-date-picker
            placeholder="Select date"
            format="yyyy-MM-dd"
            (dateSelect)="onDateSelect($event, 'yyyy-MM-dd')">
          </mi-date-picker>
        </div>

        <div class="w-64">
          <label class="text-sm font-medium mb-2 block">MMM dd, yyyy Format</label>
          <mi-date-picker
            placeholder="Select date"
            format="MMM dd, yyyy"
            (dateSelect)="onDateSelect($event, 'MMM dd, yyyy')">
          </mi-date-picker>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(),
    placeholder: 'Date picker is disabled',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-64">
        <label class="text-sm font-medium mb-2 block">Disabled Date Picker</label>
        <mi-date-picker
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled">
        </mi-date-picker>
      </div>
    `,
  }),
};

export const WithoutTodayButton: Story = {
  args: {
    placeholder: 'Pick a date',
    showToday: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onDateSelect: (date: Date) => {
        console.log('Date selected:', date);
      },
    },
    template: `
      <div class="w-64">
        <label class="text-sm font-medium mb-2 block">No Today Button</label>
        <mi-date-picker
          [placeholder]="placeholder"
          [showToday]="showToday"
          (dateSelect)="onDateSelect($event)">
        </mi-date-picker>
      </div>
    `,
  }),
};
