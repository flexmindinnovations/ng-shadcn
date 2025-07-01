import type { Meta, StoryObj } from '@storybook/angular';
import { ComboboxComponent, ComboboxOption } from '../lib/mi-ui/combobox/combobox';

const meta: Meta<ComboboxComponent> = {
  title: 'Components/Combobox',
  component: ComboboxComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Combines a text input with a listbox, allowing users to filter a list of options to items matching a query.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to choose from',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the options can be searched/filtered',
    },
    value: {
      control: 'text',
      description: 'The selected value',
    },
  },
};

export default meta;
type Story = StoryObj<ComboboxComponent>;

const defaultOptions: ComboboxOption[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'wordpress', label: 'WordPress', disabled: true },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select framework...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-64">
        <mi-combobox
          [options]="options"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [searchable]="searchable"
          [value]="value">
        </mi-combobox>
      </div>
    `,
  }),
};

export const WithPreselectedValue: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select framework...',
    value: 'next.js',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-64">
        <mi-combobox
          [options]="options"
          [placeholder]="placeholder"
          [value]="value">
        </mi-combobox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select framework...',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-64">
        <mi-combobox
          [options]="options"
          [placeholder]="placeholder"
          [disabled]="disabled">
        </mi-combobox>
      </div>
    `,
  }),
};

export const NotSearchable: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select framework...',
    searchable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-64">
        <mi-combobox
          [options]="options"
          [placeholder]="placeholder"
          [searchable]="searchable">
        </mi-combobox>
      </div>
    `,
  }),
};
