// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { CommonModule } from '@angular/common';
import { Component, input, computed ,
  ChangeDetectionStrategy
} from '@angular/core';
import { BaseBadgeAddon } from './base-badge-addon.directive';
import { BadgeColor, BadgeSize, BadgeShape } from "../types";
import { cn } from '../tw-merge/tw-merge';

/**
 * A configurable badge component to display tiny statuses, counts, or tags.
 * 
 * @example
 * <base-badge color="danger" size="sm" shape="rectangular">New</base-badge>
 */
@Component({
  selector: 'base-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BaseBadgeAddon],
  templateUrl: './badge.component.html'
})
export class BadgeComponent {
  /** The visual color mapping. Defaults to 'primary'. */
  readonly color = input<BadgeColor>('primary');
  
  /** The size of the badge. Defaults to 'md'. */
  readonly size = input<BadgeSize>('md');
  
  /** The shape (roundness) of the badge. Defaults to 'circle' (pill). */
  readonly shape = input<BadgeShape>('circle');

  readonly badgeClasses = computed(() => {
    const classes = [
      'h-6', 'flex', 'gap-1', 'border', 'border-transparent',
      'justify-center', 'items-center', 'px-3', 'text-xs!',
      'whitespace-nowrap', 'text-white', 'bg-slate-400'
    ];

    // Shape
    classes.push(this.shape() === 'rectangular' ? 'rounded-md' : 'rounded-full');

    // Color
    const colorMap: Record<BadgeColor, string> = {
      'primary': 'bg-blue-500!',
      'danger': 'bg-red-500!',
      'success': 'bg-green-500!',
      'accent': 'bg-purple-500!',
      'warning': 'bg-orange-500!',
      'slate-light': 'bg-slate-200! border-slate-500! text-slate-800!',
      'primary-light': 'bg-blue-100! border-blue-400! text-blue-800!',
      'danger-light': 'bg-red-100! border-red-400! text-red-800!',
      'success-light': 'bg-green-100! border-green-400! text-green-800!',
      'accent-light': 'bg-purple-100! border-purple-400! text-purple-800!',
      'warning-light': 'bg-orange-100! border-orange-400! text-orange-800!'
};
    if (colorMap[this.color()]) {
      classes.push(colorMap[this.color()]);
    }

    // Size
    const sizeMap: Record<BadgeSize, string> = {
      'sm': 'h-5! text-xs! px-2!',
      'md': 'h-6! text-sm!',
      'lg': 'h-7! text-base! px-4!',
      'xl': 'h-8! text-xl! px-4!'
};
    if (sizeMap[this.size()]) {
      classes.push(sizeMap[this.size()]);
    }

    return cn(classes);
  });
}
