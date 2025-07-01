import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const contextMenuVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {},
    defaultVariants: {},
  }
);

const contextMenuItemVariants = cva(
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      destructive: {
        true: 'focus:bg-destructive focus:text-destructive-foreground',
      },
    },
    defaultVariants: {
      destructive: false,
    },
  }
);

export interface ContextMenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  action?: () => void;
  children?: ContextMenuItem[];
}

@Component({
  selector: 'mi-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #trigger
      (contextmenu)="onContextMenu($event)"
      class="relative">
      <ng-content></ng-content>

      <div
        *ngIf="isOpen"
        #menu
        [class]="contextMenuClass"
        [style.position]="'fixed'"
        [style.left.px]="position.x"
        [style.top.px]="position.y"
        [style.z-index]="'50'"
        [attr.data-state]="isOpen ? 'open' : 'closed'"
        role="menu">

        <div
          *ngFor="let item of menuItems; trackBy: trackByLabel"
          [class]="getItemClass(item)"
          [attr.data-disabled]="item.disabled ? '' : null"
          [attr.role]="'menuitem'"
          (click)="onItemClick(item)"
          [style.cursor]="item.disabled ? 'not-allowed' : 'pointer'">

          <span *ngIf="item.icon" class="mr-2 h-4 w-4">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span *ngIf="item.shortcut" class="ml-auto text-xs tracking-widest opacity-60">
            {{ item.shortcut }}
          </span>
        </div>
      </div>
    </div>

    <!-- Backdrop to close menu -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-40"
      (click)="closeMenu()">
    </div>
  `,
})
export class ContextMenu implements VariantProps<typeof contextMenuVariants> {
  @Input() menuItems: ContextMenuItem[] = [];
  @Output() itemSelected = new EventEmitter<ContextMenuItem>();

  @ViewChild('trigger', { static: true }) trigger!: ElementRef;
  @ViewChild('menu', { static: false }) menu!: ElementRef;

  isOpen = false;
  position = { x: 0, y: 0 };

  get contextMenuClass(): string {
    return contextMenuVariants();
  }

  getItemClass(item: ContextMenuItem): string {
    return contextMenuItemVariants({ destructive: item.destructive });
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.position = { x: event.clientX, y: event.clientY };
    this.isOpen = true;

    // Adjust position if menu would go off screen
    setTimeout(() => {
      this.adjustPosition();
    });
  }

  onItemClick(item: ContextMenuItem) {
    if (item.disabled) return;

    this.itemSelected.emit(item);
    if (item.action) {
      item.action();
    }
    this.closeMenu();
  }

  closeMenu() {
    this.isOpen = false;
  }

  trackByLabel(index: number, item: ContextMenuItem): string {
    return item.label;
  }

  private adjustPosition() {
    if (!this.menu) return;

    const menuElement = this.menu.nativeElement;
    const rect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust horizontal position
    if (this.position.x + rect.width > viewportWidth) {
      this.position.x = viewportWidth - rect.width - 10;
    }

    // Adjust vertical position
    if (this.position.y + rect.height > viewportHeight) {
      this.position.y = viewportHeight - rect.height - 10;
    }

    // Ensure minimum distance from edges
    this.position.x = Math.max(10, this.position.x);
    this.position.y = Math.max(10, this.position.y);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeMenu();
  }
}

@Component({
  selector: 'mi-context-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class ContextMenuTrigger {}

@Component({
  selector: 'mi-context-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class ContextMenuContent {}

@Component({
  selector: 'mi-context-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class ContextMenuItemComponent {
  @Input() isDisabled = false;
  @Input() isDestructive = false;
}

@Component({
  selector: 'mi-context-menu-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="-mx-1 my-1 h-px bg-muted"></div>
  `,
})
export class ContextMenuSeparator {}
