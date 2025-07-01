import { Injectable } from '@angular/core';
import * as lucideIcons from 'lucide';

// Extract all icon names from Lucide for TypeScript intellisense
export type LucideIconName = keyof typeof lucideIcons;

// Icon props interface
export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// Lucide icon structure type
type LucideIcon = [string, Record<string, any>, Array<[string, Record<string, any>]>];

@Injectable({
  providedIn: 'root'
})
export class IconService {
  // Cache for generated SVG strings
  private iconCache = new Map<string, string>();

  /**
   * Convert Lucide icon data to SVG string
   */
  private lucideToSvg(iconData: LucideIcon, props: IconProps = {}): string {
    const { size = 24, color = 'currentColor', strokeWidth = 2, className = '' } = props;

    const [tag, defaultAttrs, children] = iconData;

    // Build the SVG attributes
    const attrs = {
      ...defaultAttrs,
      width: size,
      height: size,
      stroke: color,
      'stroke-width': strokeWidth,
      class: className
    };

    // Convert attributes to string
    const attrString = Object.entries(attrs)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    // Convert children to SVG elements
    const childrenSvg = children
      .map(([childTag, childAttrs]) => {
        const childAttrString = Object.entries(childAttrs)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
        return `<${childTag} ${childAttrString}/>`;
      })
      .join('');

    return `<${tag} ${attrString}>${childrenSvg}</${tag}>`;
  }

  /**
   * Get an icon by name with TypeScript autocomplete support
   */
  getIcon(name: LucideIconName, props: IconProps = {}): string {
    const cacheKey = `${name}-${JSON.stringify(props)}`;

    if (this.iconCache.has(cacheKey)) {
      return this.iconCache.get(cacheKey)!;
    }

    // Get the icon from Lucide
    const iconData = lucideIcons[name] as LucideIcon;
    if (!iconData) {
      console.warn(`Icon "${name}" not found in Lucide icons`);
      return this.getIcon('AlertCircle', props); // Fallback icon
    }

    // Generate SVG string
    const svg = this.lucideToSvg(iconData, props);

    // Cache the result
    this.iconCache.set(cacheKey, svg);
    return svg;
  }

  /**
   * @deprecated Use getIcon instead
   */
  getIconWithProps(name: string, props: { size?: number; color?: string; strokeWidth?: number } = {}): string {
    return this.getIcon(name as LucideIconName, props);
  }

  /**
   * Get all available icon names for autocomplete/intellisense
   */
  getAllIconNames(): LucideIconName[] {
    return Object.keys(lucideIcons) as LucideIconName[];
  }

  /**
   * Check if an icon exists
   */
  hasIcon(name: string): name is LucideIconName {
    return name in lucideIcons;
  }

  /**
   * Search icons by name pattern
   */
  searchIcons(pattern: string): LucideIconName[] {
    const regex = new RegExp(pattern, 'i');
    return this.getAllIconNames().filter(name => regex.test(name));
  }

  /**
   * Clear the icon cache (useful for memory management)
   */
  clearCache(): void {
    this.iconCache.clear();
  }
}
