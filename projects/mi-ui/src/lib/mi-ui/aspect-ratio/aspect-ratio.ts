import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const aspectRatioVariants = cva(
  'relative w-full',
  {
    variants: {
      ratio: {
        square: 'aspect-square',
        video: 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '3/2': 'aspect-[3/2]',
        '16/9': 'aspect-[16/9]',
        '21/9': 'aspect-[21/9]',
      },
    },
    defaultVariants: {
      ratio: 'video',
    },
  }
);

@Component({
  selector: 'mi-aspect-ratio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="aspectRatioClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class AspectRatio implements VariantProps<typeof aspectRatioVariants> {
  @Input() ratio: 'square' | 'video' | '4/3' | '3/2' | '16/9' | '21/9' = 'video';

  get aspectRatioClass(): string {
    return aspectRatioVariants({ ratio: this.ratio });
  }
}
