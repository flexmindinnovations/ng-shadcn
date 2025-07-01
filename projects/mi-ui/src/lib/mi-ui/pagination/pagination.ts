import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const paginationVariants = cva('mx-auto flex w-full justify-center');

const paginationItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      active: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/90',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'icon',
      active: false,
    },
  }
);

@Component({
  selector: 'mi-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav role="navigation" aria-label="pagination" [class]="paginationClass">
      <div class="flex flex-row items-center space-x-1">
        <!-- Previous button -->
        <button
          [class]="getItemClass(false)"
          [disabled]="currentPage <= 1"
          (click)="onPageChange(currentPage - 1)"
          aria-label="Go to previous page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span class="sr-only">Previous page</span>
        </button>

        <!-- Page numbers -->
        <ng-container *ngFor="let page of visiblePages; trackBy: trackByPage">
          <button
            *ngIf="page !== '...'"
            [class]="getItemClass(page === currentPage)"
            (click)="onPageChange(page)"
            [attr.aria-label]="'Go to page ' + page"
            [attr.aria-current]="page === currentPage ? 'page' : null">
            {{ page }}
          </button>

          <span
            *ngIf="page === '...'"
            class="flex h-9 w-9 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
            <span class="sr-only">More pages</span>
          </span>
        </ng-container>

        <!-- Next button -->
        <button
          [class]="getItemClass(false)"
          [disabled]="currentPage >= totalPages"
          (click)="onPageChange(currentPage + 1)"
          aria-label="Go to next page">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4">
            <path d="m9 18 6-6-6-6"/>
          </svg>
          <span class="sr-only">Next page</span>
        </button>
      </div>
    </nav>
  `,
})
export class Pagination implements VariantProps<typeof paginationVariants> {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() siblingCount = 1;
  @Input() showFirstLast = true;
  @Input() disabled = false;

  @Output() pageChange = new EventEmitter<number>();

  get paginationClass(): string {
    return paginationVariants();
  }

  get visiblePages(): (number | string)[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * this.siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      pages.push(...leftRange, '...', this.totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * this.siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => this.totalPages - rightItemCount + i + 1
      );
      pages.push(1, '...', ...rightRange);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      pages.push(1, '...', ...middleRange, '...', this.totalPages);
    } else {
      pages.push(...Array.from({ length: this.totalPages }, (_, i) => i + 1));
    }

    return pages;
  }

  getItemClass(isActive: boolean): string {
    return paginationItemVariants({ active: isActive });
  }

  onPageChange(page: number | string) {
    if (typeof page !== 'number' || this.disabled || page < 1 || page > this.totalPages) {
      return;
    }

    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  trackByPage(index: number, page: number | string): number | string {
    return page;
  }
}
