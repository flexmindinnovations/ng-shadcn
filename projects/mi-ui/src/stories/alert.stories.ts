import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from '../lib/mi-ui/alert/alert';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'destructive'],
    },
    icon: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  args: {
    icon: 'Info',
    title: 'Info',
    description: 'This is a default alert with some information.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    icon: 'AlertTriangle',
    title: 'Error',
    description: 'This is a destructive alert indicating an error.',
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Simple Alert',
    description: 'This alert has no icon.',
  },
};

export const TitleOnly: Story = {
  args: {
    icon: 'CheckCircle',
    title: 'Success',
  },
};

export const DescriptionOnly: Story = {
  args: {
    icon: 'Info',
    description: 'This alert only has a description with no title.',
  },
};

export const CustomContent: Story = {
  args: {
    icon: 'Bell',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-alert [variant]="variant" [icon]="icon" [title]="title" [description]="description">
        <p>This alert uses custom content instead of the description prop.</p>
        <ul class="mt-2 list-disc list-inside">
          <li>Custom HTML content</li>
          <li>Lists and other elements</li>
          <li>More flexibility</li>
        </ul>
      </mi-alert>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <mi-alert variant="default" icon="Info" title="Default Alert"
                  description="This is a default alert for general information.">
        </mi-alert>

        <mi-alert variant="destructive" icon="AlertTriangle" title="Destructive Alert"
                  description="This is a destructive alert for errors or warnings.">
        </mi-alert>
      </div>
    `,
  }),
};

export const DifferentIcons: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <mi-alert icon="CheckCircle" title="Success"
                  description="Operation completed successfully.">
        </mi-alert>

        <mi-alert icon="Info" title="Information"
                  description="Here's some helpful information.">
        </mi-alert>

        <mi-alert icon="AlertCircle" title="Warning"
                  description="Please pay attention to this warning.">
        </mi-alert>

        <mi-alert variant="destructive" icon="XCircle" title="Error"
                  description="Something went wrong.">
        </mi-alert>
      </div>
    `,
  }),
};
