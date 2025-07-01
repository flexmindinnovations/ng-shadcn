import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  ChangeDetectorRef,
  Optional,
  Host,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AccordionContext } from './accordion-root';
import { AccordionItemComponent, AccordionChildComponent } from './accordion-item';

@Component({
  selector: 'accordion-content, [accordionContent]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideDown', [
      state('false', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('true', style({ height: '{{contentHeight}}px', opacity: 1, overflow: 'hidden' }), {
        params: { contentHeight: 0 }
      }),
      transition('false => true', [
        animate('200ms cubic-bezier(0.87, 0, 0.13, 1)')
      ]),
      transition('true => false', [
        animate('200ms cubic-bezier(0.87, 0, 0.13, 1)')
      ])
    ])
  ],
  host: {
    'class': 'block overflow-hidden text-sm',
    '[attr.data-state]': 'dataState',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    '[id]': 'contentId',
    '[@slideDown]': '{ value: isOpen, params: { contentHeight: contentHeight } }',
    'role': 'region'
  }
})
export class AccordionContentComponent implements OnInit, AfterViewInit, AccordionChildComponent, OnDestroy {
  private context?: AccordionContext;
  private item?: AccordionItemComponent;
  public contentHeight = 0;
  private resizeObserver?: ResizeObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() @Host() private parentItem?: AccordionItemComponent
  ) {}

  ngOnInit() {
    // Register with parent item if available
    if (this.parentItem) {
      this.parentItem.registerChild(this);
    }
  }

  ngAfterViewInit() {
    this.measureContent();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.measureContent();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  private measureContent() {
    if (!this.elementRef?.nativeElement) return;

    const element = this.elementRef.nativeElement;
    
    // Temporarily make content visible to measure
    const originalStyle = {
      height: element.style.height,
      visibility: element.style.visibility,
      position: element.style.position,
      overflow: element.style.overflow
    };

    element.style.height = 'auto';
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.overflow = 'visible';

    this.contentHeight = element.scrollHeight;

    // Restore original styles
    element.style.height = originalStyle.height;
    element.style.visibility = originalStyle.visibility;
    element.style.position = originalStyle.position;
    element.style.overflow = originalStyle.overflow;

    this.cdr.markForCheck();
  }

  setContext(context: AccordionContext, item: AccordionItemComponent): void {
    this.context = context;
    this.item = item;
    // Remeasure content when context changes
    setTimeout(() => this.measureContent(), 0);
    this.cdr.markForCheck();
  }

  get dataState(): 'open' | 'closed' {
    if (!this.item || !this.context) {
      return 'closed';
    }
    return this.context.isOpen(this.item.value) ? 'open' : 'closed';
  }

  get isOpen(): boolean {
    return this.dataState === 'open';
  }

  get ariaLabelledBy(): string | null {
    return this.item ? `accordion-trigger-${this.item.value}` : null;
  }

  get contentId(): string | null {
    return this.item ? `accordion-content-${this.item.value}` : null;
  }
}
