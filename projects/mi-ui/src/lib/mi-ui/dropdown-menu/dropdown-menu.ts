import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, TemplateRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export interface DropdownMenuItem {
  label: string;
  value?: any;
  disabled?: boolean;
  separator?: boolean;
  icon?: string;
  shortcut?: string;
}

@Component({
  selector: 'mi-dropdown-menu',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div #trigger (click)="toggle()" class="inline-block cursor-pointer">
      <ng-content></ng-content>
    </div>

    <ng-template #menuTemplate>
      <div class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <div *ngFor="let item of items; trackBy: trackByValue" class="relative">
          <!-- Separator -->
          <div
            *ngIf="item.separator"
            class="-mx-1 my-1 h-px bg-muted">
          </div>

          <!-- Menu Item -->
          <div
            *ngIf="!item.separator"
            class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
            [class.opacity-50]="item.disabled"
            [class.pointer-events-none]="item.disabled"
            (click)="onItemClick(item)">

            <span *ngIf="item.icon" class="mr-2 h-4 w-4">
              <!-- Icon placeholder - you can integrate with your icon component -->
              {{ item.icon }}
            </span>

            <span class="flex-1">{{ item.label }}</span>

            <span *ngIf="item.shortcut" class="ml-auto text-xs tracking-widest opacity-60">
              {{ item.shortcut }}
            </span>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class DropdownMenu implements AfterViewInit, OnDestroy {
  @Input() items: DropdownMenuItem[] = [];
  @Input() open = false;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() itemClick = new EventEmitter<DropdownMenuItem>();

  @ViewChild('trigger', { static: true }) trigger!: ElementRef;
  @ViewChild('menuTemplate', { static: true }) menuTemplate!: TemplateRef<any>;

  private overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.createOverlay();
  }

  ngOnDestroy() {
    this.close();
  }

  private createOverlay() {
    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: this.placement === 'top' ? 'top' : 'bottom',
        overlayX: 'start',
        overlayY: this.placement === 'top' ? 'bottom' : 'top',
        offsetY: this.placement === 'top' ? -4 : 4
      }
    ];

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.trigger)
      .withPositions(positions)
      .withViewportMargin(8)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  toggle() {
    if (this.open) {
      this.close();
    } else {
      this.show();
    }
  }

  show() {
    if (!this.overlayRef || this.open) return;

    const portal = new TemplatePortal(this.menuTemplate, this.trigger.nativeElement);
    this.overlayRef.attach(portal);
    this.open = true;
    this.openChange.emit(true);
    this.cdr.detectChanges();
  }

  close() {
    if (!this.overlayRef || !this.open) return;

    this.overlayRef.detach();
    this.open = false;
    this.openChange.emit(false);
    this.cdr.detectChanges();
  }

  onItemClick(item: DropdownMenuItem) {
    if (item.disabled) return;

    this.itemClick.emit(item);
    this.close();
  }

  trackByValue(index: number, item: DropdownMenuItem): any {
    return item.value || item.label;
  }
}
