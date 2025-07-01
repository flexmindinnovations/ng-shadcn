import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../lib/mi-ui/checkbox/checkbox';
import { IconComponent } from '../lib/mi-ui/icon/icon';
import { IconService } from '../lib/services/icon.service';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component for selecting options.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxComponent,
        IconComponent,
      ],
      providers: [IconService],
    }),
    applicationConfig({
      providers: [IconService],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    size: 'default',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-checkbox
        [size]="size"
        [checked]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [class]="class">
        Accept terms and conditions
      </mi-checkbox>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <mi-checkbox size="sm">Small checkbox</mi-checkbox>
        <mi-checkbox size="default">Default checkbox</mi-checkbox>
        <mi-checkbox size="lg">Large checkbox</mi-checkbox>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <mi-checkbox [checked]="false">Unchecked</mi-checkbox>
        <mi-checkbox [checked]="true">Checked</mi-checkbox>
        <mi-checkbox [indeterminate]="true">Indeterminate</mi-checkbox>
        <mi-checkbox [disabled]="true">Disabled unchecked</mi-checkbox>
        <mi-checkbox [checked]="true" [disabled]="true">Disabled checked</mi-checkbox>
        <mi-checkbox [indeterminate]="true" [disabled]="true">Disabled indeterminate</mi-checkbox>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <mi-checkbox>
          I agree to the terms and conditions
        </mi-checkbox>
        <mi-checkbox>
          Subscribe to newsletter for updates and promotions
        </mi-checkbox>
        <mi-checkbox [checked]="true">
          Remember my preferences
        </mi-checkbox>
        <mi-checkbox [indeterminate]="true">
          Enable notifications (some selected)
        </mi-checkbox>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: () => ({
    template: `
      <div class="space-y-6" style="max-width: 400px;">
        <h3 class="text-lg font-semibold">Privacy Settings</h3>
        <div class="space-y-4">
          <div class="space-y-3">
            <h4 class="text-sm font-medium">Email Notifications</h4>
            <div class="space-y-2 ml-4">
              <mi-checkbox [checked]="true">Security alerts</mi-checkbox>
              <mi-checkbox>Marketing emails</mi-checkbox>
              <mi-checkbox [checked]="true">Product updates</mi-checkbox>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-sm font-medium">Data Usage</h4>
            <div class="space-y-2 ml-4">
              <mi-checkbox [checked]="true">Analytics tracking</mi-checkbox>
              <mi-checkbox>Performance monitoring</mi-checkbox>
              <mi-checkbox [disabled]="true">Required cookies (cannot be disabled)</mi-checkbox>
            </div>
          </div>

          <div class="pt-4 border-t">
            <mi-checkbox [indeterminate]="true">
              <span class="font-medium">Select all preferences</span>
            </mi-checkbox>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ListExample: Story = {
  render: () => ({
    template: `
      <div class="space-y-4" style="max-width: 300px;">
        <h3 class="text-lg font-semibold">Todo List</h3>
        <div class="space-y-2">
          <mi-checkbox [checked]="true" class="line-through opacity-60">
            Set up project repository
          </mi-checkbox>
          <mi-checkbox [checked]="true" class="line-through opacity-60">
            Create initial components
          </mi-checkbox>
          <mi-checkbox>
            Add form validation
          </mi-checkbox>
          <mi-checkbox>
            Write comprehensive tests
          </mi-checkbox>
          <mi-checkbox>
            Deploy to production
          </mi-checkbox>
        </div>
      </div>
    `,
  }),
};
