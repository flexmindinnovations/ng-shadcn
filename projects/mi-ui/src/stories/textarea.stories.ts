import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../lib/mi-ui/textarea/textarea';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
    disabled: false,
    readonly: false,
    variant: 'default',
  },
};

export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4 w-80">
        <div>
          <p class="text-sm font-medium mb-2">Default</p>
          <mi-textarea placeholder="Default textarea" rows="3"></mi-textarea>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Error State</p>
          <mi-textarea variant="destructive" placeholder="Error textarea" rows="3"></mi-textarea>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4 w-80">
        <div>
          <p class="text-sm font-medium mb-2">Normal</p>
          <mi-textarea placeholder="Normal textarea" rows="3"></mi-textarea>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Disabled</p>
          <mi-textarea [disabled]="true" placeholder="Disabled textarea" rows="3"></mi-textarea>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Readonly</p>
          <mi-textarea [readonly]="true" value="This is readonly content" rows="3"></mi-textarea>
        </div>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <form class="flex flex-col gap-4 w-96">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Message</label>
          <mi-textarea placeholder="Write your message here..." rows="4"></mi-textarea>
          <p class="text-xs text-gray-500">Your message will be sent to the support team.</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Additional Notes</label>
          <mi-textarea placeholder="Any additional information..." rows="6"></mi-textarea>
        </div>
      </form>
    `,
  }),
};
