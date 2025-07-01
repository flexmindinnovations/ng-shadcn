import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from '../lib/mi-ui/accordion/accordion';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible content component that follows the shadcn/ui design system. Supports single and multiple selection modes.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether to allow only one or multiple items to be open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed when in single mode',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

const defaultItems = [
  {
    value: 'item-1',
    trigger: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    trigger: 'Is it styled?',
    content: 'Yes. It comes with default styles that matches the other components aesthetic.',
  },
  {
    value: 'item-3',
    trigger: 'Is it animated?',
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

const productItems = [
  {
    value: 'product-info',
    trigger: 'Product Information',
    content: `
      <p>Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.</p>
      <br>
      <p>Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.</p>
    `,
  },
  {
    value: 'shipping',
    trigger: 'Shipping Details',
    content: `
      <p>We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures your order arrives within 1-2 business days.</p>
      <br>
      <p>Free shipping is available for orders over $50. All packages are carefully tracked and insured for your peace of mind.</p>
    `,
  },
  {
    value: 'return-policy',
    trigger: 'Return Policy',
    content: `
      <p>We stand behind our products with a 30-day money-back guarantee. If you're not completely satisfied, you can return any item in its original condition for a full refund.</p>
      <br>
      <p>Returns are easy - just contact our customer service team and they'll provide a prepaid shipping label.</p>
    `,
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    type: 'single',
    collapsible: true,
    className: 'w-full',
  },
};

export const ShadcnExample: Story = {
  args: {
    items: productItems,
    type: 'single',
    collapsible: true,
    defaultValue: 'product-info',
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example that matches the official shadcn/ui accordion demo with product information.',
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    items: defaultItems,
    type: 'multiple',
    className: 'w-full',
  },
};

export const WithDefaultValue: Story = {
  args: {
    items: defaultItems,
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
    className: 'w-full',
  },
};
