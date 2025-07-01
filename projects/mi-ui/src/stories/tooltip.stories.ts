import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from '../lib/mi-ui/tooltip/tooltip';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    variant: 'default',
    side: 'top',
    delay: 500,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-tooltip [content]="content" [variant]="variant" [side]="side" [delay]="delay">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Hover me
        </button>
      </mi-tooltip>
    `,
  }),
};

export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-4">
        <mi-tooltip content="Default tooltip" variant="default">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Default
          </button>
        </mi-tooltip>

        <mi-tooltip content="Secondary tooltip" variant="secondary">
          <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Secondary
          </button>
        </mi-tooltip>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-3 gap-8 p-16">
        <div></div>
        <div class="flex justify-center">
          <mi-tooltip content="Tooltip on top" side="top">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Top
            </button>
          </mi-tooltip>
        </div>
        <div></div>

        <div class="flex justify-center">
          <mi-tooltip content="Tooltip on left" side="left">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Left
            </button>
          </mi-tooltip>
        </div>
        <div></div>
        <div class="flex justify-center">
          <mi-tooltip content="Tooltip on right" side="right">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Right
            </button>
          </mi-tooltip>
        </div>

        <div></div>
        <div class="flex justify-center">
          <mi-tooltip content="Tooltip on bottom" side="bottom">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Bottom
            </button>
          </mi-tooltip>
        </div>
        <div></div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8 p-8">
        <div class="flex items-center gap-4">
          <mi-tooltip content="Click to save your work">
            <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
              <span>💾</span>
              Save
            </button>
          </mi-tooltip>

          <mi-tooltip content="Delete this item permanently" variant="secondary">
            <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
              <span>🗑️</span>
              Delete
            </button>
          </mi-tooltip>

          <mi-tooltip content="View more options">
            <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              ⋯
            </button>
          </mi-tooltip>
        </div>

        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 class="font-medium mb-2">Form Controls</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <mi-tooltip content="Enter your full name">
                <input
                  type="text"
                  placeholder="Full Name"
                  class="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                />
              </mi-tooltip>
            </div>

            <div class="flex items-center gap-2">
              <mi-tooltip content="Choose your preferred option" side="right">
                <select class="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </mi-tooltip>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
