import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const avatarImageVariants = cva(
  'aspect-square h-full w-full object-cover'
);

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium'
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  class?: string;
  src?: string;
  alt?: string;
  fallback?: string;
}

@Component({
  selector: 'mi-avatar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div [class]="avatarClass">
      <img
        *ngIf="src && !imageError"
        [src]="src"
        [alt]="alt || 'Avatar'"
        [class]="imageClass"
        (error)="onImageError()"
        (load)="onImageLoad()"
      />
      <div
        *ngIf="!src || imageError"
        [class]="fallbackClass"
      >
        <span *ngIf="fallback; else defaultIcon" [style.font-size]="fallbackFontSize">
          {{ fallback }}
        </span>
        <ng-template #defaultIcon>
          <mi-icon name="User" [size]="iconSize"></mi-icon>
        </ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements AvatarProps {
  @Input() size: AvatarProps['size'] = 'default';
  @Input() class?: string;
  @Input() src?: string;
  @Input() alt?: string;
  @Input() fallback?: string;

  imageError = false;

  get avatarClass(): string {
    return `${avatarVariants({ size: this.size })} ${this.class || ''}`.trim();
  }

  get imageClass(): string {
    return avatarImageVariants();
  }

  get fallbackClass(): string {
    return avatarFallbackVariants();
  }

  get iconSize(): number {
    switch (this.size) {
      case 'sm': return 16;
      case 'lg': return 20;
      case 'xl': return 28;
      default: return 18;
    }
  }

  get fallbackFontSize(): string {
    switch (this.size) {
      case 'sm': return '0.75rem';
      case 'lg': return '1rem';
      case 'xl': return '1.25rem';
      default: return '0.875rem';
    }
  }

  onImageError(): void {
    this.imageError = true;
  }

  onImageLoad(): void {
    this.imageError = false;
  }
}
