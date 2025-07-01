import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CommandItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  group?: string;
}

export interface CommandGroup {
  name: string;
  items: CommandItem[];
}

@Component({
  selector: 'mi-command',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
      <div class="flex items-center border-b px-3" [class]="showSearch ? 'border-b' : ''">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 shrink-0 opacity-50">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          #searchInput
          *ngIf="showSearch"
          [(ngModel)]="searchTerm"
          (input)="onSearch()"
          (keydown)="onKeyDown($event)"
          [placeholder]="placeholder"
          class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span *ngIf="!showSearch" class="flex h-11 w-full py-3 text-sm text-muted-foreground">
          {{ placeholder }}
        </span>
      </div>

      <div class="max-h-60 overflow-y-auto overflow-x-hidden">
        <div class="overflow-hidden p-1 text-foreground">
          <div *ngIf="filteredGroups.length === 0 && searchTerm" class="py-6 text-center text-sm text-muted-foreground">
            {{ emptyMessage }}
          </div>

          <div *ngFor="let group of filteredGroups">
            <div *ngIf="group.name" class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              {{ group.name }}
            </div>

            <div
              *ngFor="let item of group.items; let i = index"
              (click)="selectItem(item)"
              [class]="getItemClasses(item, getGlobalIndex(group, i))"
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
            >
              <svg
                *ngIf="item.icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-4 w-4"
              >
                <path [attr.d]="item.icon"/>
              </svg>
              {{ item.label }}
            </div>
          </div>
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
export class CommandComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Input() items: CommandItem[] = [];
  @Input() groups: CommandGroup[] = [];
  @Input() placeholder: string = 'Type a command or search...';
  @Input() emptyMessage: string = 'No results found.';
  @Input() showSearch: boolean = true;

  @Output() itemSelect = new EventEmitter<CommandItem>();

  searchTerm: string = '';
  filteredGroups: CommandGroup[] = [];
  highlightedIndex: number = -1;
  allItems: CommandItem[] = [];

  ngOnInit() {
    this.setupItems();
    this.filterItems();
  }

  setupItems() {
    if (this.groups.length > 0) {
      this.filteredGroups = [...this.groups];
      this.allItems = this.groups.flatMap(group => group.items);
    } else {
      this.filteredGroups = [{ name: '', items: this.items }];
      this.allItems = [...this.items];
    }
  }

  onSearch() {
    this.filterItems();
    this.highlightedIndex = -1;
  }

  onKeyDown(event: KeyboardEvent) {
    const totalItems = this.filteredGroups.reduce((count, group) => count + group.items.length, 0);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex + 1) % totalItems;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = this.highlightedIndex <= 0 ? totalItems - 1 : this.highlightedIndex - 1;
        break;
      case 'Enter':
        event.preventDefault();
        const item = this.getItemByGlobalIndex(this.highlightedIndex);
        if (item && !item.disabled) {
          this.selectItem(item);
        }
        break;
      case 'Escape':
        this.searchTerm = '';
        this.filterItems();
        break;
    }
  }

  filterItems() {
    if (!this.searchTerm) {
      this.setupItems();
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();

    if (this.groups.length > 0) {
      this.filteredGroups = this.groups
        .map(group => ({
          ...group,
          items: group.items.filter(item =>
            item.label.toLowerCase().includes(searchLower) ||
            item.value.toLowerCase().includes(searchLower)
          )
        }))
        .filter(group => group.items.length > 0);
    } else {
      const filteredItems = this.items.filter(item =>
        item.label.toLowerCase().includes(searchLower) ||
        item.value.toLowerCase().includes(searchLower)
      );
      this.filteredGroups = [{ name: '', items: filteredItems }];
    }
  }

  selectItem(item: CommandItem) {
    if (item.disabled) return;
    this.itemSelect.emit(item);
  }

  getItemClasses(item: CommandItem, globalIndex: number): string {
    let classes = '';

    if (item.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else {
      classes += ' hover:bg-accent hover:text-accent-foreground cursor-pointer';
    }

    if (globalIndex === this.highlightedIndex) {
      classes += ' bg-accent text-accent-foreground';
    }

    return classes;
  }

  getGlobalIndex(group: CommandGroup, itemIndex: number): number {
    let globalIndex = 0;
    for (const g of this.filteredGroups) {
      if (g === group) {
        return globalIndex + itemIndex;
      }
      globalIndex += g.items.length;
    }
    return globalIndex;
  }

  getItemByGlobalIndex(globalIndex: number): CommandItem | null {
    let currentIndex = 0;
    for (const group of this.filteredGroups) {
      if (globalIndex < currentIndex + group.items.length) {
        return group.items[globalIndex - currentIndex];
      }
      currentIndex += group.items.length;
    }
    return null;
  }
}
