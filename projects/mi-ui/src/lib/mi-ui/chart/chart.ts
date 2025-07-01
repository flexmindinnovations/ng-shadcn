import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';

const chartVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: 'h-64',
        md: 'h-80',
        lg: 'h-96',
        xl: 'h-[500px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    icon?: any;
    theme?: {
      light: string;
      dark: string;
    };
  };
}

@Component({
  selector: 'mi-chart-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClass" [style]="chartStyles">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      --chart-1: oklch(0.646 0.222 41.116);
      --chart-2: oklch(0.6 0.118 184.704);
      --chart-3: oklch(0.398 0.07 227.392);
      --chart-4: oklch(0.828 0.189 84.429);
      --chart-5: oklch(0.769 0.188 70.08);
    }

    .dark :host {
      --chart-1: oklch(0.488 0.243 264.376);
      --chart-2: oklch(0.696 0.17 162.48);
      --chart-3: oklch(0.769 0.188 70.08);
      --chart-4: oklch(0.627 0.265 303.9);
      --chart-5: oklch(0.645 0.246 16.439);
    }
  `]
})
export class ChartContainer implements VariantProps<typeof chartVariants> {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() config: ChartConfig = {};
  @Input() className = '';

  get containerClass(): string {
    return `${chartVariants({ size: this.size })} ${this.className}`;
  }

  get chartStyles(): any {
    const styles: any = {};

    // Apply colors from config
    Object.entries(this.config).forEach(([key, value]) => {
      if (value.color) {
        styles[`--color-${key}`] = value.color;
      }
      if (value.theme) {
        styles[`--color-${key}`] = value.theme.light;
        styles[`--color-${key}-dark`] = value.theme.dark;
      }
    });

    return styles;
  }
}

@Component({
  selector: 'mi-chart-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-tooltip bg-popover text-popover-foreground border rounded-lg shadow-md p-3">
      <ng-content></ng-content>
    </div>
  `,
})
export class ChartTooltip {
  @Input() content: any;
}

@Component({
  selector: 'mi-chart-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-1">
      <div *ngIf="label && !hideLabel" class="text-sm font-medium">
        {{ label }}
      </div>
      <div class="space-y-1">
        <div *ngFor="let item of items" class="flex items-center gap-2 text-sm">
          <div
            *ngIf="!hideIndicator"
            class="w-2 h-2 rounded-full"
            [style.background-color]="item.color">
          </div>
          <span class="font-medium">{{ item.name }}:</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  `,
})
export class ChartTooltipContent {
  @Input() label?: string;
  @Input() items: Array<{ name: string; value: any; color: string }> = [];
  @Input() hideLabel = false;
  @Input() hideIndicator = false;
  @Input() labelKey?: string;
  @Input() nameKey?: string;
  @Input() indicator: 'dot' | 'line' | 'dashed' = 'dot';
}

@Component({
  selector: 'mi-chart-legend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-legend flex items-center justify-center gap-4 flex-wrap pt-4">
      <ng-content></ng-content>
    </div>
  `,
})
export class ChartLegend {
  @Input() content: any;
}

@Component({
  selector: 'mi-chart-legend-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-4 flex-wrap">
      <div *ngFor="let item of items" class="flex items-center gap-2 text-sm">
        <div
          class="w-3 h-3 rounded-sm"
          [style.background-color]="item.color">
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  `,
})
export class ChartLegendContent {
  @Input() items: Array<{ name: string; color: string }> = [];
  @Input() nameKey?: string;
}

// Example chart components using Chart.js or similar
@Component({
  selector: 'mi-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #chartCanvas [width]="width" [height]="height"></canvas>
  `,
})
export class BarChart implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];
  @Input() width = 400;
  @Input() height = 200;
  @Input() accessibilityLayer = false;

  private chart: any;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart() {
    // This would integrate with Chart.js, D3, or another charting library
    // For now, this is a placeholder implementation
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Simple bar chart implementation
      this.drawSimpleBarChart(ctx);
    }
  }

  private drawSimpleBarChart(ctx: CanvasRenderingContext2D) {
    if (!this.data.length) return;

    const { width, height } = this.chartCanvas.nativeElement;
    const barWidth = width / this.data.length;
    const maxValue = Math.max(...this.data.map(d => d.value || 0));

    ctx.clearRect(0, 0, width, height);

    this.data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (height - 40);
      const x = index * barWidth;
      const y = height - barHeight - 20;

      ctx.fillStyle = item.fill || 'hsl(var(--chart-1))';
      ctx.fillRect(x + 10, y, barWidth - 20, barHeight);

      // Draw label
      ctx.fillStyle = 'hsl(var(--foreground))';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label || '', x + barWidth / 2, height - 5);
    });
  }
}

@Component({
  selector: 'mi-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #chartCanvas [width]="width" [height]="height"></canvas>
  `,
})
export class LineChart implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];
  @Input() width = 400;
  @Input() height = 200;
  @Input() accessibilityLayer = false;

  private chart: any;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.drawSimpleLineChart(ctx);
    }
  }

  private drawSimpleLineChart(ctx: CanvasRenderingContext2D) {
    if (!this.data.length) return;

    const { width, height } = this.chartCanvas.nativeElement;
    const maxValue = Math.max(...this.data.map(d => d.value || 0));
    const stepX = width / (this.data.length - 1);

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'hsl(var(--chart-1))';
    ctx.lineWidth = 2;
    ctx.beginPath();

    this.data.forEach((item, index) => {
      const x = index * stepX;
      const y = height - ((item.value / maxValue) * (height - 40)) - 20;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw points
      ctx.fillStyle = 'hsl(var(--chart-1))';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.stroke();
  }
}

@Component({
  selector: 'mi-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #chartCanvas [width]="width" [height]="height"></canvas>
  `,
})
export class PieChart implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];
  @Input() width = 400;
  @Input() height = 400;
  @Input() accessibilityLayer = false;

  private chart: any;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.drawSimplePieChart(ctx);
    }
  }

  private drawSimplePieChart(ctx: CanvasRenderingContext2D) {
    if (!this.data.length) return;

    const { width, height } = this.chartCanvas.nativeElement;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const total = this.data.reduce((sum, item) => sum + (item.value || 0), 0);

    let currentAngle = -Math.PI / 2;

    this.data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      ctx.fillStyle = item.fill || `hsl(var(--chart-${(index % 5) + 1}))`;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });
  }
}
