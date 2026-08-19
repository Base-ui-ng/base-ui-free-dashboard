// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, computed, input } from '@angular/core';
import { IconStrokedButtonColor, IconStrokedButtonSize } from "../types";

/**
 * A stroked icon-only button directive applying Lussos theme styles.
 *
 * Base classes include `relative` and `rounded-lg`. When overriding position,
 * radius or other baked-in utilities via the `class` attribute, use Tailwind's
 * important variants (e.g. `!absolute`, `rounded-full!`) — plain conflicting
 * classes lose the stylesheet tie-break against the base classes.
 *
 * @example
 * <button base-icon-stroked-button color="primary" size="lg">
 *   <base-icon name="plus"></base-icon>
 * </button>
 */
@Directive({
  selector: '[base-stroked-icon-button]',
  host: {
    '[class]': 'classes()'
  }
})
export class IconStrokedButtonDirective {
  /** The semantic visual color. Defaults to 'default'. */
  readonly color = input<IconStrokedButtonColor>('default');
  
  /** The size of the button. Defaults to 'default'. */
  readonly size = input<IconStrokedButtonSize>('default');

  readonly classes = computed(() => {
    const baseClasses = 'flex items-center justify-center relative rounded-lg border tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 [&_base-icon]:stroke-current [&_base-icon]:fill-current';
    
    const colorMap: Record<IconStrokedButtonColor, string> = {
      primary: 'text-blue-500 border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 active:bg-blue-100',
      success: 'text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600 hover:border-green-600 active:bg-green-100',
      danger: 'text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-600 active:bg-red-100',
      warning: 'text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-600 active:bg-orange-100',
      accent: 'text-purple-500 border-purple-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600 active:bg-purple-100',
      white: 'text-white border-white hover:bg-white/10 hover:text-white hover:border-white active:bg-white/20',
      black: 'text-slate-900 dark:text-white border-slate-900 dark:border-white hover:bg-slate-900/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white active:bg-slate-900/20 dark:active:bg-white/20',
      default: 'text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-900',
      transparent: 'text-slate-800 dark:text-slate-200 bg-transparent border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/50 active:bg-slate-300/50 dark:active:bg-slate-600/50',
    };

    const sizeMap: Record<IconStrokedButtonSize, string> = {
      sm: 'h-7! w-7! min-w-7! max-w-7! [&_base-icon]:w-3! [&_base-icon]:h-3!',
      default: 'h-9! w-9! min-w-9! max-w-9! [&_base-icon]:w-5! [&_base-icon]:h-5!',
      lg: 'h-10! w-10! min-w-10! max-w-10! [&_base-icon]:w-6! [&_base-icon]:h-6!',
      xl: 'h-11! w-11! min-w-11! max-w-11! [&_base-icon]:w-6! [&_base-icon]:h-6!',
      xxl: 'h-14! w-14! min-w-14! max-w-14! [&_base-icon]:w-7! [&_base-icon]:h-7!',
    };

    const colorClass = colorMap[this.color()] || colorMap['default'];
    const sizeClass = sizeMap[this.size()] || sizeMap['default'];

    return `${baseClasses} ${colorClass} ${sizeClass}`;
  });
}
