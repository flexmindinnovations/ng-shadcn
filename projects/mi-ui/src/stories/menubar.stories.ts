import type { Meta, StoryObj } from '@storybook/angular';
import { MenubarComponent, MenubarMenu } from '../lib/mi-ui/menubar/menubar';

const meta: Meta<MenubarComponent> = {
  title: 'Components/Menubar',
  component: MenubarComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    menus: {
      control: 'object',
      description: 'Array of menu configurations',
    },
  },
};

export default meta;
type Story = StoryObj<MenubarComponent>;

const defaultMenus: MenubarMenu[] = [
  {
    label: 'File',
    value: 'file',
    items: [
      {
        label: 'New Tab',
        value: 'new-tab',
        shortcut: '⌘T',
        icon: 'M5 12h14m-7-7v14'
      },
      {
        label: 'New Window',
        value: 'new-window',
        shortcut: '⌘N',
        icon: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'
      },
      { separator: true },
      {
        label: 'Share',
        value: 'share',
        children: [
          {
            label: 'Email Link',
            value: 'email-link',
            icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
          },
          {
            label: 'Copy Link',
            value: 'copy-link',
            icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'
          },
          {
            label: 'Social Media',
            value: 'social-media',
            icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
          }
        ]
      },
      { separator: true },
      {
        label: 'Print',
        value: 'print',
        shortcut: '⌘P',
        icon: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z'
      },
      {
        label: 'Exit',
        value: 'exit',
        shortcut: '⌘Q'
      }
    ]
  },
  {
    label: 'Edit',
    value: 'edit',
    items: [
      {
        label: 'Undo',
        value: 'undo',
        shortcut: '⌘Z',
        icon: 'M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13'
      },
      {
        label: 'Redo',
        value: 'redo',
        shortcut: '⌘Y',
        icon: 'M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3-2.3'
      },
      { separator: true },
      {
        label: 'Cut',
        value: 'cut',
        shortcut: '⌘X',
        icon: 'M6 6l12 12M6 18L18 6'
      },
      {
        label: 'Copy',
        value: 'copy',
        shortcut: '⌘C',
        icon: 'M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z'
      },
      {
        label: 'Paste',
        value: 'paste',
        shortcut: '⌘V',
        icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'
      },
      { separator: true },
      {
        label: 'Find',
        value: 'find',
        shortcut: '⌘F',
        icon: 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z'
      },
      {
        label: 'Replace',
        value: 'replace',
        shortcut: '⌘H'
      }
    ]
  },
  {
    label: 'View',
    value: 'view',
    items: [
      {
        label: 'Zoom In',
        value: 'zoom-in',
        shortcut: '⌘+',
        icon: 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z'
      },
      {
        label: 'Zoom Out',
        value: 'zoom-out',
        shortcut: '⌘-',
        icon: 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z'
      },
      {
        label: 'Reset Zoom',
        value: 'reset-zoom',
        shortcut: '⌘0'
      },
      { separator: true },
      {
        label: 'Toggle Fullscreen',
        value: 'fullscreen',
        shortcut: 'F11',
        icon: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'
      },
      {
        label: 'Toggle Sidebar',
        value: 'toggle-sidebar',
        shortcut: '⌘B'
      }
    ]
  },
  {
    label: 'Help',
    value: 'help',
    items: [
      {
        label: 'Documentation',
        value: 'docs',
        icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'
      },
      {
        label: 'Keyboard Shortcuts',
        value: 'shortcuts',
        shortcut: '⌘/'
      },
      { separator: true },
      {
        label: 'Report Issue',
        value: 'report-issue',
        icon: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'
      },
      {
        label: 'About',
        value: 'about',
        icon: 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z'
      }
    ]
  }
];

export const Default: Story = {
  args: {
    menus: defaultMenus,
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelect: (event: any) => {
        console.log('Menu item selected:', event);
        alert(`Selected: ${event.item.label} from ${event.menu.label} menu`);
      },
    },
    template: `
      <div class="w-full max-w-md">
        <mi-menubar
          [menus]="menus"
          (itemSelect)="onItemSelect($event)">
        </mi-menubar>
      </div>
    `,
  }),
};

const simpleMenus: MenubarMenu[] = [
  {
    label: 'File',
    value: 'file',
    items: [
      { label: 'New', value: 'new', shortcut: '⌘N' },
      { label: 'Open', value: 'open', shortcut: '⌘O' },
      { label: 'Save', value: 'save', shortcut: '⌘S' },
      { separator: true },
      { label: 'Exit', value: 'exit' }
    ]
  },
  {
    label: 'Edit',
    value: 'edit',
    items: [
      { label: 'Cut', value: 'cut', shortcut: '⌘X' },
      { label: 'Copy', value: 'copy', shortcut: '⌘C' },
      { label: 'Paste', value: 'paste', shortcut: '⌘V' }
    ]
  }
];

export const Simple: Story = {
  args: {
    menus: simpleMenus,
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelect: (event: any) => {
        console.log('Simple menu item selected:', event);
      },
    },
    template: `
      <div class="w-full max-w-sm">
        <mi-menubar
          [menus]="menus"
          (itemSelect)="onItemSelect($event)">
        </mi-menubar>
      </div>
    `,
  }),
};

const applicationMenus: MenubarMenu[] = [
  {
    label: 'App',
    value: 'app',
    items: [
      { label: 'About App', value: 'about' },
      { label: 'Preferences', value: 'preferences', shortcut: '⌘,' },
      { separator: true },
      { label: 'Quit App', value: 'quit', shortcut: '⌘Q' }
    ]
  },
  {
    label: 'Window',
    value: 'window',
    items: [
      { label: 'Minimize', value: 'minimize', shortcut: '⌘M' },
      { label: 'Close', value: 'close', shortcut: '⌘W' },
      { separator: true },
      { label: 'Bring All to Front', value: 'bring-all-front' }
    ]
  }
];

export const ApplicationStyle: Story = {
  args: {
    menus: applicationMenus,
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelect: (event: any) => {
        console.log('Application menu item selected:', event);
      },
    },
    template: `
      <div class="w-full max-w-xs">
        <mi-menubar
          [menus]="menus"
          (itemSelect)="onItemSelect($event)">
        </mi-menubar>
      </div>
    `,
  }),
};
