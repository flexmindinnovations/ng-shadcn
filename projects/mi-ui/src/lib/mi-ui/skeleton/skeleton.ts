import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        text: 'h-4 bg-muted',
        avatar: 'rounded-full bg-muted',
        button: 'h-10 bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  class?: string;
  width?: string;
  height?: string;
}

@Component({
  selector: 'mi-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="skeletonClass"
      [style.width]="width"
      [style.height]="height">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent implements SkeletonProps {
  @Input() variant: SkeletonProps['variant'] = 'default';
  @Input() class?: string;
  @Input() width?: string;
  @Input() height?: string;

  get skeletonClass(): string {
    return `${skeletonVariants({ variant: this.variant })} ${this.class || ''}`.trim();
  }
}
