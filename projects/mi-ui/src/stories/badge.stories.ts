import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../lib/mi-ui/badge/badge';
import { IconComponent } from '../lib/mi-ui/icon/icon';
import { IconService } from '../lib/services/icon.service';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying status, counts, or labels.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BadgeComponent,
        IconComponent,
      ],
      providers: [IconService],
    }),
    applicationConfig({
      providers: [IconService],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
      description: 'The visual variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the badge',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-badge [variant]="variant" [size]="size" [class]="class">
        Badge
      </mi-badge>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-2">
        <mi-badge variant="default">Default</mi-badge>
        <mi-badge variant="secondary">Secondary</mi-badge>
        <mi-badge variant="destructive">Destructive</mi-badge>
        <mi-badge variant="outline">Outline</mi-badge>
        <mi-badge variant="success">Success</mi-badge>
        <mi-badge variant="warning">Warning</mi-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <mi-badge size="sm">Small</mi-badge>
        <mi-badge size="default">Default</mi-badge>
        <mi-badge size="lg">Large</mi-badge>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-2">
        <mi-badge variant="default" class="flex items-center gap-1">
          <mi-icon name="Check" size="12"></mi-icon>
          Verified
        </mi-badge>
        <mi-badge variant="secondary" class="flex items-center gap-1">
          <mi-icon name="Star" size="12"></mi-icon>
          Featured
        </mi-badge>
        <mi-badge variant="destructive" class="flex items-center gap-1">
          <mi-icon name="X" size="12"></mi-icon>
          Error
        </mi-badge>
        <mi-badge variant="success" class="flex items-center gap-1">
          <mi-icon name="CheckCircle" size="12"></mi-icon>
          Success
        </mi-badge>
        <mi-badge variant="warning" class="flex items-center gap-1">
          <mi-icon name="AlertTriangle" size="12"></mi-icon>
          Warning
        </mi-badge>
      </div>
    `,
  }),
};

export const StatusIndicators: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="space-y-2">
          <h4 class="text-sm font-medium">Order Status</h4>
          <div class="flex gap-2">
            <mi-badge variant="warning">Pending</mi-badge>
            <mi-badge variant="default">Processing</mi-badge>
            <mi-badge variant="success">Shipped</mi-badge>
            <mi-badge variant="secondary">Delivered</mi-badge>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">User Roles</h4>
          <div class="flex gap-2">
            <mi-badge variant="destructive">Admin</mi-badge>
            <mi-badge variant="default">Moderator</mi-badge>
            <mi-badge variant="secondary">User</mi-badge>
            <mi-badge variant="outline">Guest</mi-badge>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">Priority Levels</h4>
          <div class="flex gap-2">
            <mi-badge variant="destructive">Critical</mi-badge>
            <mi-badge variant="warning">High</mi-badge>
            <mi-badge variant="default">Medium</mi-badge>
            <mi-badge variant="secondary">Low</mi-badge>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Counts: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-sm">Notifications</span>
          <mi-badge variant="destructive">3</mi-badge>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">Messages</span>
          <mi-badge variant="default">12</mi-badge>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">Cart Items</span>
          <mi-badge variant="secondary">5</mi-badge>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">New Updates</span>
          <mi-badge variant="success">2</mi-badge>
        </div>
      </div>
    `,
  }),
};

export const InContext: Story = {
  render: () => ({
    template: `
      <div class="space-y-4" style="max-width: 400px;">
        <div class="border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">Project Alpha</h3>
            <mi-badge variant="success">Active</mi-badge>
          </div>
          <p class="text-sm text-muted-foreground mb-3">A modern web application built with Angular and Tailwind CSS.</p>
          <div class="flex gap-2">
            <mi-badge variant="secondary" size="sm">Angular</mi-badge>
            <mi-badge variant="secondary" size="sm">TypeScript</mi-badge>
            <mi-badge variant="secondary" size="sm">Tailwind</mi-badge>
          </div>
        </div>

        <div class="border rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">Project Beta</h3>
            <mi-badge variant="warning">In Review</mi-badge>
          </div>
          <p class="text-sm text-muted-foreground mb-3">Mobile-first design system with comprehensive component library.</p>
          <div class="flex gap-2">
            <mi-badge variant="secondary" size="sm">React</mi-badge>
            <mi-badge variant="secondary" size="sm">Storybook</mi-badge>
            <mi-badge variant="secondary" size="sm">Jest</mi-badge>
          </div>
        </div>
      </div>
    `,
  }),
};
