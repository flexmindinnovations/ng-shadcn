import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface LabelProps extends VariantProps<typeof labelVariants> {
  for?: string;
  class?: string;
}

@Component({
  selector: 'mi-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [for]="for"
      [class]="labelClass">
      <ng-content></ng-content>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements LabelProps {
  @Input() for?: string;
  @Input() size: LabelProps['size'] = 'default';
  @Input() class?: string;

  get labelClass(): string {
    return `${labelVariants({ size: this.size })} ${this.class || ''}`.trim();
  }
}
