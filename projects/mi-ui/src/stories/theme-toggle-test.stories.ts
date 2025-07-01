import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Theme Test/Theme Toggle Check',
  parameters: {
    layout: 'centered',
  },
  render: () => ({
    template: `
      <div class="p-8 rounded-lg border bg-card text-card-foreground">
        <h1 class="text-2xl font-bold mb-4">Theme Toggle Test</h1>
        <div class="space-y-4">
          <div class="p-4 bg-background border rounded">
            <p class="text-foreground">Background: <span class="text-muted-foreground">This should change color</span></p>
          </div>
          <div class="p-4 bg-primary text-primary-foreground rounded">
            <p>Primary Background</p>
          </div>
          <div class="p-4 bg-secondary text-secondary-foreground rounded">
            <p>Secondary Background</p>
          </div>
          <div class="p-4 bg-muted text-muted-foreground rounded">
            <p>Muted Background</p>
          </div>
        </div>
        <div class="mt-4 text-sm text-muted-foreground">
          <p>Current theme class: <span id="theme-class"></span></p>
          <p>Current data-mode: <span id="data-mode"></span></p>
        </div>
      </div>
      <script>
        setTimeout(() => {
          document.getElementById('theme-class').textContent = document.documentElement.className || 'none';
          document.getElementById('data-mode').textContent = document.documentElement.getAttribute('data-mode') || 'none';
        }, 100);
      </script>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ForceDark: Story = {
  globals: { theme: 'dark' },
};

export const ForceLight: Story = {
  globals: { theme: 'light' },
};
