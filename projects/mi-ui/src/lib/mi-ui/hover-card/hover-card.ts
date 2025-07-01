import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const hoverCardVariants = cva(
  'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      side: {
        top: 'mb-2',
        right: 'ml-2',
        bottom: 'mt-2',
        left: 'mr-2',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  }
);

@Component({
  selector: 'mi-hover-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <div
        #trigger
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        class="inline-block">
        <ng-content select="[slot=trigger]"></ng-content>
      </div>

      <div
        *ngIf="isVisible"
        #content
        [class]="hoverCardClass"
        [attr.data-side]="side"
        [attr.data-state]="isVisible ? 'open' : 'closed'"
        (mouseenter)="onContentMouseEnter()"
        (mouseleave)="onContentMouseLeave()"
        [style.position]="'absolute'"
        [style.z-index]="'50'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class HoverCard implements VariantProps<typeof hoverCardVariants> {
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @Input() openDelay = 700;
  @Input() closeDelay = 300;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('trigger', { static: false }) trigger!: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;

  isVisible = false;
  private openTimeout: any;
  private closeTimeout: any;

  get hoverCardClass(): string {
    return hoverCardVariants({ side: this.side });
  }

  onMouseEnter() {
    this.clearTimeouts();
    this.openTimeout = setTimeout(() => {
      this.show();
    }, this.openDelay);
  }

  onMouseLeave() {
    this.clearTimeouts();
    this.closeTimeout = setTimeout(() => {
      this.hide();
    }, this.closeDelay);
  }

  onContentMouseEnter() {
    this.clearTimeouts();
  }

  onContentMouseLeave() {
    this.clearTimeouts();
    this.closeTimeout = setTimeout(() => {
      this.hide();
    }, this.closeDelay);
  }

  private show() {
    this.isVisible = true;
    this.openChange.emit(true);
  }

  private hide() {
    this.isVisible = false;
    this.openChange.emit(false);
  }

  private clearTimeouts() {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}

@Component({
  selector: 'mi-hover-card-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class HoverCardTrigger {}

@Component({
  selector: 'mi-hover-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
})
export class HoverCardContent {}
