import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const radioGroupVariants = cva(
  'grid gap-2',
  {
    variants: {
      orientation: {
        vertical: 'grid-cols-1',
        horizontal: 'grid-flow-col auto-cols-max gap-6',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
  template: `
    <div [class]="radioGroupClass" role="radiogroup">
      <div *ngFor="let option of options; trackBy: trackByValue" class="flex items-center space-x-2">
        <input
          type="radio"
          [id]="option.value"
          [name]="name"
          [value]="option.value"
          [checked]="value === option.value"
          [disabled]="disabled || option.disabled"
          (change)="onSelectionChange(option.value)"
          (blur)="onTouched()"
          class="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <label
          [for]="option.value"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          [class.opacity-50]="disabled || option.disabled"
          [class.cursor-not-allowed]="disabled || option.disabled">
          {{ option.label }}
        </label>
      </div>
    </div>
  `
})
export class RadioGroup implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() name = 'radio-group';
  @Input() disabled = false;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';

  @Output() selectionChange = new EventEmitter<string>();

  value = '';

  private onChange = (value: string) => {};
  public onTouched = () => {};

  get radioGroupClass(): string {
    return radioGroupVariants({ orientation: this.orientation });
  }

  onSelectionChange(value: string) {
    if (this.disabled) return;

    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  trackByValue(index: number, option: RadioOption): string {
    return option.value;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
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
