import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService, LucideIconName, IconProps } from '../../services/icon.service';

@Component({
  selector: 'mi-icon',
  standalone: true,
  template: `<span [innerHTML]="sanitizedIcon" [class]="wrapperClass" class="inline-flex items-center justify-center"></span>`,
  styles: []
})
export class IconComponent implements OnChanges, OnInit {
  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true }) name!: LucideIconName;
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number = 2;
  @Input() class: string = '';

  protected sanitizedIcon: SafeHtml = '';
  protected wrapperClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['size'] || changes['color'] || changes['strokeWidth'] || changes['class']) {
      this.updateIcon();
    }
  }

  ngOnInit(): void {
    this.updateIcon();
  }

  private updateIcon(): void {
    if (!this.name) return;

    const iconProps: IconProps = {
      size: this.size,
      color: this.color,
      strokeWidth: this.strokeWidth,
      className: this.class
    };

    const iconSvg = this.iconService.getIcon(this.name, iconProps);
    if (iconSvg && iconSvg.trim()) {
      this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(iconSvg);
    } else {
      this.sanitizedIcon = '';
    }
    this.wrapperClass = this.class || '';
  }
}
