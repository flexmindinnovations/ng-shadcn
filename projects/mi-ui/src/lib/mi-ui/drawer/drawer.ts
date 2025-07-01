import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const drawerVariants = cva(
  'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
  {
    variants: {
      side: {
        bottom: 'inset-x-0 bottom-0 border-t',
        top: 'inset-x-0 top-0 border-b rounded-t-none rounded-b-[10px]',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r rounded-t-none rounded-r-[10px] max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l rounded-t-none rounded-l-[10px] max-w-sm',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  }
);

@Component({
  selector: 'mi-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/80"
        (click)="onOverlayClick()"
        [@fadeIn]>
      </div>

      <!-- Drawer Content -->
      <div
        [class]="drawerClass"
        [@slideIn]
        (click)="$event.stopPropagation()">

        <!-- Drag Handle -->
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" *ngIf="side === 'bottom' || side === 'top'"></div>

        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    // Add Angular animations here for slide and fade effects
  ]
})
export class Drawer implements VariantProps<typeof drawerVariants> {
  @Input() open = false;
  @Input() side: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  @Input() dismissible = true;
  @Input() modal = true;

  @Output() openChange = new EventEmitter<boolean>();

  get drawerClass(): string {
    return drawerVariants({ side: this.side });
  }

  onOverlayClick() {
    if (this.dismissible) {
      this.close();
    }
  }

  close() {
    this.openChange.emit(false);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.open && this.dismissible) {
      this.close();
    }
  }
}

@Component({
  selector: 'mi-drawer-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '(click)': 'onClick()'
  }
})
export class DrawerTrigger {
  @Output() trigger = new EventEmitter<void>();

  onClick() {
    this.trigger.emit();
  }
}

@Component({
  selector: 'mi-drawer-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-full flex-col">
      <ng-content></ng-content>
    </div>
  `,
})
export class DrawerContent {}

@Component({
  selector: 'mi-drawer-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col space-y-1.5 p-4 text-center sm:text-left">
      <ng-content></ng-content>
    </div>
  `,
})
export class DrawerHeader {}

@Component({
  selector: 'mi-drawer-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="text-lg font-semibold leading-none tracking-tight">
      <ng-content></ng-content>
    </h2>
  `,
})
export class DrawerTitle {}

@Component({
  selector: 'mi-drawer-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-sm text-muted-foreground">
      <ng-content></ng-content>
    </p>
  `,
})
export class DrawerDescription {}

@Component({
  selector: 'mi-drawer-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2 p-4 pt-0">
      <ng-content></ng-content>
    </div>
  `,
})
export class DrawerFooter {}

@Component({
  selector: 'mi-drawer-close',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '(click)': 'onClick()'
  }
})
export class DrawerClose {
  @Output() close = new EventEmitter<void>();

  onClick() {
    this.close.emit();
  }
}

// Responsive Drawer Dialog Component
@Component({
  selector: 'mi-responsive-drawer',
  standalone: true,
  imports: [CommonModule, Drawer, DrawerContent, DrawerTrigger],
  template: `
    <div class="block md:hidden">
      <mi-drawer [open]="open" (openChange)="openChange.emit($event)">
        <ng-content select="[slot=mobile]"></ng-content>
      </mi-drawer>
    </div>

    <div class="hidden md:block">
      <ng-content select="[slot=desktop]"></ng-content>
    </div>
  `
})
export class ResponsiveDrawer {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
}
