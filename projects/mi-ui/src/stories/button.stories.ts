import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../lib/mi-ui/button/button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Button],
    }),
  ],
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    loadingText: '',
    type: 'button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state'
    },
    loadingText: {
      control: 'text',
      description: 'Text to show when loading'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type'
    }
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    props: {
      ...args,
      handleClick: (event: Event) => {
        console.log('Story button clicked!', event);
        alert('Button clicked!');
      }
    },
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type"
      (buttonClick)="handleClick($event)">
      Button
    </mi-button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    props: {
      ...args,
      handleClick: (event: Event) => {
        console.log('Secondary button clicked!', event);
        alert('Secondary button clicked!');
      }
    },
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type"
      (buttonClick)="handleClick($event)">
      Secondary
    </mi-button>`,
  }),
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Destructive
    </mi-button>`,
  }),
};

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Outline
    </mi-button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Ghost
    </mi-button>`,
  }),
};

export const Link: Story = {
  args: { variant: 'link' },
  render: (args) => ({
    props: {
      ...args,
      handleClick: (event: Event) => {
        console.log('Link button clicked!', event);
        alert('Link button clicked!');
      }
    },
    template: `<div class="space-y-4 p-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Link Variant Examples</h3>
        <div class="flex gap-4 flex-wrap items-center">
          <mi-button
            [variant]="variant"
            [size]="size"
            [disabled]="disabled"
            [loading]="loading"
            [loadingText]="loadingText"
            [type]="type"
            (buttonClick)="handleClick($event)">
            Default Link
          </mi-button>

          <mi-button
            variant="link"
            size="sm"
            [disabled]="disabled"
            [type]="type"
            (buttonClick)="handleClick($event)">
            Small Link
          </mi-button>

          <mi-button
            variant="link"
            size="lg"
            [disabled]="disabled"
            [type]="type"
            (buttonClick)="handleClick($event)">
            Large Link
          </mi-button>

          <mi-button
            variant="link"
            [disabled]="true"
            [type]="type">
            Disabled Link
          </mi-button>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Link with Icons</h3>
        <div class="flex gap-4 flex-wrap items-center">
          <mi-button
            variant="link"
            [size]="size"
            [disabled]="disabled"
            [type]="type"
            (buttonClick)="handleClick($event)">
            🔗 External Link
          </mi-button>

          <mi-button
            variant="link"
            [size]="size"
            [disabled]="disabled"
            [type]="type"
            (buttonClick)="handleClick($event)">
            Learn More →
          </mi-button>

          <mi-button
            variant="link"
            [size]="size"
            [disabled]="disabled"
            [type]="type"
            (buttonClick)="handleClick($event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open in new tab
          </mi-button>
        </div>
      </div>
    </div>`,
  }),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Small
    </mi-button>`,
  }),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Large
    </mi-button>`,
  }),
};

export const Icon: Story = {
  args: { size: 'icon' },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      ⚙️
    </mi-button>`,
  }),
};

export const WithIcon: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    props: args,
    template: `<div class="flex gap-4 flex-wrap">
      <mi-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [loadingText]="loadingText"
        [type]="type">
        📧 Send Email
      </mi-button>
      <mi-button
        variant="secondary"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [type]="type">
        ⬇️ Download
      </mi-button>
      <mi-button
        variant="outline"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [type]="type">
        🔄 Refresh
      </mi-button>
      <mi-button
        variant="destructive"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [type]="type">
        🗑️ Delete
      </mi-button>
    </div>`,
  }),
};

