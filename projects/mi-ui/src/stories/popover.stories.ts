import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Popover } from '../lib/mi-ui/popover/popover';
import { Button } from '../lib/mi-ui/button/button';
import { InputComponent } from '../lib/mi-ui/input/input';
import { LabelComponent } from '../lib/mi-ui/label/label';

const meta: Meta<Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Popover, Button, InputComponent, LabelComponent],
    }),
  ],
  args: {
    content: 'This is a popover content.',
    open: false,
    placement: 'bottom',
    offset: 8,
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Simple text content for the popover'
    },
    open: {
      control: 'boolean',
      description: 'Whether the popover is open'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of the popover relative to trigger'
    },
    offset: {
      control: 'number',
      description: 'Offset from the trigger element'
    }
  },
};

export default meta;
type Story = StoryObj<Popover>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex justify-center">
        <mi-popover [content]="content" [placement]="placement" [offset]="offset">
          <mi-button>Open Popover</mi-button>
        </mi-popover>
      </div>
    `,
  }),
};

export const WithCustomContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex justify-center">
        <mi-popover>
          <mi-button>Settings</mi-button>
          <div slot="content" class="space-y-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <mi-label htmlFor="width">Width</mi-label>
                <mi-input id="width" value="100%" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <mi-label htmlFor="maxWidth">Max. width</mi-label>
                <mi-input id="maxWidth" value="300px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <mi-label htmlFor="height">Height</mi-label>
                <mi-input id="height" value="25px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <mi-label htmlFor="maxHeight">Max. height</mi-label>
                <mi-input id="maxHeight" value="none" class="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </mi-popover>
      </div>
    `,
  }),
};

export const DifferentPlacements: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center items-center gap-8">
        <mi-popover content="Top placement" placement="top">
          <mi-button variant="outline">Top</mi-button>
        </mi-popover>

        <mi-popover content="Bottom placement" placement="bottom">
          <mi-button variant="outline">Bottom</mi-button>
        </mi-popover>

        <mi-popover content="Left placement" placement="left">
          <mi-button variant="outline">Left</mi-button>
        </mi-popover>

        <mi-popover content="Right placement" placement="right">
          <mi-button variant="outline">Right</mi-button>
        </mi-popover>
      </div>
    `,
  }),
};
