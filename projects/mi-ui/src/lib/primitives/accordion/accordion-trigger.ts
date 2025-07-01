import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  Optional,
  Host
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { AccordionContext } from './accordion-root';
import { AccordionItemComponent, AccordionChildComponent } from './accordion-item';

@Component({
  selector: 'accordion-trigger, [accordionTrigger]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
    '[attr.data-state]': 'dataState',
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-controls]': 'ariaControls',
    '[attr.disabled]': 'disabled',
    '[id]': 'triggerId',
    'role': 'button',
    'tabindex': '0'
  }
})
export class AccordionTriggerComponent implements OnInit, AccordionChildComponent {
  private context?: AccordionContext;
  private item?: AccordionItemComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Host() private parentItem?: AccordionItemComponent
  ) {}

  ngOnInit() {
    // Register with parent item if available
    if (this.parentItem) {
      this.parentItem.registerChild(this);
    }
  }

  setContext(context: AccordionContext, item: AccordionItemComponent): void {
    this.context = context;
    this.item = item;
  }

  get dataState(): 'open' | 'closed' {
    return this.item?.dataState ?? 'closed';
  }

  get isExpanded(): boolean {
    return this.item?.isOpen ?? false;
  }

  get ariaControls(): string | null {
    return this.item ? `accordion-content-${this.item.value}` : null;
  }

  get triggerId(): string | null {
    return this.item ? `accordion-trigger-${this.item.value}` : null;
  }

  get disabled(): boolean {
    return this.context?.disabled || this.item?.disabled || false;
  }

  onClick(): void {
    this.toggle();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
    // Add arrow key navigation for multiple triggers
    if (this.context?.orientation === 'vertical') {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        this.handleArrowNavigation(event);
      }
    } else if (this.context?.orientation === 'horizontal') {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        this.handleArrowNavigation(event);
      }
    }
  }

  private handleArrowNavigation(event: KeyboardEvent): void {
    // This would require access to sibling triggers
    // Implementation would involve getting all triggers and navigating between them
    event.preventDefault();
  }

  private toggle(): void {
    if (!this.disabled && this.item) {
      this.item.toggle();
    }
  }
}
