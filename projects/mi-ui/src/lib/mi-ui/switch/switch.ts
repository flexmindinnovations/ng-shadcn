import { ChangeDetectionStrategy, Component, Input, forwardRef, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const switchVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      size: {
        default: 'h-6 w-11',
        sm: 'h-5 w-9',
        lg: 'h-7 w-13',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface SwitchProps extends VariantProps<typeof switchVariants> {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

@Component({
  selector: 'mi-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [id]="id"
      [class]="switchClass"
      [disabled]="disabled"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
      [attr.aria-checked]="checked"
      (click)="toggle()"
      (keydown.space)="toggle()"
      (keydown.enter)="toggle()"
      (blur)="onTouched()">
      <span
        [class]="thumbClass"
        [attr.data-state]="checked ? 'checked' : 'unchecked'">
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements SwitchProps, ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input() size: SwitchProps['size'] = 'default';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() id?: string;
  @Input() className?: string;

  private onChange = (value: boolean) => {};
  public onTouched = () => {};

  get switchClass(): string {
    return `${switchVariants({ size: this.size })} ${this.className || ''}`.trim();
  }

  get thumbClass(): string {
    return thumbVariants({ size: this.size });
  }

  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
