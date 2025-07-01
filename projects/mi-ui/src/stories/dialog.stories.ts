import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from '../lib/mi-ui/dialog/dialog';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: { type: 'boolean' },
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
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Dialog Title',
    description: 'This is a dialog description that provides more context.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-dialog [open]="open" [title]="title" [description]="description">
        <p>This is the dialog content. You can put any content here.</p>
        <div slot="footer" class="flex justify-end space-x-2">
          <mi-button variant="outline">Cancel</mi-button>
          <mi-button>Confirm</mi-button>
        </div>
      </mi-dialog>
    `,
  }),
};

export const WithoutDescription: Story = {
  args: {
    open: true,
    title: 'Simple Dialog',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-dialog [open]="open" [title]="title">
        <p>This dialog only has a title and content.</p>
        <div slot="footer" class="flex justify-end space-x-2">
          <mi-button variant="outline">Cancel</mi-button>
          <mi-button>Save</mi-button>
        </div>
      </mi-dialog>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    open: true,
    title: 'Edit Profile',
    description: 'Make changes to your profile here. Click save when you\'re done.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-dialog [open]="open" [title]="title" [description]="description">
        <div class="grid gap-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="name" class="text-right text-sm font-medium">Name</label>
            <mi-input id="name" value="John Doe" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="email" class="text-right text-sm font-medium">Email</label>
            <mi-input id="email" value="john@example.com" class="col-span-3" />
          </div>
        </div>
        <div slot="footer" class="flex justify-end space-x-2">
          <mi-button variant="outline">Cancel</mi-button>
          <mi-button>Save changes</mi-button>
        </div>
      </mi-dialog>
    `,
  }),
};

export const ConfirmationDialog: Story = {
  args: {
    open: true,
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-dialog [open]="open" [title]="title" [description]="description">
        <div slot="footer" class="flex justify-end space-x-2">
          <mi-button variant="outline">Cancel</mi-button>
          <mi-button variant="destructive">Delete account</mi-button>
        </div>
      </mi-dialog>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    open: false,
    title: 'Interactive Dialog',
    description: 'Click the button to open the dialog.',
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: false,
      openDialog: function() {
        (this as any)['dialogOpen'] = true;
      },
      closeDialog: function() {
        (this as any)['dialogOpen'] = false;
      }
    },
    template: `
      <div>
        <mi-button (click)="openDialog()">Open Dialog</mi-button>

        <mi-dialog
          [open]="dialogOpen"
          [title]="title"
          [description]="description"
          (openChange)="dialogOpen = $event"
          (close)="closeDialog()">
          <p>This is an interactive dialog that you can open and close.</p>
          <div slot="footer" class="flex justify-end space-x-2">
            <mi-button variant="outline" (click)="closeDialog()">Cancel</mi-button>
            <mi-button (click)="closeDialog()">OK</mi-button>
          </div>
        </mi-dialog>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  args: {
    open: true,
    title: 'Dialog with Long Content',
    description: 'This dialog contains a lot of content to test scrolling behavior.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-dialog [open]="open" [title]="title" [description]="description">
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.</p>
          <p>Qui ratione voluptatem sequi nesciunt neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
        </div>
        <div slot="footer" class="flex justify-end space-x-2">
          <mi-button variant="outline">Cancel</mi-button>
          <mi-button>Accept</mi-button>
        </div>
      </mi-dialog>
    `,
  }),
};
