import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-combobox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <div class="relative">
        <input
          #inputElement
          type="text"
          [(ngModel)]="searchTerm"
          (input)="onSearch($event)"
          (focus)="onFocus()"
          (keydown)="onKeyDown($event)"
          [placeholder]="placeholder"
          [disabled]="disabled"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
        />
        <button
          type="button"
          (click)="toggleDropdown()"
          [disabled]="disabled"
          class="absolute inset-y-0 right-0 flex items-center px-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 opacity-50">
            <path d="m7 15 5 5 5-5"/>
            <path d="m7 9 5-5 5 5"/>
          </svg>
        </button>
      </div>

      <div
        *ngIf="isOpen && filteredOptions.length > 0"
        class="absolute z-50 w-full mt-1 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
        [style.max-height]="maxHeight + 'px'"
        style="overflow-y: auto;"
      >
        <div class="max-h-60 overflow-auto p-1">
          <div
            *ngFor="let option of filteredOptions; let i = index"
            (click)="selectOption(option)"
            [class]="getOptionClasses(option, i)"
            class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
          >
            <svg
              *ngIf="isSelected(option)"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4"
            >
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span [class]="isSelected(option) ? '' : 'ml-6'">{{ option.label }}</span>
          </div>

          <div *ngIf="filteredOptions.length === 0 && searchTerm" class="px-2 py-1.5 text-sm text-muted-foreground">
            No results found.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComboboxComponent implements OnInit {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  @Input() options: ComboboxOption[] = [];
  @Input() placeholder: string = 'Select option...';
  @Input() disabled: boolean = false;
  @Input() searchable: boolean = true;
  @Input() maxHeight: number = 200;
  @Input() value?: string;
  @Input() emptyMessage: string = 'No results found.';

  @Output() valueChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<ComboboxOption | null>();

  searchTerm: string = '';
  isOpen: boolean = false;
  filteredOptions: ComboboxOption[] = [];
  highlightedIndex: number = -1;
  selectedOption: ComboboxOption | null = null;

  ngOnInit() {
    this.filteredOptions = this.options;
    if (this.value) {
      const option = this.options.find(opt => opt.value === this.value);
      if (option) {
        this.selectedOption = option;
        this.searchTerm = option.label;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.inputElement?.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterOptions();
    this.isOpen = true;
    this.highlightedIndex = -1;
  }

  onFocus() {
    if (!this.disabled) {
      this.isOpen = true;
      this.filterOptions();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredOptions.length) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  toggleDropdown() {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.isOpen = true;
      this.filterOptions();
      this.inputElement.nativeElement.focus();
    }
  }

  filterOptions() {
    if (!this.searchable || !this.searchTerm) {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectOption(option: ComboboxOption) {
    if (option.disabled) return;

    this.selectedOption = option;
    this.searchTerm = option.label;
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.selectionChange.emit(option);
    this.closeDropdown();
  }

  closeDropdown() {
    this.isOpen = false;
    this.highlightedIndex = -1;

    // Reset search term to selected option label if no option is selected
    if (this.selectedOption) {
      this.searchTerm = this.selectedOption.label;
    } else if (!this.searchTerm) {
      this.searchTerm = '';
    }
  }

  navigateOptions(direction: number) {
    if (this.filteredOptions.length === 0) return;

    this.highlightedIndex += direction;

    if (this.highlightedIndex < 0) {
      this.highlightedIndex = this.filteredOptions.length - 1;
    } else if (this.highlightedIndex >= this.filteredOptions.length) {
      this.highlightedIndex = 0;
    }
  }

  getOptionClasses(option: ComboboxOption, index: number): string {
    let classes = '';

    if (option.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else {
      classes += ' hover:bg-accent hover:text-accent-foreground cursor-pointer';
    }

    if (index === this.highlightedIndex) {
      classes += ' bg-accent text-accent-foreground';
    }

    return classes;
  }

  isSelected(option: ComboboxOption): boolean {
    return this.selectedOption?.value === option.value;
  }
}
