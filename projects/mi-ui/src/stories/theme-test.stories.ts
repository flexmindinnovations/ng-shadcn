import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../lib/mi-ui/button/button';
import { CardComponent } from '../lib/mi-ui/card/card';
import { BadgeComponent } from '../lib/mi-ui/badge/badge';

const meta: Meta = {
  title: 'Theme/Theme Test',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Button, CardComponent, BadgeComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="p-6 space-y-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-foreground">Theme Test - All Component Variants</h2>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
              onclick="document.documentElement.setAttribute('data-mode', 'light'); document.documentElement.classList.remove('dark'); console.log('🎨 Manual: Switched to Light');">
              ☀️ Light
            </button>
            <button
              class="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
              onclick="document.documentElement.setAttribute('data-mode', 'dark'); document.documentElement.classList.add('dark'); console.log('🎨 Manual: Switched to Dark');">
              🌙 Dark
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-foreground">Button Variants:</h3>
          <div class="flex flex-wrap gap-2">
            <mi-button variant="default">Default</mi-button>
            <mi-button variant="primary">Primary</mi-button>
            <mi-button variant="secondary">Secondary</mi-button>
            <mi-button variant="outline">Outline</mi-button>
            <mi-button variant="ghost">Ghost</mi-button>
            <mi-button variant="destructive">Destructive</mi-button>
            <mi-button variant="link">Link</mi-button>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-foreground">Card Variants:</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <mi-card variant="default">
              <div class="p-4">
                <h4 class="font-semibold">Default Card</h4>
                <p class="text-sm text-muted-foreground">This is a default card variant.</p>
              </div>
            </mi-card>

            <mi-card variant="elevated">
              <div class="p-4">
                <h4 class="font-semibold">Elevated Card</h4>
                <p class="text-sm text-muted-foreground">This is an elevated card variant.</p>
              </div>
            </mi-card>

            <mi-card variant="outline">
              <div class="p-4">
                <h4 class="font-semibold">Outline Card</h4>
                <p class="text-sm text-muted-foreground">This is an outline card variant.</p>
              </div>
            </mi-card>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-foreground">Badge Variants:</h3>
          <div class="flex flex-wrap gap-2">
            <mi-badge variant="default">Default</mi-badge>
            <mi-badge variant="secondary">Secondary</mi-badge>
            <mi-badge variant="destructive">Destructive</mi-badge>
            <mi-badge variant="outline">Outline</mi-badge>
          </div>
        </div>

        <div class="mt-8 p-4 bg-muted rounded-lg">
          <p class="text-sm text-muted-foreground">
            🎨 <strong>Theme Testing:</strong> Use the Light/Dark buttons above to test theme switching.
            Check the browser console for debug logs. Also try the theme toggle in the Storybook toolbar (☀️/🌙).
          </p>
        </div>
      </div>
    `,
  }),
};

export const ThemeVariables: Story = {
  render: () => ({
    template: `
      <div class="p-6 space-y-6" style="background-color: var(--background); color: var(--foreground); min-height: 100vh;">
        <h2 class="text-2xl font-bold text-foreground">CSS Variables Test</h2>

        <!-- Diagnostic Info -->
        <div class="mb-6 p-4 border rounded" style="border-color: var(--border);">
          <h3 class="font-semibold mb-2">Diagnostic Info:</h3>
          <div class="text-sm space-y-1">
            <div>HTML data-mode: <span id="data-mode-value">[checking...]</span></div>
            <div>HTML class list: <span id="class-list-value">[checking...]</span></div>
            <div>Background color: <span id="bg-color" style="padding: 2px 8px; border: 1px solid; background-color: var(--background);">var(--background)</span></div>
            <div>Primary color: <span id="primary-color" style="padding: 2px 8px; background-color: var(--primary); color: var(--primary-foreground);">var(--primary)</span></div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 rounded-lg" style="background-color: var(--background); border: 1px solid var(--border);">
            <div class="text-sm font-medium" style="color: var(--foreground);">Background</div>
            <div class="text-xs" style="color: var(--muted-foreground);">var(--background)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--primary); color: var(--primary-foreground);">
            <div class="text-sm font-medium">Primary</div>
            <div class="text-xs opacity-80">var(--primary)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--secondary); color: var(--secondary-foreground);">
            <div class="text-sm font-medium">Secondary</div>
            <div class="text-xs opacity-80">var(--secondary)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--muted); color: var(--muted-foreground);">
            <div class="text-sm font-medium">Muted</div>
            <div class="text-xs opacity-80">var(--muted)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--accent); color: var(--accent-foreground);">
            <div class="text-sm font-medium">Accent</div>
            <div class="text-xs opacity-80">var(--accent)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--destructive); color: var(--destructive-foreground);">
            <div class="text-sm font-medium">Destructive</div>
            <div class="text-xs opacity-80">var(--destructive)</div>
          </div>

          <div class="p-4 rounded-lg" style="background-color: var(--card); color: var(--card-foreground); border: 1px solid var(--border);">
            <div class="text-sm font-medium">Card</div>
            <div class="text-xs opacity-80">var(--card)</div>
          </div>

          <div class="p-4 rounded-lg border" style="border-color: var(--ring); background-color: var(--background); color: var(--foreground);">
            <div class="text-sm font-medium">Ring/Border</div>
            <div class="text-xs" style="color: var(--muted-foreground);">var(--ring)</div>
          </div>
        </div>

        <div class="flex gap-2 mt-6">
          <button
            class="px-4 py-2 rounded"
            style="background-color: var(--primary); color: var(--primary-foreground);"
            onclick="
              document.documentElement.setAttribute('data-mode', 'light');
              document.documentElement.classList.remove('dark');
              updateDiagnostics();
              console.log('🎨 Manual: Switched to Light');
            ">
            ☀️ Light
          </button>
          <button
            class="px-4 py-2 rounded"
            style="background-color: var(--primary); color: var(--primary-foreground);"
            onclick="
              document.documentElement.setAttribute('data-mode', 'dark');
              document.documentElement.classList.add('dark');
              updateDiagnostics();
              console.log('🎨 Manual: Switched to Dark');
            ">
            🌙 Dark
          </button>
        </div>

        <script>
          function updateDiagnostics() {
            setTimeout(() => {
              document.getElementById('data-mode-value').textContent = document.documentElement.getAttribute('data-mode') || 'none';
              document.getElementById('class-list-value').textContent = document.documentElement.className || 'none';
            }, 100);
          }
          updateDiagnostics();
        </script>

        <div class="mt-8 p-4" style="background-color: var(--muted); color: var(--muted-foreground); border-radius: 8px;">
          <p class="text-sm">
            Each color box should show different values when switching between light and dark themes.
            Use the buttons above to test manual theme switching.
          </p>
        </div>
      </div>
    `,
  }),
};
