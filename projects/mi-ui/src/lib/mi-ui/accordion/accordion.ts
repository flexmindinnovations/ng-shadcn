import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionRootComponent,
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent,
  AccordionType,
  AccordionValue
} from '../../primitives/accordion';

export interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-accordion',
  standalone: true,
  imports: [
    CommonModule,
    AccordionRootComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <accordion-root 
      [type]="type"
      [collapsible]="collapsible"
      [disabled]="disabled"
      [value]="value"
      [defaultValue]="defaultValue"
      (valueChange)="onValueChange($event)"
      [class]="containerClass">
      
      @for (item of items; track item.value) {
        <accordion-item 
          [value]="item.value"
          [disabled]="!!item.disabled">
          
          <accordion-trigger class="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180 w-full">
            {{ item.trigger }}
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200">
              <path d="m4.427 6.72 3.396 3.395a.25.25 0 0 0 .354 0l3.396-3.395A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427z" fill="currentColor"/>
            </svg>
          </accordion-trigger>
          
          <accordion-content class="overflow-hidden text-sm">
            <div class="pb-4 pt-0" [innerHTML]="item.content"></div>
          </accordion-content>
          
        </accordion-item>
      }
    </accordion-root>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() type: AccordionType = 'single';
  @Input() collapsible = false;
  @Input() disabled = false;
  @Input() value?: AccordionValue;
  @Input() defaultValue?: AccordionValue;
  @Input() className = '';

  @Output() valueChange = new EventEmitter<AccordionValue>();

  get containerClass(): string {
    return `w-full ${this.className}`.trim();
  }

  onValueChange(value: AccordionValue): void {
    this.valueChange.emit(value);
  }
}
