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
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the expand/collapse icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
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

const customStyledItems = [
  {
    value: 'styled-1',
    trigger: 'Custom Header Style',
    content: 'This item has custom header styling with blue colors.',
    headerClass: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    contentClass: 'bg-blue-25 text-blue-800',
    iconClass: 'text-blue-500'
  },
  {
    value: 'styled-2',
    trigger: 'Green Themed Item',
    content: 'This item uses green theme colors for a different look.',
    headerClass: 'bg-green-50 text-green-700 hover:bg-green-100',
    contentClass: 'bg-green-25',
    contentStyle: { backgroundColor: '#f0f9f0' }
  },
  {
    value: 'styled-3',
    trigger: 'Purple Accent',
    content: 'Purple themed accordion item with custom styling.',
    headerClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    contentClass: 'bg-purple-25 p-6 rounded-lg'
  }
];

const customIconItems = [
  {
    value: 'icon-1',
    trigger: 'Plus/Minus Icons',
    content: 'This item uses plus and minus icons instead of chevrons.',
    expandIcon: 'Minus',
    collapseIcon: 'Plus'
  },
  {
    value: 'icon-2',
    trigger: 'Caret Icons',
    content: 'This item uses caret icons for expand/collapse.',
    expandIcon: 'CaretUp',
    collapseIcon: 'CaretDown'
  },
  {
    value: 'icon-3',
    trigger: 'Arrow Icons', 
    content: 'This item uses arrow icons for a different look.',
    expandIcon: 'ArrowUp',
    collapseIcon: 'ArrowDown'
  }
];

const complexContentItems = [
  {
    value: 'complex-1',
    trigger: 'Rich Content Example',
    content: `
      <div class="space-y-4">
        <p class="text-sm text-gray-600">This accordion item contains rich HTML content:</p>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Bullet points</li>
          <li>Multiple paragraphs</li>
          <li>Custom styling</li>
        </ul>
        <div class="mt-4 p-3 bg-gray-100 rounded-md">
          <p class="text-sm font-medium">Code Example:</p>
          <code class="text-xs">const example = "Hello World";</code>
        </div>
      </div>
    `,
    contentClass: 'p-4'
  },
  {
    value: 'complex-2',
    trigger: 'Interactive Content',
    content: `
      <div class="space-y-3">
        <p>This content includes interactive elements:</p>
        <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          Click me
        </button>
        <p class="text-sm text-gray-500">Note: In a real app, you'd use proper Angular components for interactivity.</p>
      </div>
    `,
    headerClass: 'bg-yellow-50',
    contentClass: 'bg-yellow-25 p-4'
  }
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

export const LeftIconPosition: Story = {
  args: {
    items: defaultItems,
    type: 'single',
    collapsible: true,
    iconPosition: 'left',
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with icons positioned on the left side of the trigger.',
      },
    },
  },
};

export const CustomIcons: Story = {
  args: {
    items: customIconItems,
    type: 'single',
    collapsible: true,
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion items with custom expand/collapse icons.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    items: customStyledItems,
    type: 'single',
    collapsible: true,
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with custom header and content styling per item.',
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    items: complexContentItems,
    type: 'single',
    collapsible: true,
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with rich HTML content and interactive elements.',
      },
    },
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

export const MixedConfiguration: Story = {
  args: {
    items: [
      {
        value: 'mixed-1',
        trigger: 'Default Styling',
        content: 'This item uses default styling.'
      },
      {
        value: 'mixed-2', 
        trigger: 'Custom Header',
        content: 'This item has custom header styling.',
        headerClass: 'bg-blue-50 text-blue-700'
      },
      {
        value: 'mixed-3',
        trigger: 'Custom Everything',
        content: 'This item has custom styling for everything.',
        headerClass: 'bg-green-50 text-green-700',
        contentClass: 'bg-green-25 p-4',
        expandIcon: 'Minus',
        collapseIcon: 'Plus'
      }
    ],
    type: 'single',
    collapsible: true,
    iconPosition: 'right',
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with mixed styling configurations per item.',
      },
    },
  },
};
