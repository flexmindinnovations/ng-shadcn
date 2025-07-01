import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputComponent } from '../lib/mi-ui/input/input';
import { LabelComponent } from '../lib/mi-ui/label/label';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent, LabelComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'floating', 'destructive'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text (used for floating label variants)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    value: {
      control: 'text',
      description: 'The input value',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    type: 'text',
    disabled: false,
    readonly: false,
    value: '',
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Floating: Story = {
  args: {
    variant: 'floating',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    placeholder: 'This field has an error',
    value: 'Invalid input',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <div>
          <mi-label>Small Input</mi-label>
          <mi-input size="sm" placeholder="Small input" />
        </div>

        <div>
          <mi-label>Default Input</mi-label>
          <mi-input size="default" placeholder="Default input" />
        </div>

        <div>
          <mi-label>Large Input</mi-label>
          <mi-input size="lg" placeholder="Large input" />
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Input Variants</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Default Variant -->
            <div class="space-y-2">
              <mi-label>Default</mi-label>
              <mi-input
                variant="default"
                placeholder="Default input style"
                value="Sample text" />
            </div>

            <!-- Filled Variant -->
            <div class="space-y-2">
              <mi-input
                variant="filled"
                label="Filled Input"
                value="Sample text" />
            </div>

            <!-- Outline Variant -->
            <div class="space-y-2">
              <mi-input
                variant="outline"
                label="Outline Input"
                type="email"
                value="user@example.com" />
            </div>

            <!-- Floating Variant -->
            <div class="space-y-2">
              <mi-input
                variant="floating"
                label="Floating Label"
                type="password"
                value="••••••••" />
            </div>

            <!-- Destructive Variant -->
            <div class="space-y-2">
              <mi-label>Destructive (Error State)</mi-label>
              <mi-input
                variant="destructive"
                placeholder="This field has an error"
                value="Invalid input" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const FloatingLabelDemo: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Floating Label Examples</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Filled with floating label -->
          <div>
            <h4 class="text-sm font-medium mb-3">Filled Variant</h4>
            <mi-input
              variant="filled"
              label="First Name" />
          </div>

          <!-- Outline with floating label -->
          <div>
            <h4 class="text-sm font-medium mb-3">Outline Variant</h4>
            <mi-input
              variant="outline"
              label="Email Address"
              type="email" />
          </div>

          <!-- Floating with floating label -->
          <div>
            <h4 class="text-sm font-medium mb-3">Floating Variant</h4>
            <mi-input
              variant="floating"
              label="Phone Number"
              type="tel" />
          </div>
        </div>

        <div class="mt-8">
          <h4 class="text-sm font-medium mb-3">With Pre-filled Values</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <mi-input
              variant="filled"
              label="Full Name"
              value="John Doe" />

            <mi-input
              variant="outline"
              label="Email"
              type="email"
              value="john@example.com" />

            <mi-input
              variant="floating"
              label="Phone"
              type="tel"
              value="+1 (555) 123-4567" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md mx-auto space-y-6">
        <h3 class="text-xl font-semibold text-center">User Registration</h3>

        <form class="space-y-4">
          <mi-input
            variant="floating"
            label="Full Name"
            type="text"
            required />

          <mi-input
            variant="floating"
            label="Email Address"
            type="email"
            required />

          <mi-input
            variant="floating"
            label="Phone Number"
            type="tel" />

          <mi-input
            variant="floating"
            label="Password"
            type="password"
            required />

          <mi-input
            variant="floating"
            label="Confirm Password"
            type="password"
            required />

          <button
            type="submit"
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors">
            Create Account
          </button>
        </form>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Input States</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Normal State -->
          <div class="space-y-2">
            <mi-label>Normal State</mi-label>
            <mi-input placeholder="Normal input" />
          </div>

          <!-- Focused State (simulated) -->
          <div class="space-y-2">
            <mi-label>With Value</mi-label>
            <mi-input value="This input has a value" />
          </div>

          <!-- Disabled State -->
          <div class="space-y-2">
            <mi-label>Disabled State</mi-label>
            <mi-input
              placeholder="Disabled input"
              disabled="true" />
          </div>

          <!-- Readonly State -->
          <div class="space-y-2">
            <mi-label>Readonly State</mi-label>
            <mi-input
              value="This is readonly text"
              readonly="true" />
          </div>

          <!-- Error State -->
          <div class="space-y-2">
            <mi-label>Error State</mi-label>
            <mi-input
              variant="destructive"
              value="Invalid input"
              placeholder="Error state input" />
          </div>

          <!-- Floating Label - Empty -->
          <div class="space-y-2">
            <mi-input
              variant="floating"
              label="Empty Floating Label" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Interactive Input Examples</h3>
        <p class="text-muted-foreground">Try typing in these inputs to see the floating labels in action!</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <mi-input
            variant="filled"
            label="Your Name"
            placeholder="Start typing..." />

          <mi-input
            variant="outline"
            label="Email Address"
            type="email"
            placeholder="Enter your email..." />

          <mi-input
            variant="floating"
            label="Phone Number"
            type="tel"
            placeholder="Your phone number..." />

          <mi-input
            variant="floating"
            label="Website URL"
            type="url"
            placeholder="https://..." />
        </div>

        <div class="mt-8">
          <h4 class="text-md font-medium mb-4">Different Input Types</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <mi-input
              variant="outline"
              label="Number"
              type="number"
              placeholder="0" />

            <mi-input
              variant="outline"
              label="Password"
              type="password"
              placeholder="Password" />

            <mi-input
              variant="outline"
              label="Search"
              type="search"
              placeholder="Search..." />

            <mi-input
              variant="outline"
              label="Date"
              type="date" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const OutlineWithDefaultLabel: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline input with default label',
  },
};

export const FloatingWithDefaultLabel: Story = {
  args: {
    variant: 'floating',
    placeholder: 'Floating input with default label',
  },
};

export const FilledWithDefaultLabel: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input with default label',
  },
};

export const OutlineVariantDemo: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Outline Variant Tests</h3>

          <div class="grid grid-cols-1 gap-4">
            <!-- Outline with custom label -->
            <div>
              <mi-input
                variant="outline"
                label="Custom Label"
                placeholder="Outline with custom label" />
            </div>

            <!-- Outline with default label -->
            <div>
              <mi-input
                variant="outline"
                placeholder="Outline with default label (no label prop)" />
            </div>

            <!-- Outline disabled -->
            <div>
              <mi-input
                variant="outline"
                label="Disabled State"
                placeholder="Disabled outline input"
                [disabled]="true" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
