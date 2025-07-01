import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectorRef,
  Provider,
  forwardRef,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type AccordionType = 'single' | 'multiple';
export type AccordionValue = string | string[] | undefined;

export interface AccordionContext {
  type: AccordionType;
  collapsible: boolean;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  value: AccordionValue;
  onValueChange: (value: AccordionValue) => void;
  isOpen: (itemValue: string) => boolean;
  toggle: (itemValue: string) => void;
}

// Forward declare to avoid circular dependency
export interface AccordionItemLike {
  value: string;
  setContext(context: AccordionContext): void;
}

const ACCORDION_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AccordionRootComponent),
  multi: true
};

@Component({
  selector: 'accordion-root, [accordionRoot]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ACCORDION_VALUE_ACCESSOR],
  host: {
    '[attr.data-orientation]': 'orientation',
    'style': 'border: none; background: transparent;'
  }
})
export class AccordionRootComponent implements OnInit, AfterContentInit, ControlValueAccessor, AccordionContext {
  @Input() type: AccordionType = 'single';
  @Input() collapsible = false;
  @Input() disabled = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() value: AccordionValue;
  @Input() defaultValue: AccordionValue;

  @Output() valueChange = new EventEmitter<AccordionValue>();

  // Manual registration approach to avoid circular imports
  private registeredItems: AccordionItemLike[] = [];
  private _value: AccordionValue;
  private _openItems = new Set<string>();

  // ControlValueAccessor
  private onChange = (value: AccordionValue) => {};
  private onTouched = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this._value = this.value ?? this.defaultValue;
    this.updateOpenItems();
  }

  ngAfterContentInit() {
    // Register this context with manually registered items
    this.registeredItems.forEach(item => {
      item.setContext(this);
    });
  }

  registerItem(item: AccordionItemLike): void {
    this.registeredItems.push(item);
    item.setContext(this);
  }

  private updateOpenItems() {
    this._openItems.clear();
    if (this._value) {
      const values = Array.isArray(this._value) ? this._value : [this._value];
      values.forEach(v => this._openItems.add(v));
    }
  }

  isOpen(itemValue: string): boolean {
    return this._openItems.has(itemValue);
  }

  toggle(itemValue: string): void {
    const wasOpen = this._openItems.has(itemValue);

    if (this.type === 'single') {
      if (wasOpen) {
        if (this.collapsible) {
          this._openItems.clear();
        }
      } else {
        this._openItems.clear();
        this._openItems.add(itemValue);
      }
    } else {
      // multiple
      if (wasOpen) {
        this._openItems.delete(itemValue);
      } else {
        this._openItems.add(itemValue);
      }
    }

    this.updateValue();
  }

  private updateValue(): void {
    const newValue = this.type === 'single'
      ? Array.from(this._openItems)[0] || undefined
      : Array.from(this._openItems);

    this._value = newValue;
    this.onValueChange(newValue);
    
    // Force change detection for all registered items
    this.registeredItems.forEach(item => {
      // Try to trigger change detection on accordion items
      if (typeof (item as any).cdr?.markForCheck === 'function') {
        (item as any).cdr.markForCheck();
      }
    });
  }

  onValueChange(value: AccordionValue): void {
    this.valueChange.emit(value);
    this.onChange(value);
    this.cdr.markForCheck();
  }

  // ControlValueAccessor implementation
  writeValue(value: AccordionValue): void {
    this._value = value;
    this.updateOpenItems();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: AccordionValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
