import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Table, TableColumn } from '../lib/mi-ui/table/table';
import { BadgeComponent } from '../lib/mi-ui/badge/badge';

const meta: Meta<Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Table, BadgeComponent],
    }),
  ],
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'status', header: 'Status' },
    ],
    data: [
      { name: 'John Doe', email: 'john@example.com', status: 'Active' },
      { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
      { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    ]
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Array of table column definitions'
    },
    data: {
      control: 'object',
      description: 'Array of data objects to display'
    }
  },
};

export default meta;
type Story = StoryObj<Table>;

export const Default: Story = {};

export const UserTable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '80px' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status', width: '120px' },
      { key: 'joinDate', header: 'Join Date' },
    ],
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        joinDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Inactive',
        joinDate: '2024-02-20'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Moderator',
        status: 'Active',
        joinDate: '2024-03-10'
      },
      {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Pending',
        joinDate: '2024-03-25'
      },
    ]
  }
};

export const WithCustomCell: Story = {
  render: (args) => ({
    props: {
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'status', header: 'Status' },
        { key: 'actions', header: 'Actions', width: '120px' },
      ],
      data: [
        { name: 'John Doe', email: 'john@example.com', status: 'active' },
        { name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
        { name: 'Bob Johnson', email: 'bob@example.com', status: 'pending' },
      ]
    },
    template: `
      <mi-table [columns]="columns" [data]="data">
        <ng-template #cellTemplate let-item let-column="column" let-value="value">
          <ng-container [ngSwitch]="column.key">
            <mi-badge
              *ngSwitchCase="'status'"
              [variant]="value === 'active' ? 'default' : value === 'inactive' ? 'destructive' : 'secondary'">
              {{ value | titlecase }}
            </mi-badge>
            <div *ngSwitchCase="'actions'" class="flex gap-2">
              <button class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">Edit</button>
              <button class="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
            </div>
            <span *ngSwitchDefault>{{ value }}</span>
          </ng-container>
        </ng-template>
      </mi-table>
    `,
  }),
};

export const ProductTable: Story = {
  args: {
    columns: [
      { key: 'sku', header: 'SKU', width: '100px' },
      { key: 'name', header: 'Product Name' },
      { key: 'category', header: 'Category' },
      { key: 'price', header: 'Price', width: '100px' },
      { key: 'stock', header: 'Stock', width: '80px' },
    ],
    data: [
      {
        sku: 'PRD-001',
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: '$99.99',
        stock: 45
      },
      {
        sku: 'PRD-002',
        name: 'Coffee Mug',
        category: 'Kitchen',
        price: '$12.99',
        stock: 120
      },
      {
        sku: 'PRD-003',
        name: 'Laptop Stand',
        category: 'Office',
        price: '$29.99',
        stock: 8
      },
    ]
  }
};
