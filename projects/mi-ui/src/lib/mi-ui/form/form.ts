import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validators?: any[];
  options?: { value: any; label: string }[];
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="space-y-6">
      <div *ngFor="let field of fields" class="space-y-2">
        <label
          [for]="field.name"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ field.label }}
          <span *ngIf="field.required" class="text-destructive ml-1">*</span>
        </label>

        <div [ngSwitch]="field.type">
          <input
            *ngSwitchCase="'text'"
            [id]="field.name"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [disabled]="field.disabled || false"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <!-- Email Input -->
          <input
            *ngSwitchCase="'email'"
            [id]="field.name"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [disabled]="field.disabled || false"
            type="email"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <!-- Password Input -->
          <input
            *ngSwitchCase="'password'"
            [id]="field.name"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [disabled]="field.disabled || false"
            type="password"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <!-- Number Input -->
          <input
            *ngSwitchCase="'number'"
            [id]="field.name"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [disabled]="field.disabled || false"
            type="number"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <!-- Textarea -->
          <textarea
            *ngSwitchCase="'textarea'"
            [id]="field.name"
            [formControlName]="field.name"
            [placeholder]="field.placeholder"
            [disabled]="field.disabled || false"
            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>

          <!-- Select -->
          <select
            *ngSwitchCase="'select'"
            [id]="field.name"
            [formControlName]="field.name"
            [disabled]="field.disabled || false"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an option</option>
            <option *ngFor="let option of field.options" [value]="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- Checkbox -->
          <div *ngSwitchCase="'checkbox'" class="flex items-center space-x-2">
            <input
              [id]="field.name"
              [formControlName]="field.name"
              [disabled]="field.disabled || false"
              type="checkbox"
              class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <label
              [for]="field.name"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ field.label }}
            </label>
          </div>

          <!-- Radio Group -->
          <div *ngSwitchCase="'radio'" class="space-y-2">
            <div *ngFor="let option of field.options" class="flex items-center space-x-2">
              <input
                [id]="field.name + '_' + option.value"
                [formControlName]="field.name"
                [value]="option.value"
                [disabled]="field.disabled || false"
                type="radio"
                class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <label
                [for]="field.name + '_' + option.value"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- Field Description -->
        <p *ngIf="field.description" class="text-sm text-muted-foreground">
          {{ field.description }}
        </p>

        <!-- Error Messages -->
        <div *ngIf="getFieldErrors(field.name).length > 0" class="text-sm text-destructive">
          <p *ngFor="let error of getFieldErrors(field.name)">{{ error }}</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-2">
        <button
          *ngIf="showCancelButton"
          type="button"
          (click)="onCancel()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {{ cancelButtonText }}
        </button>
        <button
          type="submit"
          [disabled]="formGroup.invalid || loading"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <svg *ngIf="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ submitButtonText }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() initialValues: { [key: string]: any } = {};
  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() showCancelButton: boolean = false;
  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<any>();

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.fields.length > 0) {
      this.buildForm();
    }
  }

  buildForm() {
    const controls: { [key: string]: FormControl } = {};

    this.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      if (field.validators) {
        validators.push(...field.validators);
      }

      const initialValue = this.initialValues[field.name] || this.getDefaultValue(field);
      controls[field.name] = new FormControl(initialValue, validators);
    });

    this.formGroup = new FormGroup(controls);

    // Subscribe to form changes
    this.formGroup.valueChanges.subscribe(value => {
      this.formChange.emit(value);
    });
  }

  getDefaultValue(field: FormField): any {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
        return null;
      default:
        return '';
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  markAllFieldsAsTouched() {
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key)?.markAsTouched();
    });
  }

  getFieldErrors(fieldName: string): string[] {
    const control = this.formGroup.get(fieldName);
    const errors: string[] = [];

    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        errors.push('This field is required');
      }
      if (control.errors['email']) {
        errors.push('Please enter a valid email address');
      }
      if (control.errors['minlength']) {
        errors.push(`Minimum length is ${control.errors['minlength'].requiredLength} characters`);
      }
      if (control.errors['maxlength']) {
        errors.push(`Maximum length is ${control.errors['maxlength'].requiredLength} characters`);
      }
      if (control.errors['pattern']) {
        errors.push('Please enter a valid format');
      }
      if (control.errors['min']) {
        errors.push(`Minimum value is ${control.errors['min'].min}`);
      }
      if (control.errors['max']) {
        errors.push(`Maximum value is ${control.errors['max'].max}`);
      }
    }

    return errors;
  }

  resetForm() {
    this.formGroup.reset();
    this.buildForm();
  }

  setFieldValue(fieldName: string, value: any) {
    this.formGroup.get(fieldName)?.setValue(value);
  }

  getFieldValue(fieldName: string): any {
    return this.formGroup.get(fieldName)?.value;
  }
}
