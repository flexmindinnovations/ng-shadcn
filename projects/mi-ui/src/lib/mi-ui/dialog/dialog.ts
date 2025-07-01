import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';

const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
);

const dialogContentVariants = cva(
  'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg rounded-lg'
);

export interface DialogProps extends VariantProps<typeof dialogContentVariants> {
  open?: boolean;
  title?: string;
  description?: string;
}

@Component({
  selector: 'mi-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50">
        <!-- Overlay -->
        <div
          [class]="overlayClass"
          (click)="onOverlayClick()">
        </div>

        <!-- Content -->
        <div
          [class]="contentClass"
          #dialogContent
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="title ? 'dialog-title' : null"
          [attr.aria-describedby]="description ? 'dialog-description' : null">

          <!-- Close button -->
          <button
            class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            (click)="onClose()"
            type="button">
            <mi-icon name="X" [size]="16" />
            <span class="sr-only">Close</span>
          </button>

          <!-- Header -->
          @if (title || description) {
            <div class="flex flex-col space-y-1.5 text-center sm:text-left">
              @if (title) {
                <h2 id="dialog-title" class="text-lg font-semibold leading-none tracking-tight text-gray-900">
                  {{ title }}
                </h2>
              }
              @if (description) {
                <p id="dialog-description" class="text-sm text-gray-600">
                  {{ description }}
                </p>
              }
            </div>
          }

          <!-- Content -->
          <div class="grid gap-4 py-4">
            <ng-content></ng-content>
          </div>

          <!-- Footer -->
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    }
  `,
})
export class DialogComponent implements OnInit, OnDestroy, DialogProps {
  @Input() open = false;
  @Input() title?: string;
  @Input() description?: string;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('dialogContent') dialogContent?: ElementRef;

  get overlayClass() {
    return dialogOverlayVariants();
  }

  get contentClass() {
    return dialogContentVariants();
  }

  ngOnInit() {
    if (this.open) {
      this.handleOpen();
    }
  }

  ngOnDestroy() {
    this.handleClose();
  }

  onClose() {
    this.open = false;
    this.openChange.emit(false);
    this.close.emit();
    this.handleClose();
  }

  onOverlayClick() {
    this.onClose();
  }

  private handleOpen() {
    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden';

    // Focus trap - focus the dialog content
    setTimeout(() => {
      this.dialogContent?.nativeElement?.focus();
    }, 0);
  }

  private handleClose() {
    // Restore body scroll
    document.body.style.overflow = '';
  }
}
