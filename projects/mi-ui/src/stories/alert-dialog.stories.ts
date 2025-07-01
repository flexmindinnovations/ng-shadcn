import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertDialog } from '../lib/mi-ui/alert-dialog/alert-dialog';

const meta: Meta<AlertDialog> = {
  title: 'Components/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AlertDialog],
    }),
  ],
  args: {
    open: false,
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    confirmText: 'Continue',
    cancelText: 'Cancel',
    destructive: false,
    loading: false,
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open'
    },
    title: {
      control: 'text',
      description: 'Dialog title'
    },
    description: {
      control: 'text',
      description: 'Dialog description text'
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button'
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button'
    },
    destructive: {
      control: 'boolean',
      description: 'Whether to show destructive styling on confirm button'
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state'
    }
  },
};

export default meta;
type Story = StoryObj<AlertDialog>;

export const Default: Story = {
  args: {
    open: true,
  },
};

export const Destructive: Story = {
  args: {
    open: true,
    destructive: true,
    title: 'Delete Account',
    description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    confirmText: 'Delete Account',
  },
};

export const Loading: Story = {
  args: {
    open: true,
    loading: true,
    title: 'Processing Request',
    description: 'Please wait while we process your request.',
    confirmText: 'Processing...',
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: false,
      showDialog() {
        this['dialogOpen'] = true;
      },
      hideDialog() {
        this['dialogOpen'] = false;
      },
      onConfirm() {
        console.log('Confirmed!');
        this['hideDialog']();
      },
      onCancel() {
        console.log('Cancelled!');
        this['hideDialog']();
      }
    },
    template: `
      <div class="p-4">
        <mi-button (click)="showDialog()">Show Alert Dialog</mi-button>

        <mi-alert-dialog
          [open]="dialogOpen"
          title="Delete Project"
          description="Are you sure you want to delete this project? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          [destructive]="true"
          (confirm)="onConfirm()"
          (cancel)="onCancel()"
          (openChange)="dialogOpen = $event">
        </mi-alert-dialog>
      </div>
    `,
  }),
};
