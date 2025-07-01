import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'mi-alert-dialog',
  standalone: true,
  imports: [CommonModule, Button],
  template: `
    <div
      *ngIf="open"
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      (click)="onOverlayClick($event)"
    >
      <div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div class="flex flex-col space-y-2 text-center sm:text-left">
          <div class="text-lg font-semibold">{{ title }}</div>
          <div class="text-sm text-muted-foreground">{{ description }}</div>
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <mi-button
            variant="outline"
            (click)="onCancel()"
            [disabled]="loading">
            {{ cancelText }}
          </mi-button>
          <mi-button
            [variant]="destructive ? 'destructive' : 'default'"
            (click)="onConfirm()"
            [loading]="loading">
            {{ confirmText }}
          </mi-button>
        </div>
      </div>
    </div>
  `,
  host: {
    '[attr.data-state]': 'open ? "open" : "closed"'
  }
})
export class AlertDialog {
  @Input() open = false;
  @Input() title = 'Are you absolutely sure?';
  @Input() description = 'This action cannot be undone.';
  @Input() confirmText = 'Continue';
  @Input() cancelText = 'Cancel';
  @Input() destructive = false;
  @Input() loading = false;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }

  close() {
    this.open = false;
    this.openChange.emit(false);
  }

  show() {
    this.open = true;
    this.openChange.emit(true);
  }
}
