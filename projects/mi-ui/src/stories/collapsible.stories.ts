import type { Meta, StoryObj } from '@storybook/angular';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../lib/mi-ui/collapsible/collapsible';

const meta: Meta<Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<Collapsible>;

export const Default: Story = {
  args: {
    open: false,
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
      onToggle: () => {
        args.open = !args.open;
      }
    },
    template: `
      <div class="w-[350px] space-y-2">
        <h4 class="text-sm font-medium">
          @peduarte starred 3 repositories
        </h4>
        <mi-collapsible [open]="isOpen" (openChange)="onToggle()">
          <mi-collapsible-trigger [open]="isOpen" [disabled]="disabled" (trigger)="onToggle()">
            Can I use this in my project?
          </mi-collapsible-trigger>
          <mi-collapsible-content [open]="isOpen">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-collapsible
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-accordion
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-dropdown-menu
            </div>
          </mi-collapsible-content>
        </mi-collapsible>
      </div>
    `,
  }),
};

export const Open: Story = {
  args: {
    open: true,
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
      onToggle: () => {
        args.open = !args.open;
      }
    },
    template: `
      <div class="w-[350px] space-y-2">
        <h4 class="text-sm font-medium">
          @peduarte starred 3 repositories
        </h4>
        <mi-collapsible [open]="isOpen" (openChange)="onToggle()">
          <mi-collapsible-trigger [open]="isOpen" [disabled]="disabled" (trigger)="onToggle()">
            Can I use this in my project?
          </mi-collapsible-trigger>
          <mi-collapsible-content [open]="isOpen">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-collapsible
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-accordion
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-dropdown-menu
            </div>
          </mi-collapsible-content>
        </mi-collapsible>
      </div>
    `,
  }),
};
