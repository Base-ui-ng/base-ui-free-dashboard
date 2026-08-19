// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, computed, input } from '@angular/core';
import { IconButtonColor, IconButtonSize } from "../types";

/**
 * An icon-only button directive applying Lussos theme styles.
 * Use this when the button only contains an icon.
 *
 * Base classes include `relative` and `rounded-lg`. When overriding position,
 * radius or other baked-in utilities via the `class` attribute, use Tailwind's
 * important variants (e.g. `!absolute`, `rounded-full!`) — plain conflicting
 * classes lose the stylesheet tie-break against the base classes.
 *
 * @example
 * <button base-icon-button color="primary" size="lg">
 *   <base-icon name="plus"></base-icon>
 * </button>
 */
@Directive({
  selector: '[base-icon-button]',
  host: {
    '[class]': 'classes()'
  }
})
export class IconButtonDirective {
  /** The semantic visual color. Defaults to 'default'. */
  readonly color = input<IconButtonColor | string>('default');
  
  /** The size of the button. Defaults to 'default'. */
  readonly size = input<IconButtonSize>('default');

  readonly classes = computed(() => {
    const baseClasses = 'flex items-center justify-center relative rounded-lg tracking-wide transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_base-icon]:stroke-current [&_base-icon]:fill-current';
    
    const colorMap: Record<string, string> = {
      primary: 'text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300',
      success: 'text-white bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-300',
      danger: 'text-white bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300',
      warning: 'text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-orange-300',
      accent: 'text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-purple-300',
      white: 'text-slate-900 bg-white hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50',
      black: 'text-white bg-slate-900 dark:bg-black hover:bg-slate-800 dark:hover:bg-slate-900 active:bg-slate-700 dark:active:bg-slate-800 disabled:opacity-50',
      default: 'text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:bg-slate-400 dark:active:bg-slate-600 disabled:opacity-50',
      transparent: 'text-slate-800 dark:text-slate-200 bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/50 active:bg-slate-300/50 dark:active:bg-slate-600/50 disabled:opacity-50',
    };

    const sizeMap: Record<IconButtonSize, string> = {
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
