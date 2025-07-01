import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DropdownMenu, DropdownMenuItem } from '../lib/mi-ui/dropdown-menu/dropdown-menu';
import { Button } from '../lib/mi-ui/button/button';

const meta: Meta<DropdownMenu> = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DropdownMenu, Button],
    }),
  ],
  args: {
    items: [
      { label: 'Profile', value: 'profile', shortcut: '⇧⌘P' },
      { label: 'Billing', value: 'billing' },
      { label: 'Settings', value: 'settings', shortcut: '⌘,' },
      { separator: true, label: '' },
      { label: 'Logout', value: 'logout' },
    ],
    open: false,
    placement: 'bottom',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items'
    },
    open: {
      control: 'boolean',
      description: 'Whether the menu is open'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of the menu relative to trigger'
    }
  },
};

export default meta;
type Story = StoryObj<DropdownMenu>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      onItemClick(item: DropdownMenuItem) {
        console.log('Clicked item:', item);
      }
    },
    template: `
      <div class="p-8 flex justify-center">
        <mi-dropdown-menu [items]="items" [placement]="placement" (itemClick)="onItemClick($event)">
          <mi-button variant="outline">Open Menu</mi-button>
        </mi-dropdown-menu>
      </div>
    `,
  }),
};

export const UserAccountMenu: Story = {
  render: (args) => ({
    props: {
      items: [
        { label: 'My Profile', value: 'profile', icon: '👤' },
        { label: 'Account Settings', value: 'settings', icon: '⚙️' },
        { label: 'Billing', value: 'billing', icon: '💳' },
        { separator: true, label: '' },
        { label: 'Team Settings', value: 'team', icon: '👥' },
        { label: 'Invite Users', value: 'invite', icon: '➕', shortcut: '⌘+I' },
        { separator: true, label: '' },
        { label: 'Help & Support', value: 'help', icon: '❓' },
        { label: 'Sign Out', value: 'signout', icon: '🚪' },
      ],
      onItemClick(item: DropdownMenuItem) {
        console.log('Account action:', item.value);
      }
    },
    template: `
      <div class="p-8 flex justify-center">
        <mi-dropdown-menu [items]="items" (itemClick)="onItemClick($event)">
          <mi-button>
            John Doe
            <span class="ml-2">▼</span>
          </mi-button>
        </mi-dropdown-menu>
      </div>
    `,
  }),
};

export const FileMenu: Story = {
  render: (args) => ({
    props: {
      items: [
        { label: 'New File', value: 'new', shortcut: '⌘N' },
        { label: 'Open File', value: 'open', shortcut: '⌘O' },
        { label: 'Open Recent', value: 'recent', shortcut: '⌘⇧O' },
        { separator: true, label: '' },
        { label: 'Save', value: 'save', shortcut: '⌘S' },
        { label: 'Save As...', value: 'saveas', shortcut: '⌘⇧S' },
        { separator: true, label: '' },
        { label: 'Import', value: 'import' },
        { label: 'Export', value: 'export', disabled: true },
        { separator: true, label: '' },
        { label: 'Print', value: 'print', shortcut: '⌘P' },
      ],
      onItemClick(item: DropdownMenuItem) {
        console.log('File action:', item.value);
      }
    },
    template: `
      <div class="p-8 flex justify-center">
        <mi-dropdown-menu [items]="items" (itemClick)="onItemClick($event)">
          <mi-button variant="ghost">File</mi-button>
        </mi-dropdown-menu>
      </div>
    `,
  }),
};

export const WithDisabledItems: Story = {
  render: (args) => ({
    props: {
      items: [
        { label: 'Edit', value: 'edit' },
        { label: 'Copy', value: 'copy', shortcut: '⌘C' },
        { label: 'Paste', value: 'paste', shortcut: '⌘V', disabled: true },
        { separator: true, label: '' },
        { label: 'Delete', value: 'delete', disabled: true },
        { label: 'Rename', value: 'rename' },
      ],
      onItemClick(item: DropdownMenuItem) {
        console.log('Context action:', item.value);
      }
    },
    template: `
      <div class="p-8 flex justify-center">
        <mi-dropdown-menu [items]="items" (itemClick)="onItemClick($event)">
          <mi-button variant="outline">Right Click Menu</mi-button>
        </mi-dropdown-menu>
      </div>
    `,
  }),
};
