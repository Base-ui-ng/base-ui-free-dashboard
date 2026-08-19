// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, computed, input } from '@angular/core';
import { ButtonColor, ButtonSize } from "../types";

/**
 * A standard button directive applying Lussos theme styles.
 * It strictly types its inputs to ensure AI agents construct it properly.
 *
 * Base classes include `relative` and `rounded-lg`. When overriding position,
 * radius or other baked-in utilities via the `class` attribute, use Tailwind's
 * important variants (e.g. `!absolute`, `rounded-full!`) — plain conflicting
 * classes lose the stylesheet tie-break against the base classes.
 *
 * @example
 * <button base-button color="primary" size="lg">Submit</button>
 */
@Directive({
  selector: '[base-button]',
  host: {
    '[class]': 'classes()',
    '[style.width]': 'styleWidth()'
  }
})
export class BaseButtonDirective {
  /** The semantic visual color. Defaults to 'default'. */
  readonly color = input<ButtonColor | string>('default');
  
  /** The size of the button. Defaults to 'default'. */
  readonly size = input<ButtonSize>('default');
  
  /** Optional custom width (e.g. '100%'). */
  readonly width = input<string>();

  readonly classes = computed(() => {
    const baseClasses = 'flex items-center gap-2 relative rounded-lg text-center justify-center tracking-wide font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_base-icon]:stroke-current [&_base-icon]:fill-current';

    const colorMap: Record<string, string> = {
      primary: 'text-white! bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300',
      success: 'text-white! bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-300',
      danger: 'text-white! bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
      warning: 'text-white! bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-orange-300',
      accent: 'text-white! bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-purple-300',
      white: 'text-slate-900! bg-white hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50',
      black: 'text-white! bg-slate-900 dark:bg-black hover:bg-slate-800 dark:hover:bg-slate-900 active:bg-slate-700 dark:active:bg-slate-800 disabled:opacity-50',
      default: 'text-slate-800! dark:text-slate-200! bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:bg-slate-400 dark:active:bg-slate-600 disabled:opacity-50',
      transparent: 'text-slate-800! dark:text-slate-200! bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/50 active:bg-slate-300/50 dark:active:bg-slate-600/50 disabled:opacity-50',
    };

    const sizeMap: Record<ButtonSize, string> = {
      sm: 'h-7 text-xs px-4 [&_base-icon]:w-3! [&_base-icon]:h-3!',
      default: 'h-9 text-sm px-6 [&_base-icon]:w-5! [&_base-icon]:h-5!',
      lg: 'h-10 text-base px-7 [&_base-icon]:w-6! [&_base-icon]:h-6!',
      xl: 'h-11 text-base px-8 [&_base-icon]:w-6! [&_base-icon]:h-6!',
      xxl: 'h-14 text-lg px-10 [&_base-icon]:w-7! [&_base-icon]:h-7!',
    };

    const colorClass = colorMap[this.color()] || colorMap['default'];
    const sizeClass = sizeMap[this.size()] || sizeMap['default'];

    return `${baseClasses} ${colorClass} ${sizeClass}`;
  });

  readonly styleWidth = computed(() => {
    return this.width() || null;
  });
}
