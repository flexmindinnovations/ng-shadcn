import { Component, Input, Injectable, ViewContainerRef, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  dismissible?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900 dark:text-green-100',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Injectable({
  providedIn: 'root'
})
export class SonnerService {
  private toasts: ToastData[] = [];
  private toastContainer?: ComponentRef<SonnerToaster>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  private ensureToaster() {
    if (!this.toastContainer) {
      // Create toaster component dynamically
      this.toastContainer = createComponent(SonnerToaster, {
        environmentInjector: this.injector,
      });

      // Attach to DOM
      this.appRef.attachView(this.toastContainer.hostView);
      const domElem = (this.toastContainer.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      // Update toaster with current toasts
      this.updateToaster();
    }
  }

  private updateToaster() {
    if (this.toastContainer) {
      this.toastContainer.instance.toasts = [...this.toasts];
    }
  }

  toast(
    message: string,
    options: Partial<Omit<ToastData, 'id' | 'description'>> = {}
  ): string {
    return this.create({
      description: message,
      variant: 'default',
      duration: 4000,
      dismissible: true,
      position: 'bottom-right',
      ...options,
    });
  }

  success(
    message: string,
    options: Partial<Omit<ToastData, 'id' | 'description' | 'variant'>> = {}
  ): string {
    return this.create({
      description: message,
      variant: 'success',
      duration: 4000,
      dismissible: true,
      position: 'bottom-right',
      ...options,
    });
  }

  error(
    message: string,
    options: Partial<Omit<ToastData, 'id' | 'description' | 'variant'>> = {}
  ): string {
    return this.create({
      description: message,
      variant: 'destructive',
      duration: 5000,
      dismissible: true,
      position: 'bottom-right',
      ...options,
    });
  }

  warning(
    message: string,
    options: Partial<Omit<ToastData, 'id' | 'description' | 'variant'>> = {}
  ): string {
    return this.create({
      description: message,
      variant: 'warning',
      duration: 4000,
      dismissible: true,
      position: 'bottom-right',
      ...options,
    });
  }

  info(
    message: string,
    options: Partial<Omit<ToastData, 'id' | 'description' | 'variant'>> = {}
  ): string {
    return this.create({
      description: message,
      variant: 'info',
      duration: 4000,
      dismissible: true,
      position: 'bottom-right',
      ...options,
    });
  }

  promise<T>(
    promise: Promise<T>,
    options: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: any) => string);
    } & Partial<Omit<ToastData, 'id' | 'description' | 'variant'>>
  ): Promise<T> {
    const loadingId = this.create({
      description: options.loading || 'Loading...',
      variant: 'default',
      duration: Infinity,
      dismissible: false,
      position: 'bottom-right',
      ...options,
    });

    return promise
      .then((data) => {
        this.dismiss(loadingId);
        const successMessage = typeof options.success === 'function'
          ? options.success(data)
          : options.success || 'Success!';
        this.success(successMessage, options);
        return data;
      })
      .catch((error) => {
        this.dismiss(loadingId);
        const errorMessage = typeof options.error === 'function'
          ? options.error(error)
          : options.error || 'Something went wrong!';
        this.error(errorMessage, options);
        throw error;
      });
  }

  private create(data: Omit<ToastData, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toastData: ToastData = { id, ...data };

    this.toasts.push(toastData);
    this.ensureToaster();

    // Auto dismiss if duration is set
    if (data.duration && data.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, data.duration);
    }

    return id;
  }

  dismiss(id: string) {
    const toastIndex = this.toasts.findIndex(t => t.id === id);
    if (toastIndex > -1) {
      const toast = this.toasts[toastIndex];
      if (toast.onDismiss) {
        toast.onDismiss();
      }
      this.toasts.splice(toastIndex, 1);
      this.updateToaster();
    }
  }

  dismissAll() {
    this.toasts.forEach(toast => {
      if (toast.onDismiss) {
        toast.onDismiss();
      }
    });
    this.toasts = [];
    this.updateToaster();
  }
}

@Component({
  selector: 'mi-sonner-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="toastClass"
      [attr.data-state]="'open'"
      role="alert"
      aria-live="assertive"
      aria-atomic="true">

      <!-- Icon based on variant -->
      <div class="flex-shrink-0" *ngIf="showIcon">
        <svg *ngIf="toast.variant === 'success'" class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg *ngIf="toast.variant === 'destructive'" class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <svg *ngIf="toast.variant === 'warning'" class="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <svg *ngIf="toast.variant === 'info'" class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div *ngIf="toast.title" class="text-sm font-semibold">
          {{ toast.title }}
        </div>
        <div *ngIf="toast.description" class="text-sm" [class.mt-1]="toast.title">
          {{ toast.description }}
        </div>
      </div>

      <!-- Action -->
      <div *ngIf="toast.action" class="flex-shrink-0 ml-4">
        <button
          class="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
          (click)="onActionClick()">
          {{ toast.action.label }}
        </button>
      </div>

      <!-- Close button -->
      <button
        *ngIf="toast.dismissible"
        class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
        (click)="onDismiss()">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `,
})
export class SonnerToast implements VariantProps<typeof toastVariants> {
  @Input() toast!: ToastData;
  @Input() showIcon = true;
  @Input() variant: 'default' | 'destructive' | 'success' | 'warning' | 'info' = 'default';

  get toastClass(): string {
    return toastVariants({ variant: this.toast?.variant || this.variant });
  }

  constructor(private sonnerService: SonnerService) {}

  onActionClick() {
    if (this.toast.action) {
      this.toast.action.onClick();
    }
  }

  onDismiss() {
    this.sonnerService.dismiss(this.toast.id);
  }
}

@Component({
  selector: 'mi-sonner-toaster',
  standalone: true,
  imports: [CommonModule, SonnerToast],
  template: `
    <div class="sonner-toaster">
      <!-- Toast containers for different positions -->
      <div
        *ngFor="let position of positions"
        [class]="getContainerClass(position)"
        [attr.data-position]="position">

        <mi-sonner-toast
          *ngFor="let toast of getToastsForPosition(position); trackBy: trackByToastId"
          [toast]="toast"
          [showIcon]="showIcon">
        </mi-sonner-toast>
      </div>
    </div>
  `,
  styles: [`
    .sonner-toaster {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
    }

    .toast-container {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 420px;
      pointer-events: auto;
    }

    .toast-container[data-position="top-left"] {
      top: 1rem;
      left: 1rem;
    }

    .toast-container[data-position="top-center"] {
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container[data-position="top-right"] {
      top: 1rem;
      right: 1rem;
    }

    .toast-container[data-position="bottom-left"] {
      bottom: 1rem;
      left: 1rem;
    }

    .toast-container[data-position="bottom-center"] {
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container[data-position="bottom-right"] {
      bottom: 1rem;
      right: 1rem;
    }
  `]
})
export class SonnerToaster {
  @Input() toasts: ToastData[] = [];
  @Input() showIcon = true;
  @Input() maxToasts = 5;

  positions: Array<ToastData['position']> = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  getContainerClass(position: ToastData['position']): string {
    return `toast-container`;
  }

  getToastsForPosition(position: ToastData['position']): ToastData[] {
    const toasts = this.toasts.filter(toast => (toast.position || 'bottom-right') === position);
    // Limit number of toasts per position
    return toasts.slice(-this.maxToasts);
  }

  trackByToastId(index: number, toast: ToastData): string {
    return toast.id;
  }
}
