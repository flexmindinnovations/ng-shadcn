import type { StorybookConfig } from '@storybook/angular';
import { join } from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-themes",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  implementation: require.resolve('postcss'),
                  postcssOptions: {
                    plugins: [
                      require('@tailwindcss/postcss')({
                        configFile: join(__dirname, '../../../tailwind.config.js')
                      })
                    ]
                  }
                },
              },
            ],
          },
        ],
      }
    }
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  }
};
export default config;
