import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import docJson from "../documentation.json";

// Import CSS files - now properly configured with webpack loaders
import '../src/styles.css';
import './storybook.css';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    }),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    })
  ],
};

export default preview;
