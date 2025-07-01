import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent
} from '../lib/mi-ui/card/card';
import { Button } from '../lib/mi-ui/button/button';
import { IconComponent } from '../lib/mi-ui/icon/icon';
import { IconService } from '../lib/services/icon.service';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying content in a contained, elevated surface.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardDescriptionComponent,
        CardContentComponent,
        CardFooterComponent,
        Button,
        IconComponent,
      ],
      providers: [IconService],
    }),
    applicationConfig({
      providers: [IconService],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline'],
      description: 'The visual variant of the card',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-card [variant]="variant" [class]="class" style="width: 350px;">
        <mi-card-header>
          <mi-card-title>Card Title</mi-card-title>
          <mi-card-description>Card description goes here. This provides context about the card's content.</mi-card-description>
        </mi-card-header>
        <mi-card-content>
          <p>This is the main content area of the card. You can put any content here, including text, images, forms, or other components.</p>
        </mi-card-content>
        <mi-card-footer>
          <mi-button variant="default">Action</mi-button>
          <mi-button variant="outline" class="ml-2">Cancel</mi-button>
        </mi-card-footer>
      </mi-card>
    `,
  }),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-card [variant]="variant" [class]="class" style="width: 350px;">
        <mi-card-header>
          <mi-card-title>Elevated Card</mi-card-title>
          <mi-card-description>This card has more prominent shadow for emphasis.</mi-card-description>
        </mi-card-header>
        <mi-card-content>
          <p>Elevated cards are great for highlighting important content or creating visual hierarchy.</p>
        </mi-card-content>
      </mi-card>
    `,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `
      <mi-card [variant]="variant" [class]="class" style="width: 350px;">
        <mi-card-header>
          <mi-card-title>Outline Card</mi-card-title>
          <mi-card-description>This card has a prominent border instead of shadow.</mi-card-description>
        </mi-card-header>
        <mi-card-content>
          <p>Outline cards work well for subtle emphasis without using shadows.</p>
        </mi-card-content>
      </mi-card>
    `,
  }),
};

export const WithIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-card [variant]="variant" [class]="class" style="width: 350px;">
        <mi-card-header>
          <div class="flex items-center space-x-2">
            <mi-icon name="star" size="20"></mi-icon>
            <mi-card-title>Featured Item</mi-card-title>
          </div>
          <mi-card-description>This card includes an icon in the header for visual interest.</mi-card-description>
        </mi-card-header>
        <mi-card-content>
          <p>Icons can help categorize content and make cards more visually appealing.</p>
        </mi-card-content>
        <mi-card-footer>
          <mi-button variant="default">
            <mi-icon name="arrow-right" size="16" class="mr-2"></mi-icon>
            Learn More
          </mi-button>
        </mi-card-footer>
      </mi-card>
    `,
  }),
};

export const SimpleContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mi-card [variant]="variant" [class]="class" style="width: 300px;">
        <mi-card-content>
          <div class="text-center">
            <mi-icon name="check-circle" size="48" class="mx-auto mb-4 text-green-500"></mi-icon>
            <h3 class="text-lg font-semibold mb-2">Success!</h3>
            <p class="text-sm text-muted-foreground">Your action was completed successfully.</p>
          </div>
        </mi-card-content>
      </mi-card>
    `,
  }),
};

export const Grid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style="width: 900px;">
        <mi-card variant="default">
          <mi-card-header>
            <mi-card-title>Product A</mi-card-title>
            <mi-card-description>High-quality product with excellent features.</mi-card-description>
          </mi-card-header>
          <mi-card-content>
            <p class="text-2xl font-bold">$99</p>
          </mi-card-content>
          <mi-card-footer>
            <mi-button variant="default" class="w-full">Choose Plan</mi-button>
          </mi-card-footer>
        </mi-card>

        <mi-card variant="elevated">
          <mi-card-header>
            <mi-card-title>Product B</mi-card-title>
            <mi-card-description>Premium product with advanced capabilities.</mi-card-description>
          </mi-card-header>
          <mi-card-content>
            <p class="text-2xl font-bold">$199</p>
          </mi-card-content>
          <mi-card-footer>
            <mi-button variant="default" class="w-full">Choose Plan</mi-button>
          </mi-card-footer>
        </mi-card>

        <mi-card variant="outline">
          <mi-card-header>
            <mi-card-title>Product C</mi-card-title>
            <mi-card-description>Enterprise solution for large organizations.</mi-card-description>
          </mi-card-header>
          <mi-card-content>
            <p class="text-2xl font-bold">$299</p>
          </mi-card-content>
          <mi-card-footer>
            <mi-button variant="default" class="w-full">Choose Plan</mi-button>
          </mi-card-footer>
        </mi-card>
      </div>
    `,
  }),
};
