import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconComponent } from '../icon/icon';
import { LucideIconName } from '../../services/icon.service';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'mi-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class Button implements VariantProps<typeof buttonVariants> {
  @Input() variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className = '';
  @Input() icon?: LucideIconName;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() buttonClick = new EventEmitter<Event>();

  get classes(): string {
    return [
      buttonVariants({ variant: this.variant, size: this.size }),
      this.className
    ].filter(Boolean).join(' ');
  }

  onClick(event: Event) {
    console.log('Button clicked!', { disabled: this.disabled, loading: this.loading, variant: this.variant });
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
