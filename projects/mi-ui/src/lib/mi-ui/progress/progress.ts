import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        default: 'h-4',
        sm: 'h-2',
        lg: 'h-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-blue-600 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        destructive: 'bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps extends VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  class?: string;
}

@Component({
  selector: 'mi-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="progressClass"
      role="progressbar"
      [attr.aria-valuemax]="max"
      [attr.aria-valuemin]="0"
      [attr.aria-valuenow]="value">
      <div
        [class]="indicatorClass"
        [style.transform]="'translateX(-' + (100 - percentage) + '%)'">
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements ProgressProps {
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: ProgressProps['size'] = 'default';
  @Input() variant: ProgressProps['variant'] = 'default';
  @Input() class?: string;

  get progressClass(): string {
    return `${progressVariants({ size: this.size })} ${this.class || ''}`.trim();
  }

  get indicatorClass(): string {
    return progressIndicatorVariants({ variant: this.variant });
  }

  get percentage(): number {
    return Math.max(0, Math.min(100, (this.value / this.max) * 100));
  }
}
