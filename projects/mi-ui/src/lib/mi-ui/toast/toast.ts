import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';
import type { LucideIconName } from '../../services/icon.service';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-50',
        warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: LucideIconName;
  action?: string;
  duration?: number;
  closable?: boolean;
}

@Component({
  selector: 'mi-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div [class]="toastClass" [attr.data-state]="'open'">
      <div class="flex items-start gap-3">
        @if (icon) {
          <mi-icon
            [name]="icon"
            [size]="16"
            class="mt-0.5 flex-shrink-0"
            [class.text-red-600]="variant === 'destructive'"
            [class.text-green-600]="variant === 'success'"
            [class.text-yellow-600]="variant === 'warning'"
            [class.text-foreground]="variant === 'default'"
          />
        }
        <div class="flex-1 space-y-1">
          @if (title) {
            <div class="text-sm font-semibold">{{ title }}</div>
          }
          @if (description) {
            <div class="text-sm opacity-90">{{ description }}</div>
          }
          <ng-content></ng-content>
        </div>
      </div>

      <div class="flex items-center gap-2">
        @if (action) {
          <button
            (click)="onAction()"
            class="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {{ action }}
          </button>
        }

        @if (closable) {
          <button
            (click)="onClose()"
            class="absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
            <mi-icon name="X" [size]="16" />
          </button>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements ToastProps {
  @Input() variant: ToastProps['variant'] = 'default';
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: LucideIconName;
  @Input() action?: string;
  @Input() duration = 5000;
  @Input() closable = true;

  @Output() actionClick = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  get toastClass(): string {
    return toastVariants({ variant: this.variant });
  }

  onAction(): void {
    this.actionClick.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
