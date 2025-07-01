import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../lib/mi-ui/avatar/avatar';
import { BadgeComponent } from '../lib/mi-ui/badge/badge';
import { IconComponent } from '../lib/mi-ui/icon/icon';
import { IconService } from '../lib/services/icon.service';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An avatar component for displaying user profile pictures or initials.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        AvatarComponent,
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
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'The size of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (usually initials)',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    size: 'default',
    src: 'https://github.com/shadcn.png',
    alt: 'User avatar',
    fallback: 'CN',
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-avatar
        [size]="size"
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [class]="class">
      </mi-avatar>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <mi-avatar size="sm" src="https://github.com/shadcn.png" alt="Small avatar"></mi-avatar>
        <mi-avatar size="default" src="https://github.com/shadcn.png" alt="Default avatar"></mi-avatar>
        <mi-avatar size="lg" src="https://github.com/shadcn.png" alt="Large avatar"></mi-avatar>
        <mi-avatar size="xl" src="https://github.com/shadcn.png" alt="Extra large avatar"></mi-avatar>
      </div>
    `,
  }),
};

export const WithFallback: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <mi-avatar fallback="AB" size="sm"></mi-avatar>
        <mi-avatar fallback="CD" size="default"></mi-avatar>
        <mi-avatar fallback="EF" size="lg"></mi-avatar>
        <mi-avatar fallback="GH" size="xl"></mi-avatar>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <mi-avatar size="sm"></mi-avatar>
        <mi-avatar size="default"></mi-avatar>
        <mi-avatar size="lg"></mi-avatar>
        <mi-avatar size="xl"></mi-avatar>
      </div>
    `,
  }),
};

export const BrokenImage: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <mi-avatar src="https://broken-url.jpg" fallback="AB" size="sm"></mi-avatar>
        <mi-avatar src="https://broken-url.jpg" fallback="CD" size="default"></mi-avatar>
        <mi-avatar src="https://broken-url.jpg" fallback="EF" size="lg"></mi-avatar>
        <mi-avatar src="https://broken-url.jpg" fallback="GH" size="xl"></mi-avatar>
      </div>
    `,
  }),
};

export const WithStatus: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-6">
        <div class="relative">
          <mi-avatar src="https://github.com/shadcn.png" alt="User avatar"></mi-avatar>
          <div class="absolute -bottom-0 -right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></div>
        </div>

        <div class="relative">
          <mi-avatar src="https://github.com/shadcn.png" alt="User avatar" size="lg"></mi-avatar>
          <div class="absolute -bottom-0 -right-0 h-4 w-4 rounded-full border-2 border-background bg-yellow-500"></div>
        </div>

        <div class="relative">
          <mi-avatar fallback="AB" size="xl"></mi-avatar>
          <div class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-red-500"></div>
        </div>
      </div>
    `,
  }),
};

export const WithBadge: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-6">
        <div class="relative">
          <mi-avatar src="https://github.com/shadcn.png" alt="User avatar"></mi-avatar>
          <mi-badge variant="destructive" size="sm" class="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </mi-badge>
        </div>

        <div class="relative">
          <mi-avatar fallback="JD" size="lg"></mi-avatar>
          <mi-badge variant="default" size="sm" class="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
            9+
          </mi-badge>
        </div>
      </div>
    `,
  }),
};

export const AvatarGroup: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-2">Team Members</h4>
          <div class="flex -space-x-2">
            <mi-avatar src="https://github.com/shadcn.png" alt="User 1" class="border-2 border-background"></mi-avatar>
            <mi-avatar fallback="AB" class="border-2 border-background"></mi-avatar>
            <mi-avatar fallback="CD" class="border-2 border-background"></mi-avatar>
            <mi-avatar fallback="EF" class="border-2 border-background"></mi-avatar>
            <mi-avatar fallback="+5" class="border-2 border-background bg-muted"></mi-avatar>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-2">Recent Collaborators</h4>
          <div class="flex -space-x-3">
            <mi-avatar src="https://github.com/shadcn.png" alt="User 1" size="lg" class="border-4 border-background"></mi-avatar>
            <mi-avatar fallback="JD" size="lg" class="border-4 border-background"></mi-avatar>
            <mi-avatar fallback="KL" size="lg" class="border-4 border-background"></mi-avatar>
            <mi-avatar fallback="MN" size="lg" class="border-4 border-background"></mi-avatar>
          </div>
        </div>
      </div>
    `,
  }),
};

export const UserProfile: Story = {
  render: () => ({
    template: `
      <div class="space-y-6" style="max-width: 300px;">
        <div class="text-center">
          <mi-avatar src="https://github.com/shadcn.png" alt="Profile picture" size="xl" class="mx-auto mb-4"></mi-avatar>
          <h3 class="text-lg font-semibold">John Doe</h3>
          <p class="text-sm text-muted-foreground">Software Engineer</p>
          <mi-badge variant="success" class="mt-2">Available</mi-badge>
        </div>

        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium mb-3">Quick Actions</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <mi-avatar fallback="DM" size="sm"></mi-avatar>
              <span class="text-sm">Send direct message</span>
            </div>
            <div class="flex items-center gap-3">
              <mi-avatar fallback="VC" size="sm"></mi-avatar>
              <span class="text-sm">Start video call</span>
            </div>
            <div class="flex items-center gap-3">
              <mi-avatar fallback="SP" size="sm"></mi-avatar>
              <span class="text-sm">Share profile</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
