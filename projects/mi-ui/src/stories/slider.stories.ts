import type { Meta, StoryObj } from '@storybook/angular';
import { Slider } from '../lib/mi-ui/slider/slider';

const meta: Meta<Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      currentValue: 50,
    },
    template: `
      <div class="w-80 space-y-4">
        <mi-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [orientation]="orientation"
          [size]="size"
          [disabled]="disabled">
        </mi-slider>
        <div class="text-sm text-muted-foreground">
          Value: {{ currentValue }}
        </div>
      </div>
    `,
  }),
};

export const Range: Story = {
  args: {
    min: 0,
    max: 20,
    step: 1,
    orientation: 'horizontal',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      currentValue: 10,
    },
    template: `
      <div class="w-80 space-y-4">
        <mi-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [orientation]="orientation"
          [size]="size"
          [disabled]="disabled">
        </mi-slider>
        <div class="text-sm text-muted-foreground">
          Range: {{ min }} - {{ max }}, Value: {{ currentValue }}
        </div>
      </div>
    `,
  }),
};

export const SmallSize: Story = {
  args: {
    min: 0,
    max: 100,
    step: 5,
    orientation: 'horizontal',
    size: 'sm',
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      currentValue: 25,
    },
    template: `
      <div class="w-80 space-y-4">
        <mi-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [orientation]="orientation"
          [size]="size"
          [disabled]="disabled">
        </mi-slider>
        <div class="text-sm text-muted-foreground">
          Small size, Step: {{ step }}, Value: {{ currentValue }}
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    size: 'md',
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
      currentValue: 75,
    },
    template: `
      <div class="w-80 space-y-4">
        <mi-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [orientation]="orientation"
          [size]="size"
          [disabled]="disabled">
        </mi-slider>
        <div class="text-sm text-muted-foreground">
          Disabled slider, Value: {{ currentValue }}
        </div>
      </div>
    `,
  }),
};
