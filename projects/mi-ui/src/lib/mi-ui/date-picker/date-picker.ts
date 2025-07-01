import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mi-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <div class="relative">
        <input
          #inputElement
          type="text"
          [(ngModel)]="displayValue"
          (focus)="onFocus()"
          (input)="onInput($event)"
          [placeholder]="placeholder"
          [disabled]="disabled"
          readonly
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
        />
        <button
          type="button"
          (click)="toggleCalendar()"
          [disabled]="disabled"
          class="absolute inset-y-0 right-0 flex items-center px-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground">
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <path d="M3 10h18"/>
          </svg>
        </button>
      </div>

      <div
        *ngIf="isOpen"
        class="absolute z-50 w-full mt-1 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
      >
        <div class="p-3">
          <div class="flex items-center justify-between mb-4">
            <button
              type="button"
              (click)="previousMonth()"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <div class="font-semibold">
              {{ getMonthYear() }}
            </div>

            <button
              type="button"
              (click)="nextMonth()"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th *ngFor="let day of dayNames" class="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center pb-2">
                  {{ day }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let week of calendarDates">
                <td *ngFor="let day of week" class="text-center p-0">
                  <button
                    type="button"
                    *ngIf="day"
                    (click)="selectDate(day)"
                    [disabled]="isDateDisabled(day)"
                    [class]="getDateClasses(day)"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal"
                  >
                    {{ day.getDate() }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div *ngIf="showToday" class="flex justify-center pt-4 border-t mt-4">
            <button
              type="button"
              (click)="selectToday()"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
            >
              Today
            </button>
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
export class DatePickerComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  @Input() value?: Date;
  @Input() placeholder: string = 'Pick a date';
  @Input() disabled: boolean = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format: string = 'MM/dd/yyyy';
  @Input() showToday: boolean = true;

  @Output() valueChange = new EventEmitter<Date>();
  @Output() dateSelect = new EventEmitter<Date>();

  isOpen: boolean = false;
  displayValue: string = '';
  currentViewDate = new Date();
  calendarDates: (Date | null)[][] = [];
  dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  ngOnInit() {
    this.updateDisplayValue();
    this.generateCalendar();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.inputElement?.nativeElement.contains(event.target as Node)) {
      this.closeCalendar();
    }
  }

  onFocus() {
    if (!this.disabled) {
      this.openCalendar();
    }
  }

  onInput(event: Event) {
    // Handle manual input if needed
    const target = event.target as HTMLInputElement;
    this.displayValue = target.value;
  }

  toggleCalendar() {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeCalendar();
    } else {
      this.openCalendar();
    }
  }

  openCalendar() {
    this.isOpen = true;
    if (this.value) {
      this.currentViewDate = new Date(this.value);
    }
    this.generateCalendar();
  }

  closeCalendar() {
    this.isOpen = false;
  }

  selectDate(date: Date) {
    if (this.isDateDisabled(date)) return;

    this.value = new Date(date);
    this.valueChange.emit(this.value);
    this.dateSelect.emit(this.value);
    this.updateDisplayValue();
    this.closeCalendar();
  }

  selectToday() {
    const today = new Date();
    this.selectDate(today);
  }

  previousMonth() {
    this.currentViewDate.setMonth(this.currentViewDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentViewDate.setMonth(this.currentViewDate.getMonth() + 1);
    this.generateCalendar();
  }

  getMonthYear(): string {
    return this.currentViewDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }

  generateCalendar() {
    const year = this.currentViewDate.getFullYear();
    const month = this.currentViewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Only show dates from current month or adjacent dates
      if (date.getMonth() === month ||
          (date < firstDay && i < 7) ||
          (date > lastDay && currentWeek.length > 0)) {
        currentWeek.push(date);
      } else {
        currentWeek.push(null);
      }

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    this.calendarDates = weeks;
  }

  isDateDisabled(date: Date): boolean {
    if (this.disabled) return true;
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    return this.value ? date.toDateString() === this.value.toDateString() : false;
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentViewDate.getMonth();
  }

  getDateClasses(date: Date): string {
    let classes = '';

    if (!this.isCurrentMonth(date)) {
      classes += ' text-muted-foreground';
    }

    if (this.isToday(date)) {
      classes += ' bg-accent text-accent-foreground';
    }

    if (this.isSelected(date)) {
      classes += ' bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground';
    }

    return classes;
  }

  updateDisplayValue() {
    if (this.value) {
      this.displayValue = this.formatDate(this.value);
    } else {
      this.displayValue = '';
    }
  }

  formatDate(date: Date): string {
    // Simple date formatting - in a real app you'd use a proper date library
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (this.format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'MMM dd, yyyy':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      default:
        return `${month}/${day}/${year}`;
    }
  }
}
