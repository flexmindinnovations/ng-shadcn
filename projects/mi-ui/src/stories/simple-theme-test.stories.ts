import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Theme/Simple Test',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const BasicThemeTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem; min-height: 100vh; background-color: var(--background); color: var(--foreground);">
        <h1 style="color: var(--foreground); margin-bottom: 2rem;">Simple Theme Test</h1>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">

          <div style="padding: 1rem; background-color: var(--primary); color: var(--primary-foreground); border-radius: 8px;">
            <h3>Primary</h3>
            <p>Background: var(--primary)</p>
            <p>Text: var(--primary-foreground)</p>
          </div>

          <div style="padding: 1rem; background-color: var(--secondary); color: var(--secondary-foreground); border-radius: 8px;">
            <h3>Secondary</h3>
            <p>Background: var(--secondary)</p>
            <p>Text: var(--secondary-foreground)</p>
          </div>

          <div style="padding: 1rem; background-color: var(--card); color: var(--card-foreground); border: 1px solid var(--border); border-radius: 8px;">
            <h3>Card</h3>
            <p>Background: var(--card)</p>
            <p>Border: var(--border)</p>
          </div>

          <div style="padding: 1rem; background-color: var(--muted); color: var(--muted-foreground); border-radius: 8px;">
            <h3>Muted</h3>
            <p>Background: var(--muted)</p>
            <p>Text: var(--muted-foreground)</p>
          </div>

        </div>

        <div style="margin-bottom: 2rem;">
          <h2 style="margin-bottom: 1rem;">Manual Theme Switch</h2>
          <button
            style="padding: 0.5rem 1rem; margin-right: 0.5rem; background-color: var(--primary); color: var(--primary-foreground); border: none; border-radius: 4px; cursor: pointer;"
            onclick="
              document.documentElement.setAttribute('data-mode', 'light');
              document.documentElement.classList.remove('dark');
              console.log('🎨 Manual: Switched to Light');
              console.log('🎨 Current data-mode:', document.documentElement.getAttribute('data-mode'));
              console.log('🎨 Current classes:', document.documentElement.className);
            ">
            ☀️ Light Mode
          </button>
          <button
            style="padding: 0.5rem 1rem; background-color: var(--primary); color: var(--primary-foreground); border: none; border-radius: 4px; cursor: pointer;"
            onclick="
              document.documentElement.setAttribute('data-mode', 'dark');
              document.documentElement.classList.add('dark');
              console.log('🎨 Manual: Switched to Dark');
              console.log('🎨 Current data-mode:', document.documentElement.getAttribute('data-mode'));
              console.log('🎨 Current classes:', document.documentElement.className);
            ">
            🌙 Dark Mode
          </button>
        </div>

        <div style="padding: 1rem; background-color: var(--muted); border-radius: 8px;">
          <h3>Instructions:</h3>
          <ol>
            <li>Try the theme toggle in the Storybook toolbar (☀️/🌙)</li>
            <li>Try the manual buttons above</li>
            <li>Watch the browser console for debug logs</li>
            <li>Look for color changes in the boxes above</li>
          </ol>
          <p><strong>Expected Result:</strong> Colors should change when switching between light and dark themes.</p>
        </div>
      </div>
    `,
  }),
};
