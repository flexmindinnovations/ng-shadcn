import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  formatter?: (value: any, row: T) => string;
  template?: any; // For custom cell templates
}

export interface DataTableSortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

export interface DataTablePaginationEvent {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'mi-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <div class="rounded-md border">
        <table class="w-full caption-bottom text-sm">
          <thead class="[&_tr]:border-b">
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th
                *ngFor="let column of columns"
                [style.width]="column.width"
                [class]="getHeaderClasses(column)"
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                (click)="onSort(column)"
              >
                <div class="flex items-center space-x-2">
                  <span>{{ column.header }}</span>
                  <button
                    *ngIf="column.sortable"
                    type="button"
                    class="ml-2 h-4 w-4 opacity-50 hover:opacity-100"
                  >
                    <svg
                      *ngIf="!isSorted(column.key)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4"
                    >
                      <path d="m7 15 5 5 5-5"/>
                      <path d="m7 9 5-5 5 5"/>
                    </svg>
                    <svg
                      *ngIf="isSorted(column.key) && getSortDirection(column.key) === 'asc'"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4"
                    >
                      <path d="m7 15 5 5 5-5"/>
                    </svg>
                    <svg
                      *ngIf="isSorted(column.key) && getSortDirection(column.key) === 'desc'"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4"
                    >
                      <path d="m7 9 5-5 5 5"/>
                    </svg>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0">
            <tr
              *ngFor="let row of paginatedData; let i = index"
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              (click)="onRowClick(row, i)"
            >
              <td
                *ngFor="let column of columns"
                class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
              >
                <div [ngSwitch]="column.type || 'text'">
                  <span *ngSwitchCase="'boolean'">
                    {{ getBooleanDisplay(getCellValue(row, column)) }}
                  </span>
                  <span *ngSwitchCase="'date'">
                    {{ getDateDisplay(getCellValue(row, column)) }}
                  </span>
                  <span *ngSwitchCase="'number'">
                    {{ getNumberDisplay(getCellValue(row, column)) }}
                  </span>
                  <span *ngSwitchDefault>
                    {{ getDisplayValue(row, column) }}
                  </span>
                </div>
              </td>
            </tr>

            <tr *ngIf="paginatedData.length === 0">
              <td [attr.colspan]="columns.length" class="h-24 text-center text-muted-foreground">
                {{ emptyMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="showPagination && totalPages > 1" class="flex items-center justify-between space-x-2 py-4">
        <div class="text-sm text-muted-foreground">
          Showing {{ getStartIndex() + 1 }} to {{ getEndIndex() }} of {{ data.length }} results
        </div>

        <div class="flex items-center space-x-2">
          <button
            type="button"
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage <= 1"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
          >
            Previous
          </button>

          <div class="flex items-center space-x-1">
            <button
              *ngFor="let page of getVisiblePages()"
              type="button"
              (click)="goToPage(page)"
              [class]="getPageButtonClasses(page)"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8"
            >
              {{ page }}
            </button>
          </div>

          <button
            type="button"
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage >= totalPages"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DataTableComponent<T = any> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: DataTableColumn<T>[] = [];
  @Input() pageSize: number = 10;
  @Input() showPagination: boolean = true;
  @Input() sortable: boolean = true;
  @Input() emptyMessage: string = 'No data available';

  @Output() rowClick = new EventEmitter<{ row: T; index: number }>();
  @Output() sort = new EventEmitter<DataTableSortEvent>();
  @Output() pageChange = new EventEmitter<DataTablePaginationEvent>();

  currentPage: number = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  paginatedData: T[] = [];

  ngOnInit() {
    this.updatePaginatedData();
  }

  ngOnChanges() {
    this.updatePaginatedData();
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  onSort(column: DataTableColumn<T>) {
    if (!column.sortable || !this.sortable) return;

    if (this.sortColumn === column.key) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sort.emit({
      column: this.sortColumn || '',
      direction: this.sortDirection
    });

    this.currentPage = 1;
    this.updatePaginatedData();
  }

  onRowClick(row: T, index: number) {
    this.rowClick.emit({ row, index });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    let sortedData = [...this.data];

    // Apply sorting
    if (this.sortColumn && this.sortDirection) {
      sortedData.sort((a, b) => {
        const aValue = this.getCellValue(a, { key: this.sortColumn! } as DataTableColumn<T>);
        const bValue = this.getCellValue(b, { key: this.sortColumn! } as DataTableColumn<T>);

        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = sortedData.slice(startIndex, endIndex);
  }

  getCellValue(row: T, column: DataTableColumn<T>): any {
    return (row as any)[column.key];
  }

  getDisplayValue(row: T, column: DataTableColumn<T>): string {
    const value = this.getCellValue(row, column);

    if (column.formatter) {
      return column.formatter(value, row);
    }

    return value?.toString() || '';
  }

  getBooleanDisplay(value: any): string {
    return value ? 'Yes' : 'No';
  }

  getDateDisplay(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString();
  }

  getNumberDisplay(value: any): string {
    if (value === null || value === undefined) return '';
    return Number(value).toLocaleString();
  }

  getHeaderClasses(column: DataTableColumn<T>): string {
    let classes = '';
    if (column.sortable && this.sortable) {
      classes += ' cursor-pointer hover:bg-muted/50';
    }
    return classes;
  }

  getPageButtonClasses(page: number): string {
    return page === this.currentPage
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  }

  isSorted(columnKey: string): boolean {
    return this.sortColumn === columnKey;
  }

  getSortDirection(columnKey: string): 'asc' | 'desc' | null {
    return this.sortColumn === columnKey ? this.sortDirection : null;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.data.length);
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, this.currentPage - halfVisible);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
