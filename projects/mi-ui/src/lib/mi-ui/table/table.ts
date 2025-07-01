import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'mi-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th
              *ngFor="let column of columns; trackBy: trackByKey"
              class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
              [style.width]="column.width">
              {{ column.header }}
            </th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr
            *ngFor="let item of data; trackBy: trackByIndex"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td
              *ngFor="let column of columns; trackBy: trackByKey"
              class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
              <ng-container *ngIf="cellTemplate; else defaultCell">
                <ng-container
                  *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column, value: item[column.key] }">
                </ng-container>
              </ng-container>
              <ng-template #defaultCell>
                {{ item[column.key] }}
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class Table {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;

  trackByKey(index: number, column: TableColumn): string {
    return column.key;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
