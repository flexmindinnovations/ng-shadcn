import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-full',
      },
      size: {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

@Component({
  selector: 'mi-slider',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Slider),
      multi: true,
    },
  ],
  template: `
    <div
      [class]="sliderClass"
      [attr.aria-disabled]="disabled"
      [attr.aria-orientation]="orientation"
      [attr.aria-valuemax]="max"
      [attr.aria-valuemin]="min"
      [attr.aria-valuenow]="value"
      [attr.data-orientation]="orientation"
      [attr.data-disabled]="disabled ? '' : null"
      role="slider"
      tabindex="0"
      (keydown)="onKeyDown($event)"
      (mousedown)="onMouseDown($event)"
      (touchstart)="onTouchStart($event)"
      #sliderElement>

      <!-- Track -->
      <div
        class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
        [class.h-full]="orientation === 'vertical'"
        [class.w-2]="orientation === 'vertical'">

        <!-- Range -->
        <div
          class="absolute h-full bg-primary"
          [style.width.%]="orientation === 'horizontal' ? percentage : null"
          [style.height.%]="orientation === 'vertical' ? percentage : null">
        </div>
      </div>

      <!-- Thumb -->
      <div
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        [class.cursor-pointer]="!disabled"
        [class.cursor-not-allowed]="disabled"
        [style.left.%]="orientation === 'horizontal' ? percentage : null"
        [style.bottom.%]="orientation === 'vertical' ? percentage : null"
        [style.transform]="orientation === 'horizontal' ? 'translateX(-50%)' : 'translateY(50%)'">
      </div>
    </div>
  `,
})
export class Slider implements ControlValueAccessor, VariantProps<typeof sliderVariants> {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() valueChange = new EventEmitter<number>();

  value = 0;
  private isDragging = false;

  private onChange = (value: number) => {};
  private onTouched = () => {};

  get sliderClass(): string {
    return sliderVariants({ orientation: this.orientation, size: this.size });
  }

  get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    let newValue = this.value;
    const stepSize = this.step;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(this.min, this.value - stepSize);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(this.max, this.value + stepSize);
        break;
      case 'Home':
        newValue = this.min;
        break;
      case 'End':
        newValue = this.max;
        break;
      case 'PageDown':
        newValue = Math.max(this.min, this.value - stepSize * 10);
        break;
      case 'PageUp':
        newValue = Math.min(this.max, this.value + stepSize * 10);
        break;
      default:
        return;
    }

    event.preventDefault();
    this.updateValue(newValue);
  }

  onMouseDown(event: MouseEvent) {
    if (this.disabled) return;

    this.isDragging = true;
    this.updateValueFromPosition(event.clientX, event.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      if (this.isDragging) {
        this.updateValueFromPosition(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      this.onTouched();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  onTouchStart(event: TouchEvent) {
    if (this.disabled || event.touches.length === 0) return;

    event.preventDefault();
    this.isDragging = true;

    const touch = event.touches[0];
    this.updateValueFromPosition(touch.clientX, touch.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (this.isDragging && e.touches.length > 0) {
        const touchMove = e.touches[0];
        this.updateValueFromPosition(touchMove.clientX, touchMove.clientY);
      }
    };

    const handleTouchEnd = () => {
      this.isDragging = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      this.onTouched();
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }

  private updateValueFromPosition(clientX: number, clientY: number) {
    // This is a simplified implementation
    // In a real implementation, you would need to get the slider element bounds
    // and calculate the exact position relative to the slider track
    const rect = { left: 0, top: 0, width: 200, height: 20 }; // Placeholder

    let percentage: number;
    if (this.orientation === 'horizontal') {
      percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    } else {
      percentage = Math.max(0, Math.min(100, ((rect.top + rect.height - clientY) / rect.height) * 100));
    }

    const newValue = this.min + (percentage / 100) * (this.max - this.min);
    const steppedValue = Math.round(newValue / this.step) * this.step;

    this.updateValue(Math.max(this.min, Math.min(this.max, steppedValue)));
  }

  private updateValue(value: number) {
    if (value !== this.value) {
      this.value = value;
      this.onChange(value);
      this.valueChange.emit(value);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    this.value = value || 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
