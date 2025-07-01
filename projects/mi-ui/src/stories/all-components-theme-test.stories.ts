import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Theme Test/All Components Theme Test',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive test of all components with theme variables. Toggle between light and dark themes to see all components adapt.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="space-y-8 p-6 bg-background text-foreground">
        <div class="space-y-4">
          <h1 class="text-2xl font-bold">Theme Variable Test</h1>
          <p class="text-muted-foreground">All components should respect the theme variables and change when you toggle between light and dark modes.</p>
        </div>

        <!-- Card Component -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Cards</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 class="font-semibold">Default Card</h3>
              <p class="text-sm text-muted-foreground mt-2">This card uses theme variables</p>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-lg p-6">
              <h3 class="font-semibold">Elevated Card</h3>
              <p class="text-sm text-muted-foreground mt-2">With more shadow</p>
            </div>
          </div>
        </div>

        <!-- Badges -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Badges</h2>
          <div class="flex gap-2">
            <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-primary text-primary-foreground">Primary</span>
            <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground">Secondary</span>
          </div>
        </div>

        <!-- Alerts -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Alerts</h2>
          <div class="relative w-full rounded-lg border px-4 py-3 text-sm bg-background text-foreground">
            <strong>Info:</strong> This alert uses theme variables for proper theming.
          </div>
        </div>

        <!-- Separators -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Separators</h2>
          <div class="shrink-0 bg-border h-[1px] w-full"></div>
        </div>

        <!-- Progress -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Progress</h2>
          <div class="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
            <div class="h-full bg-primary transition-all" style="width: 60%"></div>
          </div>
        </div>

        <!-- Skeleton -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Skeleton</h2>
          <div class="space-y-2">
            <div class="animate-pulse rounded-md bg-muted h-4 w-[250px]"></div>
            <div class="animate-pulse rounded-md bg-muted h-4 w-[200px]"></div>
          </div>
        </div>

        <!-- Form Elements -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Form Elements</h2>
          <div class="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Themed input"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <textarea
              placeholder="Themed textarea"
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>
        </div>

        <!-- Tabs -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Tabs</h2>
          <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground shadow-sm">Tab 1</div>
            <div class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Tab 2</div>
          </div>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const AllComponentsTest: Story = {};

export const ForceDarkMode: Story = {
  globals: { theme: 'dark' },
};

export const ForceLightMode: Story = {
  globals: { theme: 'light' },
};
