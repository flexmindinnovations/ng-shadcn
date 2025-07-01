import type { Meta, StoryObj } from '@storybook/angular';
import { CommandComponent, CommandItem, CommandGroup } from '../lib/mi-ui/command/command';

const meta: Meta<CommandComponent> = {
  title: 'Components/Command',
  component: CommandComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Fast, composable, unstyled command menu for Angular.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of command items',
    },
    groups: {
      control: 'object',
      description: 'Array of command groups',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no results are found',
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show the search input',
    },
  },
};

export default meta;
type Story = StoryObj<CommandComponent>;

const simpleItems: CommandItem[] = [
  { value: 'calendar', label: 'Calendar', icon: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { value: 'search-emoji', label: 'Search Emoji', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { value: 'calculator', label: 'Calculator', icon: 'M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z' },
];

const commandGroups: CommandGroup[] = [
  {
    name: 'Suggestions',
    items: [
      { value: 'calendar', label: 'Calendar', icon: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
      { value: 'search-emoji', label: 'Search Emoji', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
      { value: 'calculator', label: 'Calculator', icon: 'M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z' },
    ]
  },
  {
    name: 'Settings',
    items: [
      { value: 'profile', label: 'Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
      { value: 'billing', label: 'Billing', icon: 'M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z' },
      { value: 'settings', label: 'Settings', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
    ]
  }
];

export const Default: Story = {
  args: {
    items: simpleItems,
    placeholder: 'Type a command or search...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 h-64 border rounded-lg">
        <mi-command
          [items]="items"
          [placeholder]="placeholder"
          [emptyMessage]="emptyMessage"
          [showSearch]="showSearch"
          (itemSelect)="onItemSelect($event)">
        </mi-command>
      </div>
    `,
  }),
};

export const WithGroups: Story = {
  args: {
    groups: commandGroups,
    placeholder: 'Type a command or search...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 h-64 border rounded-lg">
        <mi-command
          [groups]="groups"
          [placeholder]="placeholder"
          [emptyMessage]="emptyMessage"
          [showSearch]="showSearch"
          (itemSelect)="onItemSelect($event)">
        </mi-command>
      </div>
    `,
  }),
};

export const WithoutSearch: Story = {
  args: {
    groups: commandGroups,
    placeholder: 'Select an option...',
    showSearch: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 h-64 border rounded-lg">
        <mi-command
          [groups]="groups"
          [placeholder]="placeholder"
          [showSearch]="showSearch"
          (itemSelect)="onItemSelect($event)">
        </mi-command>
      </div>
    `,
  }),
};

export const CustomEmpty: Story = {
  args: {
    items: simpleItems,
    placeholder: 'Search for commands...',
    emptyMessage: 'No commands found. Try a different search term.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80 h-64 border rounded-lg">
        <mi-command
          [items]="items"
          [placeholder]="placeholder"
          [emptyMessage]="emptyMessage"
          (itemSelect)="onItemSelect($event)">
        </mi-command>
      </div>
    `,
  }),
};
