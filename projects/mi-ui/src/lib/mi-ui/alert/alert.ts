import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';
import type { LucideIconName } from '../../services/icon.service';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps extends VariantProps<typeof alertVariants> {
  icon?: LucideIconName;
  title?: string;
  description?: string;
}

@Component({
  selector: 'mi-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div [class]="alertClass">
      <div class="flex gap-3">
        @if (icon) {
          <mi-icon
            [name]="icon"
            [size]="16"
            class="mt-0.5 flex-shrink-0"
            [class.text-red-600]="variant === 'destructive'"
            [class.text-gray-600]="variant === 'default'"
            [class.dark:text-red-400]="variant === 'destructive'"
            [class.dark:text-gray-400]="variant === 'default'"
          />
        }
        <div class="flex-1">
          @if (title) {
            <h5 class="mb-1 font-medium leading-none tracking-tight">{{ title }}</h5>
          }
          @if (description) {
            <div class="text-sm leading-relaxed opacity-90">{{ description }}</div>
          }
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class AlertComponent implements AlertProps {
  @Input() variant: AlertProps['variant'] = 'default';
  @Input() icon?: LucideIconName;
  @Input() title?: string;
  @Input() description?: string;

  get alertClass() {
    return alertVariants({ variant: this.variant });
  }
}
