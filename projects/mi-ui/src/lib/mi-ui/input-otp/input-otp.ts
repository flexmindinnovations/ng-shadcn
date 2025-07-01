import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mi-input-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex items-center gap-2" [attr.aria-describedby]="describedBy">
      <input
        *ngFor="let digit of digits; let i = index"
        #otpInput
        type="text"
        maxlength="1"
        [value]="digit"
        [disabled]="disabled"
        [attr.aria-label]="'Digit ' + (i + 1) + ' of ' + length"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        (paste)="onPaste($event, i)"
        (focus)="onFocus(i)"
        class="flex h-10 w-10 rounded-md border border-input bg-background text-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        [class.border-destructive]="hasError"
      />
    </div>

    <div *ngIf="hasError && errorMessage" class="text-sm text-destructive mt-2">
      {{ errorMessage }}
    </div>

    <div *ngIf="description" class="text-sm text-muted-foreground mt-2">
      {{ description }}
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class InputOtpComponent implements OnInit, AfterViewInit {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() length: number = 6;
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() placeholder: string = '';
  @Input() allowAlphanumeric: boolean = false;
  @Input() errorMessage: string = '';
  @Input() hasError: boolean = false;
  @Input() description: string = '';
  @Input() describedBy: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() complete = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();

  digits: string[] = [];
  currentIndex: number = 0;

  ngOnInit() {
    this.initializeDigits();
  }

  ngAfterViewInit() {
    if (this.autoFocus && this.inputs.length > 0) {
      setTimeout(() => this.inputs.first.nativeElement.focus(), 0);
    }
  }

  initializeDigits() {
    this.digits = new Array(this.length).fill('');
    if (this.value) {
      const valueArray = this.value.split('');
      for (let i = 0; i < Math.min(valueArray.length, this.length); i++) {
        this.digits[i] = valueArray[i];
      }
    }
  }

  onInput(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;

    // Filter input based on allowAlphanumeric setting
    if (!this.allowAlphanumeric) {
      inputValue = inputValue.replace(/[^0-9]/g, '');
    } else {
      inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }

    // Take only the last character if multiple characters were entered
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(-1);
    }

    this.digits[index] = inputValue;
    target.value = inputValue;

    this.updateValue();

    // Move to next input if current input is filled
    if (inputValue && index < this.length - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Backspace':
        if (!target.value && index > 0) {
          // Move to previous input if current is empty
          this.focusInput(index - 1);
        } else {
          // Clear current input
          this.digits[index] = '';
          target.value = '';
          this.updateValue();
        }
        break;

      case 'Delete':
        this.digits[index] = '';
        target.value = '';
        this.updateValue();
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.focusInput(index - 1);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (index < this.length - 1) {
          this.focusInput(index + 1);
        }
        break;

      case 'Home':
        event.preventDefault();
        this.focusInput(0);
        break;

      case 'End':
        event.preventDefault();
        this.focusInput(this.length - 1);
        break;
    }
  }

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';

    let filteredData = pastedData;
    if (!this.allowAlphanumeric) {
      filteredData = pastedData.replace(/[^0-9]/g, '');
    } else {
      filteredData = pastedData.replace(/[^a-zA-Z0-9]/g, '');
    }

    // Fill inputs starting from current index
    for (let i = 0; i < filteredData.length && (index + i) < this.length; i++) {
      this.digits[index + i] = filteredData[i];
      const input = this.inputs.toArray()[index + i];
      if (input) {
        input.nativeElement.value = filteredData[i];
      }
    }

    this.updateValue();

    // Focus the next empty input or the last filled input
    const nextIndex = Math.min(index + filteredData.length, this.length - 1);
    this.focusInput(nextIndex);
  }

  onFocus(index: number) {
    this.currentIndex = index;
  }

  focusInput(index: number) {
    if (index >= 0 && index < this.length) {
      const inputArray = this.inputs.toArray();
      if (inputArray[index]) {
        inputArray[index].nativeElement.focus();
        this.currentIndex = index;
      }
    }
  }

  updateValue() {
    const newValue = this.digits.join('');
    this.value = newValue;
    this.valueChange.emit(newValue);
    this.change.emit(newValue);

    // Check if OTP is complete
    if (newValue.length === this.length && !newValue.includes('')) {
      this.complete.emit(newValue);
    }
  }

  clear() {
    this.digits.fill('');
    this.inputs.forEach(input => {
      input.nativeElement.value = '';
    });
    this.updateValue();
    this.focusInput(0);
  }

  setValue(value: string) {
    this.value = value;
    this.initializeDigits();

    // Update input elements
    this.inputs.forEach((input, index) => {
      input.nativeElement.value = this.digits[index] || '';
    });
  }
}
