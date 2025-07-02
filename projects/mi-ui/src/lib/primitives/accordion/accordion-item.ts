import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Optional,
  SkipSelf,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionContext, AccordionRootComponent } from './accordion-root';

export interface AccordionChildComponent {
  setContext(context: AccordionContext, item: AccordionItemComponent): void;
}

@Component({
  selector: 'accordion-item, [accordionItem]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block accordion-item',
    '[style.border-bottom]': 'isLast ? "none" : "1px solid hsl(214.3 31.8% 91.4%)"',
    '[attr.data-state]': 'dataState',
    '[attr.data-disabled]': 'disabled ? "" : null'
  }
})
export class AccordionItemComponent implements OnInit {
  @Input() value!: string;
  @Input() disabled = false;
  @Input() isLast = false;

  private context?: AccordionContext;
  private childComponents: AccordionChildComponent[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    @Optional() private accordionRoot?: AccordionRootComponent
  ) {}

  ngOnInit() {
    if (!this.value) {
      throw new Error('AccordionItem: value is required');
    }

    // Register with the accordion root if available
    if (this.accordionRoot) {
      this.accordionRoot.registerItem(this);
    }
  }

  setContext(context: AccordionContext): void {
    this.context = context;

    // Update all registered child components
    this.childComponents.forEach(child => {
      child.setContext(context, this);
    });
    
    // Mark for check to ensure state updates properly
    this.cdr.markForCheck();
  }

  registerChild(child: AccordionChildComponent): void {
    this.childComponents.push(child);
    if (this.context) {
      child.setContext(this.context, this);
    }
  }

  get dataState(): 'open' | 'closed' {
    return this.context?.isOpen(this.value) ? 'open' : 'closed';
  }

  get isOpen(): boolean {
    return this.context?.isOpen(this.value) ?? false;
  }

  toggle(): void {
    if (!this.disabled && this.context) {
      this.context.toggle(this.value);
      // Force change detection to update data-state attributes
      this.cdr.markForCheck();

      // Update child components with explicit change detection
      this.childComponents.forEach(child => {
        if ('cdr' in child && typeof (child as any).cdr?.markForCheck === 'function') {
          (child as any).cdr.markForCheck();
        }
        // Re-trigger height calculation for content components
        if ('recalculateHeight' in child && typeof (child as any).recalculateHeight === 'function') {
          setTimeout(() => (child as any).recalculateHeight(), 0);
        }
      });
    }
  }
}
