import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'mi-toggle',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Toggle),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      [class]="toggleClass"
      [attr.aria-pressed]="pressed"
      [attr.data-state]="pressed ? 'on' : 'off'"
      [disabled]="disabled"
      (click)="onToggle()">
      <ng-content></ng-content>
    </button>
  `,
})
export class Toggle implements ControlValueAccessor, VariantProps<typeof toggleVariants> {
  @Input() pressed = false;
  @Input() disabled = false;
  @Input() variant: 'default' | 'outline' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' = 'default';

  @Output() pressedChange = new EventEmitter<boolean>();

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get toggleClass(): string {
    return toggleVariants({ variant: this.variant, size: this.size });
  }

  onToggle() {
    if (this.disabled) return;

    this.pressed = !this.pressed;
    this.onChange(this.pressed);
    this.pressedChange.emit(this.pressed);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.pressed = value || false;
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
