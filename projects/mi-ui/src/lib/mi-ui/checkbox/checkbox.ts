import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';

const checkboxVariants = cva(
  'peer shrink-0 rounded-sm border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background checked:bg-primary checked:border-primary checked:text-primary-foreground',
  {
    variants: {
      size: {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  class?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  id?: string;
}

@Component({
  selector: 'mi-checkbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center space-x-2">
      <div class="relative">
        <input
          [id]="id"
          type="checkbox"
          [class]="checkboxClass"
          [disabled]="disabled"
          [checked]="checked"
          [indeterminate]="indeterminate"
          (change)="onCheckboxChange($event)"
          (blur)="onBlur()"
        />
        <div
          *ngIf="checked || indeterminate"
          class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <mi-icon
            *ngIf="checked && !indeterminate"
            name="Check"
            [size]="iconSize"
            class="text-white">
          </mi-icon>
          <mi-icon
            *ngIf="indeterminate"
            name="Minus"
            [size]="iconSize"
            class="text-white">
          </mi-icon>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements CheckboxProps, ControlValueAccessor {
  @Input() size: CheckboxProps['size'] = 'default';
  @Input() class?: string;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() id?: string;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get checkboxClass(): string {
    return `${checkboxVariants({ size: this.size })} ${this.class || ''}`.trim();
  }

  get checkboxVisualClass(): string {
    const baseClasses = this.checkboxClass;
    const stateClasses = this.checked || this.indeterminate
      ? 'bg-primary text-primary-foreground border-primary'
      : 'border-input bg-background hover:bg-accent hover:text-accent-foreground';
    const cursorClass = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';

    return `${baseClasses} ${stateClasses} ${cursorClass} flex items-center justify-center transition-colors`.trim();
  }

  get iconSize(): number {
    switch (this.size) {
      case 'sm': return 10;
      case 'lg': return 16;
      default: return 12;
    }
  }

  getDataState(): string {
    if (this.indeterminate) return 'indeterminate';
    return this.checked ? 'checked' : 'unchecked';
  }

  toggle(): void {
    if (this.disabled) return;

    this.indeterminate = false;
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
    this.onChange(this.checked);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
