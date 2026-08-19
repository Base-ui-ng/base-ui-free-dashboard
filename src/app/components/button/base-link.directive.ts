// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, computed, input } from '@angular/core';
import { LinkColor, LinkSize } from "../types";

/**
 * A link directive applying Lussos theme styles.
 * Use this to style inline anchors and links.
 * 
 * @example
 * <a base-link color="primary" size="lg">Read more</a>
 */
@Directive({
  selector: '[base-link]',
  host: {
    '[class]': 'classes()',
    '[style.width]': 'styleWidth()'
  }
})
export class BaseLinkDirective {
  /** The semantic visual color. Defaults to 'default'. */
  readonly color = input<LinkColor>('default');
  
  /** The size of the link. Defaults to 'default'. */
  readonly size = input<LinkSize>('default');
  
  /** Optional custom width (e.g. '100%'). */
  readonly width = input<string>();

  readonly classes = computed(() => {
    const baseClasses = 'inline-flex items-center tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 [&_base-icon]:stroke-current [&_base-icon]:fill-current';
    
    const colorMap: Record<LinkColor, string> = {
      primary: 'text-blue-500 hover:text-blue-700 active:text-blue-900 disabled:text-blue-300',
      success: 'text-green-500 hover:text-green-700 active:text-green-900 disabled:text-green-300',
      danger: 'text-red-500 hover:text-red-700 active:text-red-900 disabled:text-red-300',
      warning: 'text-orange-500 hover:text-orange-700 active:text-orange-900 disabled:text-orange-300',
      accent: 'text-purple-500 hover:text-purple-700 active:text-purple-900 disabled:text-purple-300',
      default: 'text-blue-500 hover:text-blue-700 active:text-blue-900 disabled:text-blue-300',
    };

    const sizeMap: Record<LinkSize, string> = {
      sm: 'text-xs gap-2 [&_base-icon]:w-3! [&_base-icon]:h-3!',
      default: 'text-sm gap-3 [&_base-icon]:w-5! [&_base-icon]:h-5!',
      lg: 'text-base gap-4 [&_base-icon]:w-6! [&_base-icon]:h-6!',
      xl: 'text-lg gap-5 [&_base-icon]:w-7! [&_base-icon]:h-7!',
    };

    const colorClass = colorMap[this.color()] || colorMap['default'];
    const sizeClass = sizeMap[this.size()] || sizeMap['default'];

    return `${baseClasses} ${colorClass} ${sizeClass}`;
  });

  readonly styleWidth = computed(() => {
    return this.width() || null;
  });
}
