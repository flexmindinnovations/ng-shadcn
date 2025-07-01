import type { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent, DataTableColumn } from '../lib/mi-ui/data-table/data-table';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  joinDate: string;
}

const meta: Meta<DataTableComponent<User>> = {
  title: 'Components/Data Table',
  component: DataTableComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Powerful table with sorting, pagination, and customizable columns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data objects to display',
    },
    columns: {
      control: 'object',
      description: 'Column definitions',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page',
    },
    showPagination: {
      control: 'boolean',
      description: 'Whether to show pagination controls',
    },
    sortable: {
      control: 'boolean',
      description: 'Whether columns can be sorted',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no data is available',
    },
  },
};

export default meta;
type Story = StoryObj<DataTableComponent<User>>;

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 32, isActive: true, joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, isActive: true, joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, isActive: false, joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 35, isActive: true, joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, isActive: false, joinDate: '2023-05-12' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 31, isActive: true, joinDate: '2023-06-18' },
  { id: 7, name: 'Edward Miller', email: 'edward@example.com', age: 38, isActive: true, joinDate: '2023-07-22' },
  { id: 8, name: 'Fiona Taylor', email: 'fiona@example.com', age: 26, isActive: false, joinDate: '2023-08-14' },
  { id: 9, name: 'George Anderson', email: 'george@example.com', age: 42, isActive: true, joinDate: '2023-09-03' },
  { id: 10, name: 'Helen Thomas', email: 'helen@example.com', age: 33, isActive: true, joinDate: '2023-10-01' },
  { id: 11, name: 'Ian Jackson', email: 'ian@example.com', age: 27, isActive: false, joinDate: '2023-11-15' },
  { id: 12, name: 'Julia White', email: 'julia@example.com', age: 30, isActive: true, joinDate: '2023-12-08' },
];

const userColumns: DataTableColumn<User>[] = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
    width: '80px',
    type: 'number'
  },
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    type: 'text'
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    type: 'text'
  },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
    width: '100px',
    type: 'number'
  },
  {
    key: 'isActive',
    header: 'Status',
    sortable: true,
    width: '120px',
    type: 'boolean'
  },
  {
    key: 'joinDate',
    header: 'Join Date',
    sortable: true,
    width: '150px',
    type: 'date'
  }
];

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    pageSize: 5,
  },
};

export const WithoutPagination: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: userColumns,
    showPagination: false,
  },
};

export const NotSortable: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: userColumns,
    sortable: false,
    showPagination: false,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
};

export const LargePageSize: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    pageSize: 10,
  },
};
