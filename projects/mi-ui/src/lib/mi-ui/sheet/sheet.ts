import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mi-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
        (click)="onBackdropClick()"
      ></div>

      <!-- Sheet -->
      <div
        [class]="getSheetClasses()"
        class="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        <!-- Close button -->
        <button
          *ngIf="showCloseButton"
          type="button"
          (click)="close()"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
          <span class="sr-only">Close</span>
        </button>

        <!-- Header -->
        <div *ngIf="title || description" class="flex flex-col space-y-2 text-center sm:text-left">
          <h2 *ngIf="title" class="text-lg font-semibold text-foreground">
            {{ title }}
          </h2>
          <p *ngIf="description" class="text-sm text-muted-foreground">
            {{ description }}
          </p>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div *ngIf="hasFooterContent" class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class SheetComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'right';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() title?: string;
  @Input() description?: string;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() closeOnEscape: boolean = true;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() beforeClose = new EventEmitter<void>();
  @Output() afterClose = new EventEmitter<void>();

  hasFooterContent = false;

  ngOnInit() {
    if (this.isOpen) {
      this.preventBodyScroll();
    }
  }

  ngAfterContentInit() {
    // Check if footer content is projected
    this.hasFooterContent = true; // Simplified for now
  }

  ngOnDestroy() {
    this.restoreBodyScroll();
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.preventBodyScroll();
    } else {
      this.restoreBodyScroll();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  close() {
    this.beforeClose.emit();
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.openChange.emit(false);
    this.restoreBodyScroll();

    // Delay for animation
    setTimeout(() => {
      this.afterClose.emit();
    }, 300);
  }

  open() {
    this.isOpen = true;
    this.isOpenChange.emit(true);
    this.openChange.emit(true);
    this.preventBodyScroll();
  }

  getSheetClasses(): string {
    let classes = '';

    // Position classes
    switch (this.side) {
      case 'top':
        classes += ' inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top';
        break;
      case 'bottom':
        classes += ' inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom';
        break;
      case 'left':
        classes += ' inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left';
        break;
      case 'right':
        classes += ' inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right';
        break;
    }

    // Size classes
    if (this.side === 'left' || this.side === 'right') {
      switch (this.size) {
        case 'sm':
          classes += ' w-80';
          break;
        case 'md':
          classes += ' w-96';
          break;
        case 'lg':
          classes += ' w-1/2';
          break;
        case 'xl':
          classes += ' w-2/3';
          break;
        case 'full':
          classes += ' w-full';
          break;
      }
    } else {
      switch (this.size) {
        case 'sm':
          classes += ' h-80';
          break;
        case 'md':
          classes += ' h-96';
          break;
        case 'lg':
          classes += ' h-1/2';
          break;
        case 'xl':
          classes += ' h-2/3';
          break;
        case 'full':
          classes += ' h-full';
          break;
      }
    }

    return classes;
  }

  private preventBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll() {
    document.body.style.overflow = '';
  }
}
