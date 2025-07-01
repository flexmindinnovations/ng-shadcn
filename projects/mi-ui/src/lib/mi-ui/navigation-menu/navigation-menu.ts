import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const navigationMenuVariants = cva(
  'relative z-10 flex max-w-max flex-1 items-center justify-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const navigationMenuListVariants = cva(
  'group flex flex-1 list-none items-center justify-center space-x-1',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row space-x-1 space-y-0',
        vertical: 'flex-col space-x-0 space-y-1',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const navigationMenuItemVariants = cva('relative');

const navigationMenuTriggerVariants = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group-[.data-[state=open]]:bg-accent/50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const navigationMenuContentVariants = cva(
  'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto'
);

const navigationMenuLinkVariants = cva(
  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
);

@Component({
  selector: 'mi-navigation-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class]="navigationMenuClass" role="navigation">
      <div class="relative">
        <ng-content></ng-content>
      </div>
    </nav>
  `,
})
export class NavigationMenu implements VariantProps<typeof navigationMenuVariants> {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';

  get navigationMenuClass(): string {
    return `${navigationMenuVariants({ orientation: this.orientation })} ${this.className}`;
  }
}

@Component({
  selector: 'mi-navigation-menu-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul [class]="listClass">
      <ng-content></ng-content>
    </ul>
  `,
})
export class NavigationMenuList implements VariantProps<typeof navigationMenuListVariants> {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';

  get listClass(): string {
    return `${navigationMenuListVariants({ orientation: this.orientation })} ${this.className}`;
  }
}

@Component({
  selector: 'mi-navigation-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li [class]="itemClass">
      <ng-content></ng-content>
    </li>
  `,
})
export class NavigationMenuItem implements VariantProps<typeof navigationMenuItemVariants> {
  @Input() className = '';

  get itemClass(): string {
    return `${navigationMenuItemVariants()} ${this.className}`;
  }
}

@Component({
  selector: 'mi-navigation-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="triggerClass"
      type="button"
      [attr.aria-expanded]="expanded"
      (click)="toggle()"
      (keydown.enter)="toggle()"
      (keydown.space)="toggle()">
      <ng-content></ng-content>
      <svg
        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
  `,
})
export class NavigationMenuTrigger implements VariantProps<typeof navigationMenuTriggerVariants> {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() className = '';
  @Input() expanded = false;

  get triggerClass(): string {
    return `${navigationMenuTriggerVariants({ size: this.size })} ${this.className}`;
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}

@Component({
  selector: 'mi-navigation-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="contentClass"
      [hidden]="!visible"
      role="region">
      <ng-content></ng-content>
    </div>
  `,
})
export class NavigationMenuContent implements VariantProps<typeof navigationMenuContentVariants> {
  @Input() className = '';
  @Input() visible = false;

  get contentClass(): string {
    return `${navigationMenuContentVariants()} ${this.className}`;
  }
}

@Component({
  selector: 'mi-navigation-menu-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [class]="linkClass"
      [href]="href"
      [attr.target]="target"
      [attr.rel]="rel">
      <ng-content></ng-content>
    </a>
  `,
})
export class NavigationMenuLink implements VariantProps<typeof navigationMenuLinkVariants> {
  @Input() href = '#';
  @Input() target?: string;
  @Input() rel?: string;
  @Input() className = '';

  get linkClass(): string {
    return `${navigationMenuLinkVariants()} ${this.className}`;
  }
}

@Component({
  selector: 'mi-navigation-menu-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]">
      <ng-content></ng-content>
    </div>
  `,
})
export class NavigationMenuViewport {}

@Component({
  selector: 'mi-navigation-menu-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in">
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"></div>
    </div>
  `,
})
export class NavigationMenuIndicator {}

// Example usage component
@Component({
  selector: 'mi-main-nav',
  standalone: true,
  imports: [
    CommonModule,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuViewport
  ],
  template: `
    <mi-navigation-menu>
      <mi-navigation-menu-list>

        <!-- Products Menu -->
        <mi-navigation-menu-item>
          <mi-navigation-menu-trigger [expanded]="productsExpanded" (click)="productsExpanded = !productsExpanded">
            Products
          </mi-navigation-menu-trigger>
          <mi-navigation-menu-content [visible]="productsExpanded">
            <div class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div class="row-span-3">
                <mi-navigation-menu-link href="/" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                  <div class="mb-2 mt-4 text-lg font-medium">
                    shadcn/ui
                  </div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                  </p>
                </mi-navigation-menu-link>
              </div>
              <mi-navigation-menu-link href="/docs" className="block">
                <div class="text-sm font-medium leading-none">Documentation</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  How to install dependencies and structure your app.
                </p>
              </mi-navigation-menu-link>
              <mi-navigation-menu-link href="/docs/installation" className="block">
                <div class="text-sm font-medium leading-none">Installation</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Install and configure your development environment.
                </p>
              </mi-navigation-menu-link>
              <mi-navigation-menu-link href="/docs/components" className="block">
                <div class="text-sm font-medium leading-none">Components</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Browse the components and see how to use them.
                </p>
              </mi-navigation-menu-link>
            </div>
          </mi-navigation-menu-content>
        </mi-navigation-menu-item>

        <!-- Components Menu -->
        <mi-navigation-menu-item>
          <mi-navigation-menu-trigger [expanded]="componentsExpanded" (click)="componentsExpanded = !componentsExpanded">
            Components
          </mi-navigation-menu-trigger>
          <mi-navigation-menu-content [visible]="componentsExpanded">
            <div class="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <mi-navigation-menu-link href="/docs/components/accordion" className="block">
                <div class="text-sm font-medium leading-none">Accordion</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  A vertically stacked set of interactive headings.
                </p>
              </mi-navigation-menu-link>
              <mi-navigation-menu-link href="/docs/components/alert-dialog" className="block">
                <div class="text-sm font-medium leading-none">Alert Dialog</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  A modal dialog that interrupts the user with important content.
                </p>
              </mi-navigation-menu-link>
              <mi-navigation-menu-link href="/docs/components/button" className="block">
                <div class="text-sm font-medium leading-none">Button</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Displays a button or a component that looks like a button.
                </p>
              </mi-navigation-menu-link>
              <mi-navigation-menu-link href="/docs/components/card" className="block">
                <div class="text-sm font-medium leading-none">Card</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Displays a card with header, content, and footer.
                </p>
              </mi-navigation-menu-link>
            </div>
          </mi-navigation-menu-content>
        </mi-navigation-menu-item>

        <!-- Simple link -->
        <mi-navigation-menu-item>
          <mi-navigation-menu-link href="/docs">
            Documentation
          </mi-navigation-menu-link>
        </mi-navigation-menu-item>

      </mi-navigation-menu-list>
      <mi-navigation-menu-viewport />
    </mi-navigation-menu>
  `,
})
export class MainNav {
  productsExpanded = false;
  componentsExpanded = false;
}
