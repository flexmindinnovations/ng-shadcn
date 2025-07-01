import type { Meta, StoryObj } from '@storybook/angular';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../lib/mi-ui/hover-card/hover-card';

const meta: Meta<HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    openDelay: {
      control: { type: 'number' },
    },
    closeDelay: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<HoverCard>;

export const Default: Story = {
  args: {
    side: 'bottom',
    openDelay: 700,
    closeDelay: 300,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-hover-card [side]="side" [openDelay]="openDelay" [closeDelay]="closeDelay">
        <a
          slot="trigger"
          class="inline-block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href="https://twitter.com/nextjs"
          target="_blank"
        >
          <div class="text-sm font-medium leading-none">@nextjs</div>
          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
            The React Framework – created and maintained by @vercel.
          </p>
        </a>

        <div class="flex justify-between space-x-4">
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@nextjs</h4>
            <p class="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div class="flex items-center pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-4 w-4 opacity-70">
                <rect width="20" height="14" x="2" y="3" rx="2" ry="2"/>
                <path d="m22 3-10 9L2 3"/>
              </svg>
              <span class="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </mi-hover-card>
    `,
  }),
};

export const TopSide: Story = {
  args: {
    side: 'top',
    openDelay: 500,
    closeDelay: 300,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="mt-20">
        <mi-hover-card [side]="side" [openDelay]="openDelay" [closeDelay]="closeDelay">
          <button
            slot="trigger"
            class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Hover for details
          </button>

          <div class="flex justify-between space-x-4">
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">Angular Component Library</h4>
              <p class="text-sm">
                Beautiful, accessible components built with Angular and Tailwind CSS.
              </p>
              <div class="flex items-center pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-4 w-4 opacity-70">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span class="text-xs text-muted-foreground">
                  Open source project
                </span>
              </div>
            </div>
          </div>
        </mi-hover-card>
      </div>
    `,
  }),
};
