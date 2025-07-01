import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, TemplateRef, ContentChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'mi-popover',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div #trigger (click)="toggle()" class="inline-block">
      <ng-content></ng-content>
    </div>

    <ng-template #contentTemplate>
      <div class="z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <ng-content select="[slot=content]"></ng-content>
        <div *ngIf="content">{{ content }}</div>
      </div>
    </ng-template>
  `
})
export class Popover implements AfterViewInit, OnDestroy {
  @Input() content?: string;
  @Input() open = false;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() offset = 8;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('trigger', { static: true }) trigger!: ElementRef;
  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;

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
        originX: 'center',
        originY: this.placement === 'top' ? 'top' : 'bottom',
        overlayX: 'center',
        overlayY: this.placement === 'top' ? 'bottom' : 'top',
        offsetY: this.placement === 'top' ? -this.offset : this.offset
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

    const portal = new TemplatePortal(this.contentTemplate, this.trigger.nativeElement);
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
}
