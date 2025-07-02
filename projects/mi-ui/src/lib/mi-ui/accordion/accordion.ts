import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
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
  // Icon customization
  expandIcon?: string;
  collapseIcon?: string;
  // Styling customization
  headerClass?: string;
  contentClass?: string;
  iconClass?: string;
  contentStyle?: { [key: string]: any };
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
      #accordionRootRef
      [type]="type"
      [collapsible]="collapsible"
      [disabled]="disabled"
      [value]="value"
      [defaultValue]="defaultValue"
      (valueChange)="onValueChange($event)"
      [class]="containerClass">
      
      @for (item of items; track item.value; let isLast = $last) {
        <accordion-item 
          [value]="item.value"
          [disabled]="!!item.disabled"
          [isLast]="isLast">
          
          <accordion-trigger 
            [class]="getTriggerClass(item)">
            
            @if (iconPosition === 'left') {
              <div [class]="getIconClass(item)">
                @if (item.expandIcon || item.collapseIcon) {
                  <!-- Custom SVG icon -->
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200">
                    <path [attr.d]="getIconSvg(getCurrentIcon(item))" fill="currentColor"/>
                  </svg>
                } @else {
                  <!-- Default chevron icon -->
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                    [class.rotate-180]="isItemOpen(item.value)">
                    <path d="m4.427 6.72 3.396 3.395a.25.25 0 0 0 .354 0l3.396-3.395A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427z" fill="currentColor"/>
                  </svg>
                }
              </div>
              <span class="flex-1 text-left ml-2">{{ item.trigger }}</span>
            } @else {
              <span class="flex-1 text-left">{{ item.trigger }}</span>
              <div [class]="getIconClass(item)">
                @if (item.expandIcon || item.collapseIcon) {
                  <!-- Custom SVG icon -->
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200">
                    <path [attr.d]="getIconSvg(getCurrentIcon(item))" fill="currentColor"/>
                  </svg>
                } @else {
                  <!-- Default chevron icon -->
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                    [class.rotate-180]="isItemOpen(item.value)">
                    <path d="m4.427 6.72 3.396 3.395a.25.25 0 0 0 .354 0l3.396-3.395A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427z" fill="currentColor"/>
                  </svg>
                }
              </div>
            }
          </accordion-trigger>
          
          <accordion-content 
            [class]="getContentClass(item)"
            [ngStyle]="item.contentStyle">
            <div class="pb-4 pt-0" [innerHTML]="item.content"></div>
          </accordion-content>
          
        </accordion-item>
      }
    </accordion-root>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements AfterViewInit {
  @Input() items: AccordionItem[] = [];
  @Input() type: AccordionType = 'single';
  @Input() collapsible = false;
  @Input() disabled = false;
  @Input() value?: AccordionValue;
  @Input() defaultValue?: AccordionValue;
  @Input() className = '';
  @Input() iconPosition: 'left' | 'right' = 'right';

  @Output() valueChange = new EventEmitter<AccordionValue>();

  @ViewChild('accordionRootRef') accordionRoot!: AccordionRootComponent;

  ngAfterViewInit() {
    // Component is now ready
  }

  get containerClass(): string {
    return `w-full ${this.className}`.trim();
  }

  getTriggerClass(item: AccordionItem): string {
    const baseClass = 'flex flex-1 items-center py-4 text-sm font-medium transition-all hover:underline text-left w-full';
    const positionClass = this.iconPosition === 'left' ? 'gap-2' : 'justify-between';
    return `${baseClass} ${positionClass} ${item.headerClass || ''}`.trim();
  }

  getIconClass(item: AccordionItem): string {
    const baseClass = this.iconPosition === 'left' ? '' : '[&[data-state=open]>svg]:rotate-180';
    return `${baseClass} ${item.iconClass || ''}`.trim();
  }

  getContentClass(item: AccordionItem): string {
    const baseClass = 'overflow-hidden text-sm';
    return `${baseClass} ${item.contentClass || ''}`.trim();
  }

  getCurrentIcon(item: AccordionItem): string {
    // Return the appropriate icon based on the current state
    const isOpen = this.isItemOpen(item.value);
    
    if (item.expandIcon && item.collapseIcon) {
      return isOpen ? item.expandIcon : item.collapseIcon;
    }
    
    // Default icons
    return isOpen ? 'ChevronUp' : 'ChevronDown';
  }

  getIconSvg(iconName: string): string {
    // Map of common Lucide icon names to their SVG paths
    const iconMap: { [key: string]: string } = {
      'ChevronDown': 'm4.427 6.72 3.396 3.395a.25.25 0 0 0 .354 0l3.396-3.395A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427z',
      'ChevronUp': 'm10.573 8.28-3.396-3.395a.25.25 0 0 0-.354 0L3.427 8.28a.25.25 0 0 0 .177.427h6.792a.25.25 0 0 0 .177-.427z',
      'Plus': 'M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z',
      'Minus': 'M2.5 7.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5Z',
      'CaretDown': 'M3.5 5.5a.5.5 0 0 1 .854-.354L8 8.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4A.5.5 0 0 1 3.5 5.5Z',
      'CaretUp': 'M11.5 9.5a.5.5 0 0 1-.854.354L7 6.207 3.354 9.854a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 .146.354Z',
      'ArrowDown': 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1Z',
      'ArrowUp': 'M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5Z'
    };
    
    return iconMap[iconName] || iconMap['ChevronDown'];
  }

  isItemOpen(itemValue: string): boolean {
    // Access the accordion root's current state
    if (this.accordionRoot) {
      return this.accordionRoot.isOpen(itemValue);
    }
    // Fallback to checking the current value
    if (this.type === 'single') {
      return this.value === itemValue;
    } else {
      return Array.isArray(this.value) && this.value.includes(itemValue);
    }
  }

  onValueChange(value: AccordionValue): void {
    this.valueChange.emit(value);
  }
}
