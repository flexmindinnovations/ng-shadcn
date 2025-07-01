import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollArea, ScrollBar } from '../lib/mi-ui/scroll-area/scroll-area';

const meta: Meta<ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'auto'],
    },
    hideScrollbar: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ScrollArea>;

export const Default: Story = {
  args: {
    size: 'md',
    hideScrollbar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-scroll-area [size]="size" [hideScrollbar]="hideScrollbar" class="w-48 border rounded-md">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
          <div class="text-sm">
            <div class="mb-2">v1.2.0-beta</div>
            <div class="mb-2">v1.1.0-alpha</div>
            <div class="mb-2">v1.0.0</div>
            <div class="mb-2">v0.9.0</div>
            <div class="mb-2">v0.8.0</div>
            <div class="mb-2">v0.7.0</div>
            <div class="mb-2">v0.6.0</div>
            <div class="mb-2">v0.5.0</div>
            <div class="mb-2">v0.4.0</div>
            <div class="mb-2">v0.3.0</div>
            <div class="mb-2">v0.2.0</div>
            <div class="mb-2">v0.1.0</div>
          </div>
        </div>
      </mi-scroll-area>
    `,
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
    hideScrollbar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-scroll-area [size]="size" [hideScrollbar]="hideScrollbar" class="w-48 border rounded-md">
        <div class="p-4 space-y-2">
          <p class="text-sm">
            Radix Primitives is a low-level UI primitive library with a focus on accessibility, customization and developer experience.
          </p>
          <p class="text-sm">
            You can use these primitives to build your own design system, or you can use them as a starting point and customize them to your needs.
          </p>
          <p class="text-sm">
            All primitives are built with accessibility in mind and follow the WAI-ARIA guidelines.
          </p>
        </div>
      </mi-scroll-area>
    `,
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
    hideScrollbar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-scroll-area [size]="size" [hideScrollbar]="hideScrollbar" class="w-72 border rounded-md">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">Components</h4>
          <div class="grid gap-2 text-sm">
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Accordion
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Alert Dialog
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Aspect Ratio
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
              Avatar
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Badge
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Button
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Calendar
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Card
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Checkbox
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Collapsible
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Combobox
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Command
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Context Menu
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Data Table
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Date Picker
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Dialog
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Dropdown Menu
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Form
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Hover Card
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Input
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Label
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Menubar
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Navigation Menu
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Popover
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Progress
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Radio Group
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Scroll Area
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Select
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Separator
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Sheet
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Skeleton
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Slider
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Switch
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Table
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Tabs
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Textarea
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Toast
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Toggle
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              Tooltip
            </div>
          </div>
        </div>
      </mi-scroll-area>
    `,
  }),
};

export const HorizontalScrolling: Story = {
  args: {
    size: 'md',
    hideScrollbar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-scroll-area [size]="size" [hideScrollbar]="hideScrollbar" class="w-96 border rounded-md">
        <div class="flex w-max space-x-4 p-4">
          <div class="shrink-0 bg-accent rounded-md p-4 w-48">
            <h4 class="mb-2 font-medium">Card 1</h4>
            <p class="text-sm text-muted-foreground">
              This is a card with some content that makes the container scroll horizontally.
            </p>
          </div>
          <div class="shrink-0 bg-accent rounded-md p-4 w-48">
            <h4 class="mb-2 font-medium">Card 2</h4>
            <p class="text-sm text-muted-foreground">
              This is another card with content. The scroll area allows horizontal scrolling.
            </p>
          </div>
          <div class="shrink-0 bg-accent rounded-md p-4 w-48">
            <h4 class="mb-2 font-medium">Card 3</h4>
            <p class="text-sm text-muted-foreground">
              A third card to demonstrate the horizontal scrolling functionality.
            </p>
          </div>
          <div class="shrink-0 bg-accent rounded-md p-4 w-48">
            <h4 class="mb-2 font-medium">Card 4</h4>
            <p class="text-sm text-muted-foreground">
              And one more card to make sure we have enough content to scroll.
            </p>
          </div>
        </div>
      </mi-scroll-area>
    `,
  }),
};

export const WithoutScrollbar: Story = {
  args: {
    size: 'md',
    hideScrollbar: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-scroll-area [size]="size" [hideScrollbar]="hideScrollbar" class="w-48 border rounded-md">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">Hidden Scrollbar</h4>
          <div class="text-sm space-y-2">
            <p>This scroll area has a hidden scrollbar.</p>
            <p>You can still scroll with your mouse wheel or by dragging on touch devices.</p>
            <p>This is useful when you want a clean look without visible scrollbars.</p>
            <p>The content is still scrollable, just without the visual scrollbar indicator.</p>
            <p>Scroll down to see more content...</p>
            <p>More content here.</p>
            <p>Even more content.</p>
            <p>Keep scrolling...</p>
            <p>Almost at the end.</p>
            <p>This is the last line.</p>
          </div>
        </div>
      </mi-scroll-area>
    `,
  }),
};
