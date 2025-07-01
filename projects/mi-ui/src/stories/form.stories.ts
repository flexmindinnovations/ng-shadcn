import type { Meta, StoryObj } from '@storybook/angular';
import { FormComponent, FormField } from '../lib/mi-ui/form/form';
import { Validators } from '@angular/forms';

const meta: Meta<FormComponent> = {
  title: 'Components/Form',
  component: FormComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive form component with validation and multiple field types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fields: {
      control: 'object',
      description: 'Array of form field definitions',
    },
    initialValues: {
      control: 'object',
      description: 'Initial values for the form fields',
    },
    submitButtonText: {
      control: 'text',
      description: 'Text for the submit button',
    },
    cancelButtonText: {
      control: 'text',
      description: 'Text for the cancel button',
    },
    showCancelButton: {
      control: 'boolean',
      description: 'Whether to show the cancel button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the form is in loading state',
    },
  },
};

export default meta;
type Story = StoryObj<FormComponent>;

const contactFormFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
    description: 'We\'ll never share your email with anyone else.',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter your message',
    required: true,
    description: 'Tell us what you\'re thinking about.',
  },
];

const profileFormFields: FormField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter username',
    required: true,
    validators: [Validators.minLength(3)],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email address',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    validators: [Validators.minLength(8)],
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  {
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    type: 'checkbox',
    description: 'Get the latest updates and news.',
  },
  {
    name: 'plan',
    label: 'Subscription Plan',
    type: 'radio',
    required: true,
    options: [
      { value: 'basic', label: 'Basic ($9/month)' },
      { value: 'pro', label: 'Pro ($19/month)' },
      { value: 'enterprise', label: 'Enterprise ($49/month)' },
    ],
  },
];

export const ContactForm: Story = {
  args: {
    fields: contactFormFields,
    submitButtonText: 'Send Message',
    showCancelButton: true,
    cancelButtonText: 'Clear',
  },
  render: (args) => ({
    props: {
      ...args,
      onFormSubmit: (data: any) => {
        console.log('Form submitted:', data);
        alert('Form submitted! Check console for data.');
      },
      onFormCancel: () => {
        console.log('Form cancelled');
      },
    },
    template: `
      <div class="w-96">
        <mi-form
          [fields]="fields"
          [initialValues]="initialValues"
          [submitButtonText]="submitButtonText"
          [cancelButtonText]="cancelButtonText"
          [showCancelButton]="showCancelButton"
          [loading]="loading"
          (formSubmit)="onFormSubmit($event)"
          (formCancel)="onFormCancel()">
        </mi-form>
      </div>
    `,
  }),
};

export const ProfileForm: Story = {
  args: {
    fields: profileFormFields,
    submitButtonText: 'Update Profile',
    showCancelButton: true,
    initialValues: {
      username: 'johndoe',
      email: 'john@example.com',
      country: 'us',
      newsletter: true,
      plan: 'pro',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      onFormSubmit: (data: any) => {
        console.log('Profile updated:', data);
        alert('Profile updated! Check console for data.');
      },
      onFormCancel: () => {
        console.log('Update cancelled');
      },
    },
    template: `
      <div class="w-96">
        <mi-form
          [fields]="fields"
          [initialValues]="initialValues"
          [submitButtonText]="submitButtonText"
          [cancelButtonText]="cancelButtonText"
          [showCancelButton]="showCancelButton"
          [loading]="loading"
          (formSubmit)="onFormSubmit($event)"
          (formCancel)="onFormCancel()">
        </mi-form>
      </div>
    `,
  }),
};

export const LoadingState: Story = {
  args: {
    fields: contactFormFields,
    submitButtonText: 'Sending...',
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-96">
        <mi-form
          [fields]="fields"
          [submitButtonText]="submitButtonText"
          [loading]="loading">
        </mi-form>
      </div>
    `,
  }),
};

const simpleFields: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
];

export const SimpleForm: Story = {
  args: {
    fields: simpleFields,
    submitButtonText: 'Submit',
  },
  render: (args) => ({
    props: {
      ...args,
      onFormSubmit: (data: any) => {
        console.log('Simple form submitted:', data);
      },
    },
    template: `
      <div class="w-80">
        <mi-form
          [fields]="fields"
          [submitButtonText]="submitButtonText"
          (formSubmit)="onFormSubmit($event)">
        </mi-form>
      </div>
    `,
  }),
};
