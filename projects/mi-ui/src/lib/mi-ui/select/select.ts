import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  value?: string;
}

@Component({
  selector: 'mi-select',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      <select
        [class]="selectClass"
        [disabled]="disabled"
        [value]="value || ''"
        (change)="onSelectionChange($event)"
        (blur)="onTouched()"
        [attr.aria-label]="placeholder">

        @if (placeholder) {
          <option value="" disabled hidden>{{ placeholder }}</option>
        }

        @for (option of options; track option.value) {
          <option
            [value]="option.value"
            [disabled]="option.disabled">
            {{ option.label }}
          </option>
        }
      </select>

      <!-- Chevron Down Icon -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <mi-icon name="ChevronDown" [size]="16" class="text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor, SelectProps {
  @Input() options: SelectOption[] = [];
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() variant: SelectProps['variant'] = 'default';
  @Input() size: SelectProps['size'] = 'default';
  @Input() value?: string;

  @Output() valueChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<SelectOption | null>();

  private onChange = (value: string) => {};
  onTouched = () => {};

  get selectClass() {
    return selectVariants({ variant: this.variant, size: this.size });
  }

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value;

    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);

    const selectedOption = this.options.find(option => option.value === newValue) || null;
    this.selectionChange.emit(selectedOption);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
