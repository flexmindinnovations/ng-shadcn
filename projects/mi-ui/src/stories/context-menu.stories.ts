import type { Meta, StoryObj } from '@storybook/angular';
import { ContextMenu, ContextMenuItem } from '../lib/mi-ui/context-menu/context-menu';

const meta: Meta<ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContextMenu>;

const defaultMenuItems: ContextMenuItem[] = [
  { label: 'Back', shortcut: '⌘[' },
  { label: 'Forward', shortcut: '⌘]', disabled: true },
  { label: 'Reload', shortcut: '⌘R' },
  { label: 'More Tools', children: [
    { label: 'Save Page As...', shortcut: '⌘⇧S' },
    { label: 'Create Shortcut...' },
    { label: 'Name Window...' },
  ]},
  { label: 'Developer Tools', shortcut: '⌘⇧I' },
];

export const Default: Story = {
  args: {
    menuItems: defaultMenuItems,
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelected: (item: ContextMenuItem) => {
        console.log('Selected:', item.label);
      }
    },
    template: `
      <mi-context-menu [menuItems]="menuItems" (itemSelected)="onItemSelected($event)">
        <div class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </div>
      </mi-context-menu>
    `,
  }),
};

export const WithActions: Story = {
  args: {
    menuItems: [
      {
        label: 'Cut',
        shortcut: '⌘X',
        action: () => console.log('Cut action')
      },
      {
        label: 'Copy',
        shortcut: '⌘C',
        action: () => console.log('Copy action')
      },
      {
        label: 'Paste',
        shortcut: '⌘V',
        action: () => console.log('Paste action')
      },
      {
        label: 'Delete',
        destructive: true,
        action: () => console.log('Delete action')
      },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelected: (item: ContextMenuItem) => {
        console.log('Selected:', item.label);
      }
    },
    template: `
      <mi-context-menu [menuItems]="menuItems" (itemSelected)="onItemSelected($event)">
        <div class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click for edit menu
        </div>
      </mi-context-menu>
    `,
  }),
};
