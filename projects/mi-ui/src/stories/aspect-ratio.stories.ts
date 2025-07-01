import type { Meta, StoryObj } from '@storybook/angular';
import { AspectRatio } from '../lib/mi-ui/aspect-ratio/aspect-ratio';

const meta: Meta<AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['square', 'video', '4/3', '3/2', '16/9', '21/9'],
    },
  },
};

export default meta;
type Story = StoryObj<AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 'video',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-aspect-ratio [ratio]="ratio" class="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </mi-aspect-ratio>
    `,
  }),
};

export const Square: Story = {
  args: {
    ratio: 'square',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-aspect-ratio [ratio]="ratio" class="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </mi-aspect-ratio>
    `,
  }),
};

export const Portrait: Story = {
  args: {
    ratio: '4/3',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-aspect-ratio [ratio]="ratio" class="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </mi-aspect-ratio>
    `,
  }),
};
