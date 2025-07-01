import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenubarItem {
  label?: string;
  value?: string;
  disabled?: boolean;
  separator?: boolean;
  children?: MenubarItem[];
  shortcut?: string;
  icon?: string;
}

export interface MenubarMenu {
  label: string;
  value: string;
  items: MenubarItem[];
}

@Component({
  selector: 'mi-menubar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-10 items-center space-x-1 rounded-md border bg-background p-1">
      <div
        *ngFor="let menu of menus; let i = index"
        class="relative"
      >
        <button
          type="button"
          (click)="toggleMenu(i)"
          [class]="getMenuButtonClasses(i)"
          class="inline-flex items-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {{ menu.label }}
        </button>

        <div
          *ngIf="activeMenuIndex === i"
          class="absolute left-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        >
          <div *ngFor="let item of menu.items" class="relative">
            <hr *ngIf="item.separator" class="my-1 -mx-1 h-px bg-muted" />

            <div
              *ngIf="!item.separator"
              (click)="selectItem(item, menu)"
              [class]="getItemClasses(item)"
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
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

              <span class="flex-1">{{ item.label }}</span>

              <span *ngIf="item.shortcut" class="ml-auto text-xs tracking-widest opacity-60">
                {{ item.shortcut }}
              </span>

              <svg
                *ngIf="item.children && item.children.length > 0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-auto h-4 w-4"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>

            <!-- Submenu -->
            <div
              *ngIf="item.children && item.children.length > 0 && hoveredItem === item"
              class="absolute left-full top-0 z-50 ml-1 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-2"
            >
              <div *ngFor="let subItem of item.children">
                <hr *ngIf="subItem.separator" class="my-1 -mx-1 h-px bg-muted" />

                <div
                  *ngIf="!subItem.separator"
                  (click)="selectItem(subItem, menu)"
                  [class]="getItemClasses(subItem)"
                  class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
                >
                  <svg
                    *ngIf="subItem.icon"
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
                    <path [attr.d]="subItem.icon"/>
                  </svg>

                  <span class="flex-1">{{ subItem.label }}</span>

                  <span *ngIf="subItem.shortcut" class="ml-auto text-xs tracking-widest opacity-60">
                    {{ subItem.shortcut }}
                  </span>
                </div>
              </div>
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
export class MenubarComponent implements OnInit {
  @Input() menus: MenubarMenu[] = [];

  @Output() itemSelect = new EventEmitter<{ item: MenubarItem; menu: MenubarMenu }>();

  activeMenuIndex: number = -1;
  hoveredItem: MenubarItem | null = null;

  ngOnInit() {
    // Component initialization
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close menu when clicking outside
    this.activeMenuIndex = -1;
    this.hoveredItem = null;
  }

  toggleMenu(index: number) {
    if (this.activeMenuIndex === index) {
      this.activeMenuIndex = -1;
    } else {
      this.activeMenuIndex = index;
    }
    this.hoveredItem = null;
  }

  selectItem(item: MenubarItem, menu: MenubarMenu) {
    if (item.disabled) return;

    // Don't close menu if item has children
    if (!item.children || item.children.length === 0) {
      this.activeMenuIndex = -1;
      this.hoveredItem = null;
      this.itemSelect.emit({ item, menu });
    }
  }

  onItemHover(item: MenubarItem) {
    if (item.children && item.children.length > 0) {
      this.hoveredItem = item;
    } else {
      this.hoveredItem = null;
    }
  }

  onItemLeave() {
    // Small delay to allow moving to submenu
    setTimeout(() => {
      if (!this.isHoveringSubmenu()) {
        this.hoveredItem = null;
      }
    }, 100);
  }

  private isHoveringSubmenu(): boolean {
    // This would need more sophisticated logic in a real implementation
    // For now, we'll keep it simple
    return false;
  }

  getMenuButtonClasses(index: number): string {
    return this.activeMenuIndex === index
      ? 'bg-accent text-accent-foreground'
      : 'hover:bg-accent hover:text-accent-foreground';
  }

  getItemClasses(item: MenubarItem): string {
    let classes = '';

    if (item.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else {
      classes += ' hover:bg-accent hover:text-accent-foreground cursor-pointer';
    }

    return classes;
  }
}
