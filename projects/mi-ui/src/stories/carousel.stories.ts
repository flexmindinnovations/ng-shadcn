import type { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from '../lib/mi-ui/carousel/carousel';

const meta: Meta<CarouselComponent> = {
  title: 'Components/Carousel',
  component: CarouselComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A carousel component for cycling through elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    slides: {
      control: 'object',
      description: 'Array of slides to display',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Whether to auto-play the carousel',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'Auto-play interval in milliseconds',
    },
    loop: {
      control: 'boolean',
      description: 'Whether to loop back to the first slide',
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Whether to show previous/next buttons',
    },
    showDots: {
      control: 'boolean',
      description: 'Whether to show dot indicators',
    },
  },
};

export default meta;
type Story = StoryObj<CarouselComponent>;

export const Default: Story = {
  args: {
    slides: [1, 2, 3, 4, 5],
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 max-w-xs">
        <mi-carousel [slides]="slides" [autoPlay]="autoPlay" [loop]="loop" [showPrevNext]="showPrevNext" [showDots]="showDots">
        </mi-carousel>
      </div>
    `,
  }),
};

export const AutoPlay: Story = {
  args: {
    slides: [1, 2, 3, 4, 5],
    autoPlay: true,
    autoPlayInterval: 2000,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 max-w-xs">
        <mi-carousel [slides]="slides" [autoPlay]="autoPlay" [autoPlayInterval]="autoPlayInterval" [loop]="loop">
        </mi-carousel>
      </div>
    `,
  }),
};

export const WithoutControls: Story = {
  args: {
    slides: [1, 2, 3],
    showPrevNext: false,
    showDots: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 max-w-xs">
        <mi-carousel [slides]="slides" [showPrevNext]="showPrevNext" [showDots]="showDots">
        </mi-carousel>
      </div>
    `,
  }),
};

export const NoLoop: Story = {
  args: {
    slides: [1, 2, 3, 4],
    loop: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 max-w-xs">
        <mi-carousel [slides]="slides" [loop]="loop">
        </mi-carousel>
      </div>
    `,
  }),
};
