import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mi-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div class="overflow-hidden" #carouselContainer>
        <div
          class="flex transition-transform duration-300 ease-in-out"
          [style.transform]="'translateX(-' + (currentIndex * 100) + '%)'"
          [style.width]="(slides.length * 100) + '%'"
        >
          <div
            *ngFor="let slide of slides; let i = index"
            class="w-full flex-shrink-0"
            [style.width]="(100 / slides.length) + '%'"
          >
            <ng-content select="[data-carousel-item]"></ng-content>
            <div *ngIf="!hasCustomContent" class="flex aspect-square items-center justify-center p-6">
              <span class="text-3xl font-semibold">{{ i + 1 }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        *ngIf="showPrevNext"
        type="button"
        (click)="previous()"
        [disabled]="currentIndex === 0 && !loop"
        class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span class="sr-only">Previous slide</span>
      </button>

      <button
        *ngIf="showPrevNext"
        type="button"
        (click)="next()"
        [disabled]="currentIndex === slides.length - 1 && !loop"
        class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="m9 18 6-6-6-6"/>
        </svg>
        <span class="sr-only">Next slide</span>
      </button>

      <div *ngIf="showDots" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        <button
          *ngFor="let slide of slides; let i = index"
          type="button"
          (click)="goToSlide(i)"
          [class]="getDotClasses(i)"
          class="h-2 w-2 rounded-full transition-colors"
        >
          <span class="sr-only">Go to slide {{ i + 1 }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  @Input() slides: any[] = [1, 2, 3, 4, 5]; // Default slides for demo
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 3000;
  @Input() loop: boolean = true;
  @Input() showPrevNext: boolean = true;
  @Input() showDots: boolean = true;

  @Output() slideChange = new EventEmitter<number>();

  currentIndex: number = 0;
  autoPlayTimer?: number;
  hasCustomContent = false;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit() {
    // Check if there's custom content
    this.hasCustomContent = this.carouselContainer.nativeElement.querySelector('[data-carousel-item]') !== null;
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else if (this.loop) {
      this.currentIndex = 0;
    }
    this.slideChange.emit(this.currentIndex);
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.loop) {
      this.currentIndex = this.slides.length - 1;
    }
    this.slideChange.emit(this.currentIndex);
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.slideChange.emit(this.currentIndex);
  }

  getDotClasses(index: number): string {
    return index === this.currentIndex
      ? 'bg-primary'
      : 'bg-primary/20 hover:bg-primary/40';
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }
}