export const Loading: Story = {
  args: { loading: true, loadingText: 'Please wait...' },
  render: (args) => ({
    props: {
      ...args,
      isLoading: true,
      toggleLoading: function() {
        this['isLoading'] = !this['isLoading'];
      },
      handleClick: (event: Event) => {
        console.log('Loading button clicked!', event);
      }
    },
    template: `<div class="space-y-4">
      <mi-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="isLoading"
        [loadingText]="loadingText"
        [type]="type"
        (buttonClick)="handleClick($event)">
        {{isLoading && loadingText ? loadingText : 'Click Me'}}
      </mi-button>
      <br>
      <mi-button variant="outline" (buttonClick)="toggleLoading()">
        {{isLoading ? 'Stop Loading' : 'Start Loading'}}
      </mi-button>
    </div>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `<mi-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingText]="loadingText"
      [type]="type">
      Disabled
    </mi-button>`,
  }),
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => ({
    props: {
      handleClick: (variant: string) => {
        console.log(`${variant} button clicked!`);
        alert(`${variant} button clicked!`);
      }
    },
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <mi-button variant="default" (buttonClick)="handleClick('Default')">Default</mi-button>
        <mi-button variant="secondary" (buttonClick)="handleClick('Secondary')">Secondary</mi-button>
        <mi-button variant="destructive" (buttonClick)="handleClick('Destructive')">Destructive</mi-button>
        <mi-button variant="outline" (buttonClick)="handleClick('Outline')">Outline</mi-button>
        <mi-button variant="ghost" (buttonClick)="handleClick('Ghost')">Ghost</mi-button>
        <mi-button variant="link" (buttonClick)="handleClick('Link')">Link</mi-button>
      </div>
    `,
  }),
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4 p-4">
        <mi-button size="sm">Small</mi-button>
        <mi-button size="default">Default</mi-button>
        <mi-button size="lg">Large</mi-button>
        <mi-button size="icon">⚙️</mi-button>
      </div>
    `,
  }),
};

export const WithSVGIcons: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    props: args,
    template: `<div class="flex gap-4 flex-wrap items-center p-4">
      <mi-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [type]="type">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </mi-button>

      <mi-button
        variant="secondary"
        [size]="size"
        [disabled]="disabled"
        [type]="type">
        Upload
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </mi-button>

      <mi-button
        variant="outline"
        [size]="size"
        [disabled]="disabled"
        [type]="type">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
          <polyline points="17,6 23,6 23,12"/>
        </svg>
        Analytics
      </mi-button>

      <mi-button
        variant="ghost"
        size="icon"
        [disabled]="disabled"
        [type]="type">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"/>
          <circle cx="19" cy="12" r="1"/>
          <circle cx="5" cy="12" r="1"/>
        </svg>
      </mi-button>
    </div>`,
  }),
};

export const SpacingAndAlignment: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    props: args,
    template: `<div class="space-y-6 p-4">
      <div class="space-y-3">
        <h3 class="text-lg font-semibold">Perfect Icon + Text Spacing</h3>
        <div class="flex gap-4 flex-wrap">
          <mi-button
            [variant]="variant"
            [size]="size"
            [disabled]="disabled"
            [type]="type">
            📧 Send Email
          </mi-button>

          <mi-button
            variant="secondary"
            [size]="size"
            [disabled]="disabled"
            [type]="type">
            📎 Attach File
          </mi-button>

          <mi-button
            variant="outline"
            [size]="size"
            [disabled]="disabled"
            [type]="type">
            🔄 Refresh Data
          </mi-button>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-semibold">SVG Icons with Perfect Alignment</h3>
        <div class="flex gap-4 flex-wrap">
          <mi-button
            [variant]="variant"
            [size]="size"
            [disabled]="disabled"
            [type]="type">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16,6 12,2 8,6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Save Document
          </mi-button>

          <mi-button
            variant="secondary"
            [size]="size"
            [disabled]="disabled"
            [type]="type">
            Copy Link
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </mi-button>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-semibold">Different Sizes with Consistent Spacing</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <mi-button
            [variant]="variant"
            size="sm"
            [disabled]="disabled"
            [type]="type">
            🔍 Search
          </mi-button>

          <mi-button
            [variant]="variant"
            size="default"
            [disabled]="disabled"
            [type]="type">
            📊 Analytics
          </mi-button>

          <mi-button
            [variant]="variant"
            size="lg"
            [disabled]="disabled"
            [type]="type">
            🚀 Launch
          </mi-button>
        </div>
      </div>
    </div>`,
  }),
};
