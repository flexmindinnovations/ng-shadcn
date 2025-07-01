import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ToggleGroupItem {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-toggle-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getContainerClasses()" role="group">
      <button
        *ngFor="let item of items; let i = index"
        type="button"
        [disabled]="item.disabled || disabled"
        [class]="getItemClasses(item, i)"
        (click)="toggleItem(item)"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <svg
          *ngIf="item.icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
          [class.mr-2]="item.label"
        >
          <path [attr.d]="item.icon"/>
        </svg>
        <span *ngIf="item.label">{{ item.label }}</span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToggleGroupComponent implements OnInit {
  @Input() items: ToggleGroupItem[] = [];
  @Input() value: string | string[] = [];
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variant: 'default' | 'outline' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  @Output() valueChange = new EventEmitter<string | string[]>();
  @Output() selectionChange = new EventEmitter<{ value: string | string[]; selected: ToggleGroupItem | ToggleGroupItem[] }>();

  ngOnInit() {
    // Ensure value is in the correct format
    if (!this.multiple && Array.isArray(this.value)) {
      this.value = this.value[0] || '';
    } else if (this.multiple && !Array.isArray(this.value)) {
      this.value = this.value ? [this.value as string] : [];
    }
  }

  toggleItem(item: ToggleGroupItem) {
    if (item.disabled || this.disabled) return;

    if (this.multiple) {
      const values = this.value as string[];
      const index = values.indexOf(item.value);

      if (index >= 0) {
        // Remove item
        const newValues = values.filter(v => v !== item.value);
        this.value = newValues;
      } else {
        // Add item
        this.value = [...values, item.value];
      }

      const selectedItems = this.items.filter(i => (this.value as string[]).includes(i.value));
      this.selectionChange.emit({ value: this.value, selected: selectedItems });
    } else {
      // Single selection
      if (this.value === item.value) {
        // Deselect if already selected
        this.value = '';
        this.selectionChange.emit({ value: this.value, selected: [] });
      } else {
        // Select new item
        this.value = item.value;
        this.selectionChange.emit({ value: this.value, selected: item });
      }
    }

    this.valueChange.emit(this.value);
  }

  isSelected(item: ToggleGroupItem): boolean {
    if (this.multiple) {
      return (this.value as string[]).includes(item.value);
    } else {
      return this.value === item.value;
    }
  }

  getContainerClasses(): string {
    let classes = 'flex';

    if (this.orientation === 'vertical') {
      classes += ' flex-col';
    } else {
      classes += ' flex-row';
    }

    return classes;
  }

  getItemClasses(item: ToggleGroupItem, index: number): string {
    let classes = '';

    // Base classes based on variant
    if (this.variant === 'outline') {
      classes += ' border border-input bg-transparent';
    } else {
      classes += ' border border-transparent';
    }

    // Size classes
    switch (this.size) {
      case 'sm':
        classes += ' h-8 px-2 text-xs';
        break;
      case 'lg':
        classes += ' h-12 px-4 text-base';
        break;
      default:
        classes += ' h-10 px-3 text-sm';
        break;
    }

    // State classes
    if (this.isSelected(item)) {
      if (this.variant === 'outline') {
        classes += ' bg-accent text-accent-foreground';
      } else {
        classes += ' bg-accent text-accent-foreground';
      }
    } else {
      classes += ' hover:bg-muted hover:text-muted-foreground';
    }

    // Position classes for grouped appearance
    if (this.orientation === 'horizontal') {
      if (index === 0 && this.items.length > 1) {
        classes += ' rounded-r-none border-r-0';
      } else if (index === this.items.length - 1 && this.items.length > 1) {
        classes += ' rounded-l-none';
      } else if (this.items.length > 2) {
        classes += ' rounded-none border-r-0';
      }
    } else {
      if (index === 0 && this.items.length > 1) {
        classes += ' rounded-b-none border-b-0';
      } else if (index === this.items.length - 1 && this.items.length > 1) {
        classes += ' rounded-t-none';
      } else if (this.items.length > 2) {
        classes += ' rounded-none border-b-0';
      }
    }

    return classes;
  }
}
