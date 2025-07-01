import { ChangeDetectionStrategy, Component, Input, forwardRef, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'input-base',
  {
    variants: {
      variant: {
        default: 'input-default',
        filled: 'input-filled',
        outline: 'input-outline',
        floating: 'input-floating',
        destructive: 'input-destructive',
      },
      size: {
        default: 'input-size-default',
        sm: 'input-size-sm',
        lg: 'input-size-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps extends VariantProps<typeof inputVariants> {
  className?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
}

@Component({
  selector: 'mi-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="containerClass">
      <input
        [type]="type"
        [class]="inputClass"
        [placeholder]="effectivePlaceholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [value]="internalValue"
        [attr.aria-invalid]="variant === 'destructive'"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.aria-labelledby]="hasFloatingLabel ? 'label-' + elementId : null"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus($event)"
      />
      <label
        *ngIf="hasFloatingLabel"
        [id]="'label-' + elementId"
        [class]="labelClass"
        [attr.for]="elementId">
        {{ effectiveLabel }}
      </label>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .input-container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* Base input styles */
    .input-base {
      display: flex;
      width: 100%;
      border-radius: calc(var(--radius) - 2px);
      border: 1px solid var(--border);
      background-color: var(--background);
      color: var(--foreground);
      font-size: 14px;
      line-height: 1.5;
      outline: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      box-sizing: border-box;

      &::placeholder {
        color: var(--muted-foreground);
        opacity: 1;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: var(--muted);
        color: var(--muted-foreground);
      }

      &:readonly {
        background-color: var(--muted);
      }

      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px var(--background) inset !important;
        -webkit-text-fill-color: var(--foreground) !important;
        transition: background-color 5000s ease-in-out 0s;
        border: 1px solid var(--border) !important;
      }
    }

    /* Default variant */
    .input-default {
      height: 40px;
      padding: 8px 12px;

      &:focus {
        border-color: var(--ring);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
      }
    }

    /* Filled variant */
    .input-filled {
      height: 56px;
      padding: 24px 12px 8px 12px;
      background-color: var(--muted);
      border: none;
      border-bottom: 2px solid var(--border);
      border-radius: calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0 0;

      &:focus {
        background-color: var(--background);
        border-bottom-color: var(--primary);
        box-shadow: none;
      }

      &:disabled {
        background-color: var(--muted);
      }
    }

    /* Outline variant */
    .input-outline {
      height: 56px;
      padding: 24px 12px 8px 12px;
      border: 2px solid var(--border);
      background-color: var(--background);

      &:focus {
        border-color: var(--primary);
        box-shadow: none;
      }

      &:disabled {
        background-color: var(--muted);
        border-color: var(--muted-foreground);
      }
    }

    /* Floating variant */
    .input-floating {
      height: 56px;
      padding: 24px 12px 8px 12px;

      &:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
      }
    }

    /* Destructive variant */
    .input-destructive {
      height: 40px;
      padding: 8px 12px;
      border-color: var(--destructive);

      &:focus {
        border-color: var(--destructive);
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
      }

      &::placeholder {
        color: rgba(255, 0, 0, 0.7);
      }
    }

    /* Size variants */
    .input-size-sm {
      font-size: 12px;

      &.input-default,
      &.input-destructive {
        height: 32px;
        padding: 6px 10px;
      }

      &.input-filled,
      &.input-outline,
      &.input-floating {
        height: 48px;
        padding: 20px 10px 6px 10px;
      }
    }

    .input-size-lg {
      font-size: 16px;

      &.input-default,
      &.input-destructive {
        height: 48px;
        padding: 12px 16px;
      }

      &.input-filled,
      &.input-outline,
      &.input-floating {
        height: 64px;
        padding: 28px 16px 12px 16px;
      }
    }

    /* Floating label styles */
    .floating-label {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--muted-foreground);
      font-size: 14px;
      background: transparent;
      padding: 0 4px;
      z-index: 1;
      white-space: nowrap;
      max-width: calc(100% - 24px);
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
    }

    /* Floating label positioning for different variants */
    .input-container.variant-filled .floating-label,
    .input-container.variant-outline .floating-label,
    .input-container.variant-floating .floating-label {
      top: 28px;
      transform: translateY(-50%);
    }

    /* Active/focused label position - with proper spacing from border */
    .input-container.has-value .floating-label,
    .input-container.is-focused .floating-label {
      top: 8px;
      font-size: 12px;
      color: var(--primary);
      transform: translateY(0);
    }

    /* Special positioning for small size */
    .input-container.variant-filled.input-size-sm .floating-label,
    .input-container.variant-outline.input-size-sm .floating-label,
    .input-container.variant-floating.input-size-sm .floating-label {
      top: 24px;
    }

    .input-container.variant-filled.input-size-sm.has-value .floating-label,
    .input-container.variant-outline.input-size-sm.has-value .floating-label,
    .input-container.variant-floating.input-size-sm.has-value .floating-label,
    .input-container.variant-filled.input-size-sm.is-focused .floating-label,
    .input-container.variant-outline.input-size-sm.is-focused .floating-label,
    .input-container.variant-floating.input-size-sm.is-focused .floating-label {
      top: 6px;
      font-size: 10px;
    }

    /* Special positioning for large size */
    .input-container.variant-filled.input-size-lg .floating-label,
    .input-container.variant-outline.input-size-lg .floating-label,
    .input-container.variant-floating.input-size-lg .floating-label {
      top: 32px;
      font-size: 16px;
    }

    .input-container.variant-filled.input-size-lg.has-value .floating-label,
    .input-container.variant-outline.input-size-lg.has-value .floating-label,
    .input-container.variant-floating.input-size-lg.has-value .floating-label,
    .input-container.variant-filled.input-size-lg.is-focused .floating-label,
    .input-container.variant-outline.input-size-lg.is-focused .floating-label,
    .input-container.variant-floating.input-size-lg.is-focused .floating-label {
      top: 10px;
      font-size: 14px;
    }

    /* Background for outline variant label to prevent border overlap */
    .input-container.variant-outline .floating-label {
      background: var(--background);
      margin-left: -4px;
      padding-left: 8px;
      padding-right: 8px;
    }

    /* Improved spacing for outline variant floating state */
    .input-container.variant-outline.has-value .floating-label,
    .input-container.variant-outline.is-focused .floating-label {
      top: -2px;
      background: var(--background);
      border-radius: 2px;
    }

    .input-container.variant-outline.input-size-sm.has-value .floating-label,
    .input-container.variant-outline.input-size-sm.is-focused .floating-label {
      top: -3px;
    }

    .input-container.variant-outline.input-size-lg.has-value .floating-label,
    .input-container.variant-outline.input-size-lg.is-focused .floating-label {
      top: -1px;
    }

    /* Error state for floating labels */
    .input-container.variant-destructive .floating-label {
      color: var(--destructive);
    }

    .input-container.variant-destructive.has-value .floating-label,
    .input-container.variant-destructive.is-focused .floating-label {
      color: var(--destructive);
    }

    /* Focus state improvements */
    .input-container.is-focused .input-filled {
      background-color: var(--background);
    }

    /* Disabled state for labels */
    .input-base:disabled + .floating-label {
      color: var(--muted-foreground);
      opacity: 0.5;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements InputProps, ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input() variant: InputProps['variant'] = 'default';
  @Input() size: InputProps['size'] = 'default';
  @Input() className?: string;
  @Input() type: string = 'text';
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() value: string = '';
  @Input() ariaDescribedBy?: string;

  internalValue: string = '';
  isFocused: boolean = false;
  elementId: string = `input-${Math.random().toString(36).substr(2, 9)}`;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get hasFloatingLabel(): boolean {
    return this.variant === 'floating' || this.variant === 'filled' || this.variant === 'outline';
  }

  get effectiveLabel(): string {
    if (this.label) {
      return this.label;
    }
    // Provide default labels for floating variants when no label is specified
    if (this.hasFloatingLabel) {
      return 'Label';
    }
    return '';
  }

  get hasValue(): boolean {
    return !!this.internalValue;
  }

  get effectivePlaceholder(): string {
    // Hide placeholder for floating label variants when label is present
    if (this.hasFloatingLabel) {
      return '';
    }
    return this.placeholder || '';
  }

  get containerClass(): string {
    const classes = [
      'input-container',
      `variant-${this.variant}`,
      `input-size-${this.size}`,
      this.hasValue ? 'has-value' : '',
      this.isFocused ? 'is-focused' : '',
      this.className || ''
    ].filter(Boolean);

    return classes.join(' ');
  }

  get inputClass(): string {
    return inputVariants({ variant: this.variant, size: this.size });
  }

  get labelClass(): string {
    return 'floating-label';
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.internalValue = target.value;
    this.onChange(this.internalValue);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.cdr.markForCheck();
  }

  onFocus(event: FocusEvent): void {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.internalValue = value || '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
