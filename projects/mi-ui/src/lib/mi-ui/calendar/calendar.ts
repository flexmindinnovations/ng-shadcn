import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'mi-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-3">
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          (click)="previousMonth()"
          [disabled]="isPreviousDisabled()"
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
          [disabled]="isNextDisabled()"
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
                [disabled]="day.isDisabled"
                [class]="getDateClasses(day)"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CalendarComponent implements OnInit {
  @Input() selected?: Date;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled: boolean = false;

  @Output() selectedChange = new EventEmitter<Date>();
  @Output() dateSelect = new EventEmitter<Date>();

  currentDate = new Date();
  calendarDates: (CalendarDate | null)[][] = [];
  dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  ngOnInit() {
    this.generateCalendar();
  }

  getMonthYear(): string {
    return this.currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const weeks: (CalendarDate | null)[][] = [];
    let currentWeek: (CalendarDate | null)[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const calendarDate: CalendarDate = {
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date),
        isDisabled: this.isDisabled(date)
      };

      currentWeek.push(calendarDate);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    this.calendarDates = weeks;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    return this.selected ? date.toDateString() === this.selected.toDateString() : false;
  }

  isDisabled(date: Date): boolean {
    if (this.disabled) return true;
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  getDateClasses(day: CalendarDate): string {
    let classes = '';

    if (!day.isCurrentMonth) {
      classes += ' text-muted-foreground';
    }

    if (day.isToday) {
      classes += ' bg-accent text-accent-foreground';
    }

    if (day.isSelected) {
      classes += ' bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground';
    }

    return classes;
  }

  selectDate(day: CalendarDate) {
    if (day.isDisabled) return;

    this.selected = day.date;
    this.selectedChange.emit(day.date);
    this.dateSelect.emit(day.date);
    this.generateCalendar();
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  isPreviousDisabled(): boolean {
    if (!this.minDate) return false;
    const prevMonth = new Date(this.currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth < this.minDate;
  }

  isNextDisabled(): boolean {
    if (!this.maxDate) return false;
    const nextMonth = new Date(this.currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth > this.maxDate;
  }
}
