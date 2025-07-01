import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Breadcrumb, BreadcrumbItem } from '../lib/mi-ui/breadcrumb/breadcrumb';

const meta: Meta<Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Breadcrumb],
    }),
  ],
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Breadcrumb' }
    ]
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items'
    }
  },
};

export default meta;
type Story = StoryObj<Breadcrumb>;

export const Default: Story = {};

export const SimpleNavigation: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data', href: '/library/data' },
      { label: 'Current Page' }
    ]
  }
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Disabled Item', disabled: true },
      { label: 'Components', href: '#' },
      { label: 'Current Page' }
    ]
  }
};

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Dashboard' }
    ]
  }
};

export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Web Development', href: '#' },
      { label: 'Frontend', href: '#' },
      { label: 'Angular', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'UI Library' }
    ]
  }
};
