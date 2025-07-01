import { Component, Input, Output, EventEmitter, Injectable, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { BehaviorSubject, Observable } from 'rxjs';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SidebarState {
  open: boolean;
  openMobile: boolean;
  isMobile: boolean;
  state: 'expanded' | 'collapsed';
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private state$ = new BehaviorSubject<SidebarState>({
    open: true,
    openMobile: false,
    isMobile: false,
    state: 'expanded'
  });

  getState(): Observable<SidebarState> {
    return this.state$.asObservable();
  }

  getCurrentState(): SidebarState {
    return this.state$.value;
  }

  setOpen(open: boolean) {
    this.updateState({ open });
    this.saveToCookie(open);
  }

  setOpenMobile(openMobile: boolean) {
    this.updateState({ openMobile });
  }

  setIsMobile(isMobile: boolean) {
    this.updateState({ isMobile, state: isMobile ? 'expanded' : (this.state$.value.open ? 'expanded' : 'collapsed') });
  }

  toggleSidebar() {
    const current = this.state$.value;
    if (current.isMobile) {
      this.setOpenMobile(!current.openMobile);
    } else {
      this.setOpen(!current.open);
    }
  }

  private updateState(updates: Partial<SidebarState>) {
    const current = this.state$.value;
    const newState = { ...current, ...updates };
    newState.state = newState.isMobile ? 'expanded' : (newState.open ? 'expanded' : 'collapsed');
    this.state$.next(newState);
  }

  private saveToCookie(open: boolean) {
    if (typeof document !== 'undefined') {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  }

  loadFromCookie(): boolean {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(new RegExp('(^| )' + SIDEBAR_COOKIE_NAME + '=([^;]+)'));
      return match ? match[2] === 'true' : true;
    }
    return true;
  }
}

const sidebarVariants = cva(
  'group/sidebar relative flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out data-[collapsible=offcanvas]:absolute data-[collapsible=offcanvas]:z-20 data-[collapsible=offcanvas]:transition-transform data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))] data-[collapsible=none]:w-[--sidebar-width] data-[side=right]:right-0 data-[side=right]:border-l data-[collapsible=offcanvas]:data-[state=closed]:translate-x-[-100%] data-[collapsible=offcanvas]:data-[side=right]:data-[state=closed]:translate-x-[100%] data-[side=left]:border-r',
  {
    variants: {
      variant: {
        sidebar: '',
        floating: 'rounded-lg border border-sidebar-border shadow-lg',
        inset: 'm-2 rounded-lg border border-sidebar-border',
      },
      side: {
        left: '',
        right: '',
      },
    },
    defaultVariants: {
      variant: 'sidebar',
      side: 'left',
    },
  }
);

@Component({
  selector: 'mi-sidebar-provider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar"
      [style]="wrapperStyles">
      <ng-content></ng-content>
    </div>
  `,
  providers: [SidebarService]
})
export class SidebarProvider implements OnInit, OnDestroy {
  @Input() open?: boolean;
  @Input() defaultOpen = true;
  @Output() openChange = new EventEmitter<boolean>();

  get wrapperStyles() {
    return {
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
    };
  }

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    // Initialize state
    const initialOpen = this.open !== undefined ? this.open :
                       (this.defaultOpen !== undefined ? this.defaultOpen : this.sidebarService.loadFromCookie());

    this.sidebarService.setOpen(initialOpen);

    // Subscribe to state changes
    this.sidebarService.getState().subscribe(state => {
      if (this.open === undefined) {
        this.openChange.emit(state.open);
      }
    });

    // Setup keyboard shortcut
    this.setupKeyboardShortcut();

    // Setup mobile detection
    this.setupMobileDetection();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  private setupKeyboardShortcut() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          this.sidebarService.toggleSidebar();
        }
      });
    }
  }

  private setupMobileDetection() {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const isMobile = window.innerWidth < 768;
        this.sidebarService.setIsMobile(isMobile);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
  }
}

@Component({
  selector: 'mi-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside
      [class]="sidebarClass"
      [attr.data-state]="state.open ? 'open' : 'closed'"
      [attr.data-collapsible]="collapsible"
      [attr.data-variant]="variant"
      [attr.data-side]="side">
      <ng-content></ng-content>
    </aside>
  `,
})
export class Sidebar implements VariantProps<typeof sidebarVariants>, OnInit {
  @Input() side: 'left' | 'right' = 'left';
  @Input() variant: 'sidebar' | 'floating' | 'inset' = 'sidebar';
  @Input() collapsible: 'offcanvas' | 'icon' | 'none' = 'offcanvas';
  @Input() className = '';

  state: SidebarState = {
    open: true,
    openMobile: false,
    isMobile: false,
    state: 'expanded'
  };

  get sidebarClass(): string {
    return `${sidebarVariants({ variant: this.variant, side: this.side })} ${this.className}`;
  }

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.getState().subscribe(state => {
      this.state = state;
    });
  }
}

