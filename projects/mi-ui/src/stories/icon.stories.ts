import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '../lib/mi-ui/icon/icon';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive icon component that provides access to all Lucide icons with TypeScript autocomplete support.

## Features
- **Full Lucide Icon Library**: Access to 1000+ icons
- **TypeScript Autocomplete**: Get intellisense when typing icon names
- **Customizable**: Size, color, stroke width, and CSS classes
- **Performance**: Built-in caching for SVG generation
- **Type Safe**: Full TypeScript support with \`LucideIconName\` type

## Usage
\`\`\`html
<mi-icon name="Check" [size]="24" color="green" [strokeWidth]="2"></mi-icon>
<mi-icon name="Heart" class="text-red-500"></mi-icon>
<mi-icon name="Search" [size]="16"></mi-icon>
\`\`\`

Try typing in the "name" control below to see autocomplete in action!
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from Lucide icons (with TypeScript autocomplete)',
      table: {
        type: { summary: 'LucideIconName' },
        defaultValue: { summary: 'Check' },
      },
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 1 },
      description: 'Icon size in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Icon stroke color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 4, step: 0.5 },
      description: 'Icon stroke width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    name: 'Check',
    size: 24,
    color: 'currentColor',
    strokeWidth: 2,
    class: '',
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: 'Check',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'Heart',
    size: 32,
    color: '#ef4444',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icons can be customized with different sizes and colors.',
      },
    },
  },
};

export const WithStrokeWidth: Story = {
  args: {
    name: 'Star',
    size: 28,
    strokeWidth: 3,
    color: '#f59e0b',
  },
  parameters: {
    docs: {
      description: {
        story: 'Adjust stroke width for different visual weights.',
      },
    },
  },
};

export const PopularIcons: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Check" [size]="24" class="text-green-600"></mi-icon>
          <span class="text-xs">Check</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="X" [size]="24" class="text-red-600"></mi-icon>
          <span class="text-xs">X</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Heart" [size]="24" class="text-pink-600"></mi-icon>
          <span class="text-xs">Heart</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Star" [size]="24" class="text-yellow-600"></mi-icon>
          <span class="text-xs">Star</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Search" [size]="24" class="text-blue-600"></mi-icon>
          <span class="text-xs">Search</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Settings" [size]="24" class="text-gray-600"></mi-icon>
          <span class="text-xs">Settings</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="User" [size]="24" class="text-indigo-600"></mi-icon>
          <span class="text-xs">User</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Mail" [size]="24" class="text-purple-600"></mi-icon>
          <span class="text-xs">Mail</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of popular icons with different colors.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Home" [size]="16"></mi-icon>
          <span class="text-xs">16px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Home" [size]="20"></mi-icon>
          <span class="text-xs">20px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Home" [size]="24"></mi-icon>
          <span class="text-xs">24px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Home" [size]="32"></mi-icon>
          <span class="text-xs">32px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <mi-icon name="Home" [size]="48"></mi-icon>
          <span class="text-xs">48px</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different icon sizes available.',
      },
    },
  },
};

export const IconTest: Story = {
  render: () => ({
    template: `
      <div class="p-4 space-y-4">
        <h2 class="text-lg font-bold">Icon Test</h2>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span>Check:</span>
            <mi-icon name="Check" [size]="24"></mi-icon>
          </div>
          <div class="flex items-center gap-2">
            <span>Heart:</span>
            <mi-icon name="Heart" [size]="24" class="text-red-500"></mi-icon>
          </div>
          <div class="flex items-center gap-2">
            <span>ArrowRight:</span>
            <mi-icon name="ArrowRight" [size]="24"></mi-icon>
          </div>
          <div class="flex items-center gap-2">
            <span>Loader2:</span>
            <mi-icon name="Loader2" [size]="24" class="animate-spin"></mi-icon>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Test component to verify icons are rendering correctly.',
      },
    },
  },
};
