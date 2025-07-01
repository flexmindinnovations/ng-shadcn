import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const resizablePanelGroupVariants = cva(
  'flex h-full w-full data-[panel-group]:overflow-hidden',
  {
    variants: {
      direction: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      direction: 'horizontal',
    },
  }
);

const resizablePanelVariants = cva(
  'data-[panel]:flex data-[panel]:h-full data-[panel]:w-full data-[panel]:overflow-auto'
);

const resizableHandleVariants = cva(
  'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
  {
    variants: {
      withHandle: {
        true: '',
        false: 'after:hidden',
      },
    },
    defaultVariants: {
      withHandle: false,
    },
  }
);

interface PanelData {
  id: string;
  size: number;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  collapsible?: boolean;
  collapsed?: boolean;
}

@Component({
  selector: 'mi-resizable-panel-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="panelGroupClass"
      [attr.data-panel-group]="true"
      [attr.data-panel-group-direction]="direction"
      #panelGroupRef>
      <ng-content></ng-content>
    </div>
  `,
})
export class ResizablePanelGroup implements VariantProps<typeof resizablePanelGroupVariants>, AfterViewInit, OnDestroy {
  @ViewChild('panelGroupRef', { static: true }) panelGroupRef!: ElementRef<HTMLDivElement>;

  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';
  @Input() autoSaveId?: string;

  @Output() layout = new EventEmitter<number[]>();

  private panels: PanelData[] = [];
  private handles: HTMLElement[] = [];
  private isResizing = false;
  private startPosition = 0;
  private startSizes: number[] = [];

  get panelGroupClass(): string {
    return `${resizablePanelGroupVariants({ direction: this.direction })} ${this.className}`;
  }

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initializePanels();
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }

  registerPanel(panel: PanelData) {
    this.panels.push(panel);
    this.updateLayout();
  }

  unregisterPanel(panelId: string) {
    this.panels = this.panels.filter(p => p.id !== panelId);
    this.updateLayout();
  }

  registerHandle(handle: HTMLElement) {
    this.handles.push(handle);
    this.setupHandleListeners(handle);
  }

  private initializePanels() {
    // Initialize panel sizes if needed
    if (this.panels.length > 0) {
      this.updateLayout();
    }
  }

  private setupEventListeners() {
    // Event listeners for mouse/touch interactions will be added here
  }

  private removeEventListeners() {
    // Clean up event listeners
  }

  private setupHandleListeners(handle: HTMLElement) {
    handle.addEventListener('mousedown', this.onHandleMouseDown.bind(this));
    handle.addEventListener('touchstart', this.onHandleTouchStart.bind(this));
  }

  private onHandleMouseDown(event: MouseEvent) {
    this.startResize(event.clientX, event.clientY);
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onHandleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.startResize(touch.clientX, touch.clientY);
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private startResize(clientX: number, clientY: number) {
    this.isResizing = true;
    this.startPosition = this.direction === 'horizontal' ? clientX : clientY;
    this.startSizes = this.panels.map(p => p.size);
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      this.updateResize(event.clientX, event.clientY);
    }
  }

  private onTouchMove(event: TouchEvent) {
    if (this.isResizing) {
      const touch = event.touches[0];
      this.updateResize(touch.clientX, touch.clientY);
    }
  }

  private updateResize(clientX: number, clientY: number) {
    const currentPosition = this.direction === 'horizontal' ? clientX : clientY;
    const delta = currentPosition - this.startPosition;

    // Calculate new sizes based on delta
    // This is a simplified implementation
    this.updateLayout();
  }

  private onMouseUp() {
    this.stopResize();
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onTouchEnd() {
    this.stopResize();
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private stopResize() {
    this.isResizing = false;
    this.layout.emit(this.panels.map(p => p.size));
  }

  private updateLayout() {
    // Update the actual DOM layout based on panel sizes
    const panelElements = this.panelGroupRef.nativeElement.querySelectorAll('[data-panel]');
    panelElements.forEach((element, index) => {
      const panel = this.panels[index];
      if (panel) {
        const sizeProperty = this.direction === 'horizontal' ? 'width' : 'height';
        (element as HTMLElement).style[sizeProperty] = `${panel.size}%`;
      }
    });
  }
}

@Component({
  selector: 'mi-resizable-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="panelClass"
      [attr.data-panel]="true"
      [attr.data-panel-id]="id"
      [style]="panelStyles">
      <ng-content></ng-content>
    </div>
  `,
})
export class ResizablePanel implements VariantProps<typeof resizablePanelVariants>, AfterViewInit, OnDestroy {
  @Input() id = `panel-${Math.random().toString(36).substr(2, 9)}`;
  @Input() defaultSize?: number;
  @Input() minSize?: number;
  @Input() maxSize?: number;
  @Input() collapsible = false;
  @Input() collapsed = false;
  @Input() className = '';

  private panelData: PanelData;

  get panelClass(): string {
    return `${resizablePanelVariants()} ${this.className}`;
  }

  get panelStyles(): any {
    const styles: any = {};
    if (this.defaultSize !== undefined) {
      styles['flex'] = `0 0 ${this.defaultSize}%`;
    }
    return styles;
  }

  constructor(private panelGroup: ResizablePanelGroup) {
    this.panelData = {
      id: this.id,
      size: this.defaultSize || 50,
      minSize: this.minSize,
      maxSize: this.maxSize,
      defaultSize: this.defaultSize,
      collapsible: this.collapsible,
      collapsed: this.collapsed,
    };
  }

  ngAfterViewInit() {
    this.panelGroup.registerPanel(this.panelData);
  }

  ngOnDestroy() {
    this.panelGroup.unregisterPanel(this.id);
  }
}

@Component({
  selector: 'mi-resizable-handle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="handleClass"
      [attr.data-panel-group-direction]="direction"
      role="separator"
      tabindex="0"
      #handleRef>
      <div
        *ngIf="withHandle"
        class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <svg
          class="h-2.5 w-2.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
        </svg>
      </div>
    </div>
  `,
})
export class ResizableHandle implements VariantProps<typeof resizableHandleVariants>, AfterViewInit {
  @ViewChild('handleRef', { static: true }) handleRef!: ElementRef<HTMLDivElement>;

  @Input() withHandle = false;
  @Input() className = '';
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';

  get handleClass(): string {
    return `${resizableHandleVariants({ withHandle: this.withHandle })} ${this.className}`;
  }

  constructor(private panelGroup: ResizablePanelGroup) {}

  ngAfterViewInit() {
    this.panelGroup.registerHandle(this.handleRef.nativeElement);
  }
}
