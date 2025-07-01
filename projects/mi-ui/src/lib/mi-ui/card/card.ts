import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-lg',
        outline: 'border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6'
);

const cardTitleVariants = cva(
  'text-2xl font-semibold leading-none tracking-tight'
);

const cardDescriptionVariants = cva(
  'text-sm text-gray-600 dark:text-gray-400'
);

const cardContentVariants = cva(
  'p-6 pt-0'
);

const cardFooterVariants = cva(
  'flex items-center p-6 pt-0'
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  class?: string;
}

@Component({
  selector: 'mi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements CardProps {
  @Input() variant: CardProps['variant'] = 'default';
  @Input() class?: string;

  get cardClass(): string {
    return `${cardVariants({ variant: this.variant })} ${this.class || ''}`.trim();
  }
}

@Component({
  selector: 'mi-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="headerClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() class?: string;

  get headerClass(): string {
    return `${cardHeaderVariants()} ${this.class || ''}`.trim();
  }
}

@Component({
  selector: 'mi-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 [class]="titleClass">
      <ng-content></ng-content>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  @Input() class?: string;

  get titleClass(): string {
    return `${cardTitleVariants()} ${this.class || ''}`.trim();
  }
}

@Component({
  selector: 'mi-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="descriptionClass">
      <ng-content></ng-content>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDescriptionComponent {
  @Input() class?: string;

  get descriptionClass(): string {
    return `${cardDescriptionVariants()} ${this.class || ''}`.trim();
  }
}

@Component({
  selector: 'mi-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="contentClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  @Input() class?: string;

  get contentClass(): string {
    return `${cardContentVariants()} ${this.class || ''}`.trim();
  }
}

@Component({
  selector: 'mi-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="footerClass">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {
  @Input() class?: string;

  get footerClass(): string {
    return `${cardFooterVariants()} ${this.class || ''}`.trim();
  }
}
