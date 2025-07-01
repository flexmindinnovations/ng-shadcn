import type { Meta, StoryObj } from '@storybook/angular';
import { Pagination } from '../lib/mi-ui/pagination/pagination';

const meta: Meta<Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
    },
    showFirstLast: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
    showFirstLast: true,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
        args.currentPage = page;
      }
    },
    template: `
      <mi-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        [siblingCount]="siblingCount"
        [showFirstLast]="showFirstLast"
        [disabled]="disabled"
        (pageChange)="onPageChange($event)">
      </mi-pagination>
    `,
  }),
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    siblingCount: 1,
    showFirstLast: true,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
        args.currentPage = page;
      }
    },
    template: `
      <mi-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        [siblingCount]="siblingCount"
        [showFirstLast]="showFirstLast"
        [disabled]="disabled"
        (pageChange)="onPageChange($event)">
      </mi-pagination>
    `,
  }),
};

export const ManyPages: Story = {
  args: {
    currentPage: 10,
    totalPages: 50,
    siblingCount: 1,
    showFirstLast: true,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
        args.currentPage = page;
      }
    },
    template: `
      <mi-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        [siblingCount]="siblingCount"
        [showFirstLast]="showFirstLast"
        [disabled]="disabled"
        (pageChange)="onPageChange($event)">
      </mi-pagination>
    `,
  }),
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    siblingCount: 1,
    showFirstLast: true,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange: (page: number) => {
        console.log('Page changed to:', page);
        args.currentPage = page;
      }
    },
    template: `
      <mi-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        [siblingCount]="siblingCount"
        [showFirstLast]="showFirstLast"
        [disabled]="disabled"
        (pageChange)="onPageChange($event)">
      </mi-pagination>
    `,
  }),
};
