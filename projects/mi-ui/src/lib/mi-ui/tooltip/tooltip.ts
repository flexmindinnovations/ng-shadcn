import { ChangeDetectionStrategy, Component, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground border-border',
        secondary: 'bg-secondary text-secondary-foreground border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

@Component({
  selector: 'mi-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block"
         (mouseenter)="showTooltip()"
         (mouseleave)="hideTooltip()"
         (focusin)="showTooltip()"
         (focusout)="hideTooltip()">
      <ng-content></ng-content>

      <div *ngIf="isVisible"
           [class]="tooltipClass"
           [class.tooltip-top]="side === 'top'"
           [class.tooltip-right]="side === 'right'"
           [class.tooltip-bottom]="side === 'bottom'"
           [class.tooltip-left]="side === 'left'"
           role="tooltip">
        {{ content }}
        <div class="tooltip-arrow"
             [class.arrow-top]="side === 'top'"
             [class.arrow-right]="side === 'right'"
             [class.arrow-bottom]="side === 'bottom'"
             [class.arrow-left]="side === 'left'">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tooltip-top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
    }

    .tooltip-bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
    }

    .tooltip-left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }

    .tooltip-right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 8px;
    }

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
    }

    .arrow-top {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid currentColor;
    }

    .arrow-bottom {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid currentColor;
    }

    .arrow-left {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 4px solid currentColor;
    }

    .arrow-right {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-right: 4px solid currentColor;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements TooltipProps, OnInit, OnDestroy {
  @Input() content = '';
  @Input() variant: TooltipProps['variant'] = 'default';
  @Input() side: TooltipProps['side'] = 'top';
  @Input() delay = 500;

  public isVisible = false;
  private timeoutId?: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Add position relative to host if not already set
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  get tooltipClass(): string {
    return `${tooltipVariants({ variant: this.variant })} absolute`;
  }

  showTooltip(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.isVisible = true;
    }, this.delay);
  }

  hideTooltip(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.isVisible = false;
  }
}
