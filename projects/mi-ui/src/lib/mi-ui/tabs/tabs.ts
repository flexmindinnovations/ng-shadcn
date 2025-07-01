import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        underline: 'bg-transparent border-b border-gray-200 dark:border-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
);

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsListVariants> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
}

@Component({
  selector: 'mi-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <div [class]="tabsListClass" role="tablist">
        @for (tab of tabs; track tab.value) {
          <button
            type="button"
            role="tab"
            [class]="tabsTriggerClass"
            [attr.data-state]="currentValue === tab.value ? 'active' : 'inactive'"
            [disabled]="tab.disabled"
            [attr.aria-selected]="currentValue === tab.value"
            (click)="selectTab(tab.value)">
            {{ tab.label }}
          </button>
        }
      </div>
      <div
        [class]="tabsContentClass"
        role="tabpanel"
        [attr.aria-labelledby]="currentValue + '-tab'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements TabsProps {
  @Input() tabs: TabItem[] = [];
  @Input() variant: TabsProps['variant'] = 'default';
  @Input() value?: string;
  @Input() defaultValue?: string;
  @Output() valueChange = new EventEmitter<string>();

  public currentValue = '';

  ngOnInit() {
    this.currentValue = this.value || this.defaultValue || (this.tabs[0]?.value ?? '');
  }

  get tabsListClass(): string {
    return tabsListVariants({ variant: this.variant });
  }

  get tabsTriggerClass(): string {
    return tabsTriggerVariants({ variant: this.variant });
  }

  get tabsContentClass(): string {
    return tabsContentVariants();
  }

  selectTab(value: string): void {
    if (this.currentValue !== value) {
      this.currentValue = value;
      this.valueChange.emit(value);
    }
  }
}

@Component({
  selector: 'mi-tab-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isActive" [class]="tabsContentClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent {
  @Input() value = '';
  @Input() activeValue = '';

  get isActive(): boolean {
    return this.value === this.activeValue;
  }

  get tabsContentClass(): string {
    return tabsContentVariants();
  }
}