@Component({
  selector: 'mi-sidebar-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2 p-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarHeader {}

@Component({
  selector: 'mi-sidebar-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2 p-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarFooter {}

@Component({
  selector: 'mi-sidebar-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarContent {}

@Component({
  selector: 'mi-sidebar-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative flex w-full min-w-0 flex-col p-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarGroup {}

@Component({
  selector: 'mi-sidebar-group-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:opacity-0">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarGroupLabel {}

@Component({
  selector: 'mi-sidebar-group-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0">
      <ng-content></ng-content>
    </button>
  `,
})
export class SidebarGroupAction {}

@Component({
  selector: 'mi-sidebar-group-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full text-sm">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarGroupContent {}

@Component({
  selector: 'mi-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="flex w-full min-w-0 flex-col gap-1">
      <ng-content></ng-content>
    </ul>
  `,
})
export class SidebarMenu {}

@Component({
  selector: 'mi-sidebar-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="group/menu-item relative">
      <ng-content></ng-content>
    </li>
  `,
})
export class SidebarMenuItem {}

@Component({
  selector: 'mi-sidebar-menu-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClass"
      [attr.data-active]="isActive"
      class="peer/menu-button">
      <ng-content></ng-content>
    </button>
  `,
})
export class SidebarMenuButton {
  @Input() isActive = false;
  @Input() className = '';

  get buttonClass(): string {
    const baseClass = 'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0';
    return `${baseClass} ${this.className}`;
  }
}

@Component({
  selector: 'mi-sidebar-menu-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0"
      [attr.data-sidebar]="'menu-action'">
      <ng-content></ng-content>
    </button>
  `,
})
export class SidebarMenuAction {}

@Component({
  selector: 'mi-sidebar-menu-sub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5">
      <ng-content></ng-content>
    </ul>
  `,
})
export class SidebarMenuSub {}

@Component({
  selector: 'mi-sidebar-menu-sub-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li>
      <ng-content></ng-content>
    </li>
  `,
})
export class SidebarMenuSubItem {}

@Component({
  selector: 'mi-sidebar-menu-sub-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
      <ng-content></ng-content>
    </button>
  `,
})
export class SidebarMenuSubButton {}

@Component({
  selector: 'mi-sidebar-menu-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md bg-sidebar-primary px-1 text-xs font-medium tabular-nums text-sidebar-primary-foreground select-none pointer-events-none">
      <ng-content></ng-content>
    </div>
  `,
})
export class SidebarMenuBadge {}

@Component({
  selector: 'mi-sidebar-menu-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-md h-8 flex gap-2 px-2 items-center">
      <div *ngIf="showIcon" class="h-4 w-4 rounded-sm bg-sidebar-accent animate-pulse"></div>
      <div class="h-4 flex-1 rounded-sm bg-sidebar-accent animate-pulse"></div>
    </div>
  `,
})
export class SidebarMenuSkeleton {
  @Input() showIcon = false;
}

@Component({
  selector: 'mi-sidebar-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <hr class="mx-2 w-auto border-sidebar-border">
  `,
})
export class SidebarSeparator {}

@Component({
  selector: 'mi-sidebar-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7"
      (click)="toggleSidebar()">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `,
})
export class SidebarTrigger {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

@Component({
  selector: 'mi-sidebar-rail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:bg-sidebar-border after:transition-all after:duration-0 hover:after:bg-sidebar-accent-foreground group-data-[side=left]:-right-4 group-data-[side=right]:-left-4 sm:flex"
      [attr.data-sidebar]="'rail'"
      (click)="toggleSidebar()">
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `,
})
export class SidebarRail {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

@Component({
  selector: 'mi-sidebar-inset',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
      <ng-content></ng-content>
    </main>
  `,
})
export class SidebarInset {}
