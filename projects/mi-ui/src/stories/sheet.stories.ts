import type { Meta, StoryObj } from '@storybook/angular';
import { SheetComponent } from '../lib/mi-ui/sheet/sheet';

const meta: Meta<SheetComponent> = {
  title: 'Components/Sheet',
  component: SheetComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Extends the Dialog component to display content that complements the main content of the screen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the sheet is open',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The side from which the sheet slides in',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the sheet',
    },
    title: {
      control: 'text',
      description: 'The title of the sheet',
    },
    description: {
      control: 'text',
      description: 'The description of the sheet',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close when clicking the backdrop',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close when pressing Escape',
    },
  },
};

export default meta;
type Story = StoryObj<SheetComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Edit Profile',
    description: 'Make changes to your profile here. Click save when you\'re done.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <mi-sheet
          [isOpen]="isOpen"
          [side]="side"
          [size]="size"
          [title]="title"
          [description]="description"
          [closeOnBackdropClick]="closeOnBackdropClick"
          [showCloseButton]="showCloseButton"
          [closeOnEscape]="closeOnEscape">
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-sm font-medium">Name</label>
              <input class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value="Pedro Duarte" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-sm font-medium">Username</label>
              <input class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value="@peduarte" />
            </div>
          </div>
          <div slot="footer" class="space-x-2">
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Save changes
            </button>
          </div>
        </mi-sheet>
      </div>
    `,
  }),
};

export const LeftSide: Story = {
  args: {
    isOpen: true,
    side: 'left',
    title: 'Navigation',
    description: 'Choose a section to navigate to.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-sheet
        [isOpen]="isOpen"
        [side]="side"
        [size]="size"
        [title]="title"
        [description]="description">
        <nav class="space-y-2">
          <a href="#" class="block p-2 rounded hover:bg-accent">Dashboard</a>
          <a href="#" class="block p-2 rounded hover:bg-accent">Users</a>
          <a href="#" class="block p-2 rounded hover:bg-accent">Settings</a>
          <a href="#" class="block p-2 rounded hover:bg-accent">Reports</a>
        </nav>
      </mi-sheet>
    `,
  }),
};

export const TopSide: Story = {
  args: {
    isOpen: true,
    side: 'top',
    size: 'md',
    title: 'Notifications',
    description: 'Recent notifications and updates.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-sheet
        [isOpen]="isOpen"
        [side]="side"
        [size]="size"
        [title]="title"
        [description]="description">
        <div class="space-y-4">
          <div class="p-3 border rounded">
            <h4 class="font-medium">New message received</h4>
            <p class="text-sm text-muted-foreground">From John Doe</p>
          </div>
          <div class="p-3 border rounded">
            <h4 class="font-medium">System update available</h4>
            <p class="text-sm text-muted-foreground">Version 2.1.0 is ready</p>
          </div>
        </div>
      </mi-sheet>
    `,
  }),
};

export const BottomSide: Story = {
  args: {
    isOpen: true,
    side: 'bottom',
    size: 'lg',
    title: 'Quick Actions',
    description: 'Frequently used actions and shortcuts.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-sheet
        [isOpen]="isOpen"
        [side]="side"
        [size]="size"
        [title]="title"
        [description]="description">
        <div class="grid grid-cols-3 gap-4">
          <button class="p-4 border rounded hover:bg-accent">
            <div class="text-center">
              <div class="text-lg mb-2">📊</div>
              <div class="text-sm">Analytics</div>
            </div>
          </button>
          <button class="p-4 border rounded hover:bg-accent">
            <div class="text-center">
              <div class="text-lg mb-2">⚙️</div>
              <div class="text-sm">Settings</div>
            </div>
          </button>
          <button class="p-4 border rounded hover:bg-accent">
            <div class="text-center">
              <div class="text-lg mb-2">💬</div>
              <div class="text-sm">Support</div>
            </div>
          </button>
        </div>
      </mi-sheet>
    `,
  }),
};

export const LargeSize: Story = {
  args: {
    isOpen: true,
    side: 'right',
    size: 'lg',
    title: 'Product Details',
    description: 'Detailed information about the selected product.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-sheet
        [isOpen]="isOpen"
        [side]="side"
        [size]="size"
        [title]="title"
        [description]="description">
        <div class="space-y-6">
          <div class="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span class="text-muted-foreground">Product Image</span>
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Premium Headphones</h3>
            <p class="text-muted-foreground">High-quality wireless headphones with noise cancellation and premium sound quality.</p>
            <div class="flex items-center space-x-2">
              <span class="text-2xl font-bold">$299.99</span>
              <span class="text-sm text-muted-foreground line-through">$399.99</span>
            </div>
          </div>
        </div>
        <div slot="footer" class="space-x-2">
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Add to Wishlist
          </button>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add to Cart
          </button>
        </div>
      </mi-sheet>
    `,
  }),
};
