import type { Meta, StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../lib/mi-ui/input-otp/input-otp';

const meta: Meta<InputOtpComponent> = {
  title: 'Components/Input OTP',
  component: InputOtpComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible one-time password component with customizable inputs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of OTP input fields',
    },
    value: {
      control: 'text',
      description: 'Current value of the OTP',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto-focus the first input',
    },
    allowAlphanumeric: {
      control: 'boolean',
      description: 'Whether to allow letters and numbers',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Helper text to display',
    },
  },
};

export default meta;
type Story = StoryObj<InputOtpComponent>;

export const Default: Story = {
  args: {
    length: 6,
    autoFocus: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onComplete: (value: string) => {
        console.log('OTP completed:', value);
        alert(`OTP completed: ${value}`);
      },
      onChange: (value: string) => {
        console.log('OTP changed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Enter verification code</label>
        <mi-input-otp
          [length]="length"
          [value]="value"
          [disabled]="disabled"
          [autoFocus]="autoFocus"
          [allowAlphanumeric]="allowAlphanumeric"
          [hasError]="hasError"
          [errorMessage]="errorMessage"
          [description]="description"
          (complete)="onComplete($event)"
          (change)="onChange($event)">
        </mi-input-otp>
      </div>
    `,
  }),
};

export const FourDigit: Story = {
  args: {
    length: 4,
    description: 'Enter the 4-digit code sent to your phone.',
  },
  render: (args) => ({
    props: {
      ...args,
      onComplete: (value: string) => {
        console.log('4-digit OTP completed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">SMS Verification</label>
        <mi-input-otp
          [length]="length"
          [description]="description"
          (complete)="onComplete($event)">
        </mi-input-otp>
      </div>
    `,
  }),
};

export const Alphanumeric: Story = {
  args: {
    length: 6,
    allowAlphanumeric: true,
    description: 'Enter the alphanumeric code from your authenticator app.',
  },
  render: (args) => ({
    props: {
      ...args,
      onComplete: (value: string) => {
        console.log('Alphanumeric OTP completed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Authenticator Code</label>
        <mi-input-otp
          [length]="length"
          [allowAlphanumeric]="allowAlphanumeric"
          [description]="description"
          (complete)="onComplete($event)">
        </mi-input-otp>
      </div>
    `,
  }),
};

export const WithError: Story = {
  args: {
    length: 6,
    hasError: true,
    errorMessage: 'Invalid verification code. Please try again.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Enter verification code</label>
        <mi-input-otp
          [length]="length"
          [hasError]="hasError"
          [errorMessage]="errorMessage">
        </mi-input-otp>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    length: 6,
    disabled: true,
    value: '123456',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Verification code (disabled)</label>
        <mi-input-otp
          [length]="length"
          [disabled]="disabled"
          [value]="value">
        </mi-input-otp>
      </div>
    `,
  }),
};

export const EightDigit: Story = {
  args: {
    length: 8,
    description: 'Enter the 8-digit backup code.',
  },
  render: (args) => ({
    props: {
      ...args,
      onComplete: (value: string) => {
        console.log('8-digit backup code completed:', value);
      },
    },
    template: `
      <div>
        <label class="text-sm font-medium mb-2 block">Backup Code</label>
        <mi-input-otp
          [length]="length"
          [description]="description"
          (complete)="onComplete($event)">
        </mi-input-otp>
      </div>
    `,
  }),
};
