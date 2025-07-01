import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleGroupComponent, ToggleGroupItem } from '../lib/mi-ui/toggle-group/toggle-group';

const meta: Meta<ToggleGroupComponent> = {
  title: 'Components/Toggle Group',
  component: ToggleGroupComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of two-state buttons that can be toggled on or off.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of toggle items',
    },
    value: {
      control: 'object',
      description: 'Selected value(s)',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle group is disabled',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual variant of the toggle group',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle buttons',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the toggle group',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleGroupComponent>;

const textFormattingItems: ToggleGroupItem[] = [
  {
    value: 'bold',
    label: 'Bold',
    icon: 'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'
  },
  {
    value: 'italic',
    label: 'Italic',
    icon: 'm19 4-9 16M9 4l9 16'
  },
  {
    value: 'underline',
    label: 'Underline',
    icon: 'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3'
  }
];

const alignmentItems: ToggleGroupItem[] = [
  {
    value: 'left',
    label: '',
    icon: 'M15 12H3m0-6h18m-6 12H3'
  },
  {
    value: 'center',
    label: '',
    icon: 'M17 12H7m10-6H7m10 12H7'
  },
  {
    value: 'right',
    label: '',
    icon: 'M21 12H9m12-6H9m12 12H9'
  },
  {
    value: 'justify',
    label: '',
    icon: 'M3 6h18M3 12h18m-18 6h18'
  }
];

export const Default: Story = {
  args: {
    items: textFormattingItems,
    value: 'bold',
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Value changed:', value);
      },
      onSelectionChange: (event: any) => {
        console.log('Selection changed:', event);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Text Formatting</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [multiple]="multiple"
          [disabled]="disabled"
          [variant]="variant"
          [size]="size"
          [orientation]="orientation"
          (valueChange)="onValueChange($event)"
          (selectionChange)="onSelectionChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    items: textFormattingItems,
    value: ['bold', 'italic'],
    multiple: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Multiple values changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Multiple Selection</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [multiple]="multiple"
          (valueChange)="onValueChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  args: {
    items: alignmentItems,
    value: 'left',
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Alignment changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Text Alignment</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          (valueChange)="onValueChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};

export const Outline: Story = {
  args: {
    items: textFormattingItems,
    variant: 'outline',
    value: 'bold',
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Outline value changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Outline Variant</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [variant]="variant"
          (valueChange)="onValueChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    props: {
      items: textFormattingItems,
      onValueChange: (value: string | string[]) => {
        console.log('Size demo value changed:', value);
      },
    },
    template: `
      <div class="space-y-6">
        <div>
          <label class="text-sm font-medium mb-2 block">Small</label>
          <mi-toggle-group
            [items]="items"
            size="sm"
            value="bold"
            (valueChange)="onValueChange($event)">
          </mi-toggle-group>
        </div>

        <div>
          <label class="text-sm font-medium mb-2 block">Medium (Default)</label>
          <mi-toggle-group
            [items]="items"
            size="md"
            value="italic"
            (valueChange)="onValueChange($event)">
          </mi-toggle-group>
        </div>

        <div>
          <label class="text-sm font-medium mb-2 block">Large</label>
          <mi-toggle-group
            [items]="items"
            size="lg"
            value="underline"
            (valueChange)="onValueChange($event)">
          </mi-toggle-group>
        </div>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    items: textFormattingItems,
    orientation: 'vertical',
    value: 'bold',
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Vertical value changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Vertical Orientation</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [orientation]="orientation"
          (valueChange)="onValueChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    items: textFormattingItems,
    disabled: true,
    value: 'bold',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Disabled</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [disabled]="disabled">
        </mi-toggle-group>
      </div>
    `,
  }),
};

const mixedItems: ToggleGroupItem[] = [
  {
    value: 'save',
    label: 'Save',
    icon: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'
  },
  {
    value: 'edit',
    label: 'Edit',
    icon: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'
  },
  {
    value: 'delete',
    label: 'Delete',
    icon: 'm3 6 2 18h14l2-18',
    disabled: true
  }
];

export const WithDisabledItems: Story = {
  args: {
    items: mixedItems,
    multiple: true,
    value: ['save'],
  },
  render: (args) => ({
    props: {
      ...args,
      onValueChange: (value: string | string[]) => {
        console.log('Mixed items value changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">With Disabled Item</label>
        <mi-toggle-group
          [items]="items"
          [value]="value"
          [multiple]="multiple"
          (valueChange)="onValueChange($event)">
        </mi-toggle-group>
      </div>
    `,
  }),
};
