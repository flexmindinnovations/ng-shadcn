import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mi-collapsible',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('false', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('false <=> true', animate('200ms ease-in-out'))
    ])
  ],
  template: `
    <div class="collapsible">
      <ng-content select="[slot=trigger]"></ng-content>
      <div [@slideInOut]="open" class="collapsible-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class Collapsible implements OnInit {
  @Input() open = false;
  @Input() disabled = false;
  @Output() openChange = new EventEmitter<boolean>();

  ngOnInit() {
    // Initialize component
  }

  toggle() {
    if (this.disabled) return;

    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}

@Component({
  selector: 'mi-collapsible-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [disabled]="disabled"
      (click)="onClick()"
      class="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
      [attr.data-state]="open ? 'open' : 'closed'"
      [attr.aria-expanded]="open">
      <ng-content></ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 shrink-0 transition-transform duration-200">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  `,
})
export class CollapsibleTrigger {
  @Input() open = false;
  @Input() disabled = false;
  @Output() trigger = new EventEmitter<void>();

  onClick() {
    if (this.disabled) return;
    this.trigger.emit();
  }
}

@Component({
  selector: 'mi-collapsible-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      <div class="pb-4 pt-0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CollapsibleContent {
  @Input() open = false;
}
