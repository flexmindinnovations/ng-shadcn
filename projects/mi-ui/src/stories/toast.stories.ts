import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from '../lib/mi-ui/toast/toast';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    action: {
      control: 'text',
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'Your message has been sent successfully.',
    variant: 'default',
    closable: true,
  },
};

export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4 w-96">
        <mi-toast
          title="Default Toast"
          description="This is a default toast notification."
          variant="default"
          icon="Bell">
        </mi-toast>

        <mi-toast
          title="Success!"
          description="Your action was completed successfully."
          variant="success"
          icon="CheckCircle">
        </mi-toast>

        <mi-toast
          title="Warning"
          description="Please review your settings before continuing."
          variant="warning"
          icon="AlertTriangle">
        </mi-toast>

        <mi-toast
          title="Error"
          description="Something went wrong. Please try again."
          variant="destructive"
          icon="AlertCircle">
        </mi-toast>
      </div>
    `,
  }),
};

export const WithAction: Story = {
  args: {
    title: 'New Update Available',
    description: 'Version 2.0 is now available for download.',
    variant: 'default',
    icon: 'Download',
    action: 'Update',
    closable: true,
  },
};

export const SimpleMessage: Story = {
  args: {
    description: 'File saved successfully.',
    variant: 'success',
    icon: 'Check',
    closable: false,
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      showToast: false,
      toastType: 'default',
    },
    template: `
      <div class="space-y-4">
        <div class="flex gap-2">
          <button
            (click)="showToast = true; toastType = 'default'"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Show Default
          </button>
          <button
            (click)="showToast = true; toastType = 'success'"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Show Success
          </button>
          <button
            (click)="showToast = true; toastType = 'warning'"
            class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
            Show Warning
          </button>
          <button
            (click)="showToast = true; toastType = 'destructive'"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Show Error
          </button>
        </div>

        <div *ngIf="showToast" class="w-96">
          <mi-toast
            [title]="toastType === 'default' ? 'Notification' :
                    toastType === 'success' ? 'Success!' :
                    toastType === 'warning' ? 'Warning' : 'Error'"
            [description]="toastType === 'default' ? 'This is a default notification.' :
                         toastType === 'success' ? 'Action completed successfully.' :
                         toastType === 'warning' ? 'Please review your input.' : 'Something went wrong.'"
            [variant]="toastType"
            [icon]="toastType === 'default' ? 'Bell' :
                    toastType === 'success' ? 'CheckCircle' :
                    toastType === 'warning' ? 'AlertTriangle' : 'AlertCircle'"
            (close)="showToast = false">
          </mi-toast>
        </div>
      </div>
    `,
  }),
};
