import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const separatorVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  class?: string;
}

@Component({
  selector: 'mi-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="separatorClass"
      role="separator"
      [attr.aria-orientation]="orientation">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent implements SeparatorProps {
  @Input() orientation: SeparatorProps['orientation'] = 'horizontal';
  @Input() class?: string;

  get separatorClass(): string {
    return `${separatorVariants({ orientation: this.orientation })} ${this.class || ''}`.trim();
  }
}
