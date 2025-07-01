import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  routerLink?: string;
  disabled?: boolean;
}

@Component({
  selector: 'mi-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li *ngFor="let item of items; let i = index; trackBy: trackByIndex" class="inline-flex items-center">
          <!-- Separator (not for first item) -->
          <svg
            *ngIf="i > 0"
            class="rtl:rotate-180 w-3 h-3 text-muted-foreground mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>

          <!-- Link or text based on if it's the last item or disabled -->
          <ng-container *ngIf="i === items.length - 1 || item.disabled; else linkTemplate">
            <span class="text-sm font-medium text-foreground" [attr.aria-current]="i === items.length - 1 ? 'page' : null">
              {{ item.label }}
            </span>
          </ng-container>

          <ng-template #linkTemplate>
            <!-- Router Link -->
            <a
              *ngIf="item.routerLink; else hrefLink"
              [routerLink]="item.routerLink"
              class="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {{ item.label }}
            </a>

            <!-- Regular href link -->
            <ng-template #hrefLink>
              <a
                *ngIf="item.href"
                [href]="item.href"
                class="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {{ item.label }}
              </a>
              <span
                *ngIf="!item.href"
                class="inline-flex items-center text-sm font-medium text-muted-foreground">
                {{ item.label }}
              </span>
            </ng-template>
          </ng-template>
        </li>
      </ol>
    </nav>
  `
})
export class Breadcrumb {
  @Input() items: BreadcrumbItem[] = [];

  trackByIndex(index: number): number {
    return index;
  }
}
