import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from '../lib/mi-ui/tabs/tabs';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline'],
    },
    value: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

const basicTabs = [
  { value: 'tab1', label: 'Account' },
  { value: 'tab2', label: 'Password' },
  { value: 'tab3', label: 'Settings' },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultValue: 'tab1',
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-96">
        <mi-tabs [tabs]="tabs" [defaultValue]="defaultValue" [variant]="variant">
          <div class="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h3 class="text-lg font-medium mb-2">Account Information</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </mi-tabs>
      </div>
    `,
  }),
};

export const Underline: Story = {
  args: {
    tabs: basicTabs,
    defaultValue: 'tab1',
    variant: 'underline',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-96">
        <mi-tabs [tabs]="tabs" [defaultValue]="defaultValue" [variant]="variant">
          <div class="mt-4 p-4">
            <h3 class="text-lg font-medium mb-2">Account Information</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </mi-tabs>
      </div>
    `,
  }),
};

export const WithDisabled: Story = {
  render: (args) => ({
    props: {
      tabs: [
        { value: 'general', label: 'General' },
        { value: 'security', label: 'Security' },
        { value: 'integrations', label: 'Integrations', disabled: true },
        { value: 'advanced', label: 'Advanced' },
      ],
      defaultValue: 'general',
    },
    template: `
      <div class="w-96">
        <mi-tabs [tabs]="tabs" [defaultValue]="defaultValue">
          <div class="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h3 class="text-lg font-medium mb-2">Settings</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Configure your application settings. Some sections may be disabled.
            </p>
          </div>
        </mi-tabs>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      tabs: [
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'reports', label: 'Reports' },
        { value: 'notifications', label: 'Notifications' },
      ],
      currentTab: 'overview',
    },
    template: `
      <div class="w-full max-w-2xl">
        <mi-tabs
          [tabs]="tabs"
          [value]="currentTab"
          (valueChange)="currentTab = $event">

          <div class="mt-6">
            <div *ngIf="currentTab === 'overview'" class="space-y-4">
              <h3 class="text-lg font-medium">Overview</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Get a high-level view of your dashboard metrics and key performance indicators.
              </p>
              <div class="grid grid-cols-3 gap-4">
                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="text-2xl font-bold">1,234</div>
                  <div class="text-sm text-gray-500">Total Users</div>
                </div>
                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="text-2xl font-bold">56</div>
                  <div class="text-sm text-gray-500">Active Sessions</div>
                </div>
                <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="text-2xl font-bold">89%</div>
                  <div class="text-sm text-gray-500">Uptime</div>
                </div>
              </div>
            </div>

            <div *ngIf="currentTab === 'analytics'" class="space-y-4">
              <h3 class="text-lg font-medium">Analytics</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Detailed analytics and insights about your application usage.
              </p>
              <div class="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span class="text-gray-500">Analytics Chart Placeholder</span>
              </div>
            </div>

            <div *ngIf="currentTab === 'reports'" class="space-y-4">
              <h3 class="text-lg font-medium">Reports</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Generate and view detailed reports for your data.
              </p>
              <div class="space-y-2">
                <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="font-medium">Monthly Report</div>
                  <div class="text-sm text-gray-500">Generated 2 hours ago</div>
                </div>
                <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="font-medium">Weekly Summary</div>
                  <div class="text-sm text-gray-500">Generated 1 day ago</div>
                </div>
              </div>
            </div>

            <div *ngIf="currentTab === 'notifications'" class="space-y-4">
              <h3 class="text-lg font-medium">Notifications</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Manage your notification preferences and settings.
              </p>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span>Email notifications</span>
                  <input type="checkbox" checked class="rounded">
                </div>
                <div class="flex items-center justify-between">
                  <span>Push notifications</span>
                  <input type="checkbox" class="rounded">
                </div>
                <div class="flex items-center justify-between">
                  <span>SMS notifications</span>
                  <input type="checkbox" class="rounded">
                </div>
              </div>
            </div>
          </div>
        </mi-tabs>
      </div>
    `,
  }),
};
