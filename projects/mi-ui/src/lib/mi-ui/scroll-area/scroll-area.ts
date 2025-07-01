import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const scrollAreaVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-32',
        md: 'h-48',
        lg: 'h-64',
        xl: 'h-80',
        auto: 'h-auto',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

@Component({
  selector: 'mi-scroll-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="scrollAreaClass">
      <div
        #scrollContent
        class="h-full w-full overflow-auto pr-4"
        [style.scrollbar-width]="'thin'"
        [style.scrollbar-color]="'hsl(var(--border)) transparent'">
        <ng-content></ng-content>
      </div>

      <!-- Custom scrollbar track and thumb -->
      <div class="absolute right-0 top-0 z-10 flex h-full w-2 flex-col">
        <div
          class="relative flex-1 rounded-full bg-border/20"
          [class.opacity-100]="isScrolling"
          [class.opacity-0]="!isScrolling">
          <div
            #scrollThumb
            class="absolute right-0 top-0 w-full rounded-full bg-border transition-all"
            [style.height.%]="thumbHeight"
            [style.top.%]="thumbTop">
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --scrollbar-size: 6px;
    }

    .scroll-content::-webkit-scrollbar {
      width: var(--scrollbar-size);
    }

    .scroll-content::-webkit-scrollbar-track {
      background: transparent;
    }

    .scroll-content::-webkit-scrollbar-thumb {
      background: hsl(var(--border));
      border-radius: 9999px;
    }

    .scroll-content::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--border) / 0.8);
    }
  `]
})
export class ScrollArea implements AfterViewInit, VariantProps<typeof scrollAreaVariants> {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'auto' = 'md';
  @Input() hideScrollbar = false;

  @ViewChild('scrollContent', { static: true }) scrollContent!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollThumb', { static: false }) scrollThumb!: ElementRef<HTMLDivElement>;

  isScrolling = false;
  thumbHeight = 0;
  thumbTop = 0;
  private scrollTimeout: any;

  get scrollAreaClass(): string {
    return scrollAreaVariants({ size: this.size });
  }

  ngAfterViewInit() {
    this.setupScrollListeners();
    this.updateScrollbar();
  }

  private setupScrollListeners() {
    const element = this.scrollContent.nativeElement;

    element.addEventListener('scroll', () => {
      this.updateScrollbar();
      this.showScrollbar();
    });

    element.addEventListener('mouseenter', () => {
      this.showScrollbar();
    });

    element.addEventListener('mouseleave', () => {
      this.hideScrollbarDelayed();
    });
  }

  private updateScrollbar() {
    const element = this.scrollContent.nativeElement;
    const { scrollTop, scrollHeight, clientHeight } = element;

    if (scrollHeight <= clientHeight) {
      this.thumbHeight = 0;
      return;
    }

    this.thumbHeight = (clientHeight / scrollHeight) * 100;
    this.thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (100 - this.thumbHeight);
  }

  private showScrollbar() {
    this.isScrolling = true;
    this.clearScrollTimeout();
  }

  private hideScrollbarDelayed() {
    this.clearScrollTimeout();
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  private clearScrollTimeout() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
  }
}

@Component({
  selector: 'mi-scroll-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-full w-2.5 touch-none select-none flex-col rounded-full border border-transparent p-[1px] transition-colors">
      <div class="relative flex-1 rounded-full bg-border/20"></div>
    </div>
  `,
})
export class ScrollBar {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
}
