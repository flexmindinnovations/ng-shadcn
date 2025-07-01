import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, type SelectOption } from '../lib/mi-ui/select/select';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Available Option 2' },
  { value: 'option3', label: 'Disabled Option', disabled: true },
  { value: 'option4', label: 'Available Option 3' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
    value: 'banana',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium mb-2 block">Small</label>
          <mi-select [options]="smallOptions" placeholder="Select option..." size="sm"></mi-select>
        </div>
        <div>
          <label class="text-sm font-medium mb-2 block">Default</label>
          <mi-select [options]="defaultOptions" placeholder="Select option..." size="default"></mi-select>
        </div>
        <div>
          <label class="text-sm font-medium mb-2 block">Large</label>
          <mi-select [options]="largeOptions" placeholder="Select option..." size="lg"></mi-select>
        </div>
      </div>
    `,
    props: {
      smallOptions: basicOptions,
      defaultOptions: basicOptions,
      largeOptions: basicOptions,
    },
  }),
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: 'Select an option...',
  },
};

export const Countries: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country...',
  },
};

export const FormExample: Story = {
  render: () => ({
    template: `
      <form class="space-y-4 max-w-md">
        <div>
          <label for="country" class="text-sm font-medium mb-2 block">Country</label>
          <mi-select
            id="country"
            [options]="countryOptions"
            placeholder="Select your country..."
            (selectionChange)="onCountryChange($event)">
          </mi-select>
        </div>

        <div>
          <label for="fruit" class="text-sm font-medium mb-2 block">Favorite Fruit</label>
          <mi-select
            id="fruit"
            [options]="fruitOptions"
            placeholder="Select your favorite fruit..."
            (selectionChange)="onFruitChange($event)">
          </mi-select>
        </div>

        <div>
          <label for="size" class="text-sm font-medium mb-2 block">Size Preference</label>
          <mi-select
            id="size"
            [options]="sizeOptions"
            placeholder="Select size..."
            size="sm">
          </mi-select>
        </div>

        @if (selectedValues.country || selectedValues.fruit) {
          <div class="p-4 bg-muted rounded-md">
            <h4 class="font-medium mb-2">Selected Values:</h4>
            <ul class="text-sm space-y-1">
              @if (selectedValues.country) {
                <li><strong>Country:</strong> {{ selectedValues.country.label }}</li>
              }
              @if (selectedValues.fruit) {
                <li><strong>Fruit:</strong> {{ selectedValues.fruit.label }}</li>
              }
            </ul>
          </div>
        }
      </form>
    `,
    props: {
      countryOptions: countryOptions,
      fruitOptions: basicOptions,
      sizeOptions: [
        { value: 'xs', label: 'Extra Small' },
        { value: 's', label: 'Small' },
        { value: 'm', label: 'Medium' },
        { value: 'l', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
      ],
      selectedValues: {
        country: null,
        fruit: null,
      },
      onCountryChange: function(option: any) {
        (this as any).selectedValues.country = option;
      },
      onFruitChange: function(option: any) {
        (this as any).selectedValues.fruit = option;
      },
    },
  }),
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="text-sm font-medium mb-2 block">Choose an action</label>
          <mi-select
            [options]="actionOptions"
            placeholder="What would you like to do?"
            (selectionChange)="onActionChange($event)"
            [value]="selectedAction">
          </mi-select>
        </div>

        @if (message) {
          <div class="p-3 bg-primary/10 border border-primary/20 rounded-md">
            <p class="text-sm">{{ message }}</p>
          </div>
        }

        <div class="flex space-x-2">
          <mi-button (click)="clearSelection()" variant="outline" size="sm">
            Clear Selection
          </mi-button>
          <mi-button (click)="setRandomSelection()" size="sm">
            Random Selection
          </mi-button>
        </div>
      </div>
    `,
    props: {
      actionOptions: [
        { value: 'read', label: '📖 Read a book' },
        { value: 'code', label: '💻 Write some code' },
        { value: 'walk', label: '🚶 Take a walk' },
        { value: 'cook', label: '🍳 Cook a meal' },
        { value: 'sleep', label: '😴 Take a nap' },
      ],
      selectedAction: '',
      message: '',
      onActionChange: function(option: any) {
        if (option) {
          (this as any).selectedAction = option.value;
          (this as any).message = `You selected: ${option.label}`;
        } else {
          (this as any).selectedAction = '';
          (this as any).message = '';
        }
      },
      clearSelection: function() {
        (this as any).selectedAction = '';
        (this as any).message = 'Selection cleared!';
      },
      setRandomSelection: function() {
        const options = (this as any).actionOptions;
        const randomOption = options[Math.floor(Math.random() * options.length)];
        (this as any).selectedAction = randomOption.value;
        (this as any).message = `Randomly selected: ${randomOption.label}`;
      },
    },
  }),
};
