// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../../tw-merge/tw-merge';

/**
 * An individual selectable item within a `base-dropdown-menu`.
 *
 * @example
 * <base-dropdown-menu>
 *   <base-dropdown-menu-item>Profile</base-dropdown-menu-item>
 * </base-dropdown-menu>
 */
@Component({
  selector: 'base-dropdown-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-menu-item.component.html',
  imports: [],
  host: {
    role: 'menuitem',
    tabindex: '-1',
    '[class]': 'hostCls()',
  },
})
export class DropdownMenuItemComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn(
      'w-full px-6 h-12 flex items-center text-sm transition-colors duration-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap not-prose',
      this.extraClass()
    )
  );
}
