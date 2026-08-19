// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../tw-merge/tw-merge';

/**
 * A navigation list container. Usually used inside sidebars or drawer menus.
 *
 * @example
 * <base-nav-list>
 *   <a base-list-item>Dashboard</a>
 *   <a base-list-item>Settings</a>
 * </base-nav-list>
 */
@Component({
  selector: 'base-nav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './nav-list.component.html',
  host: {
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'hostCls()',
  },
})
export class NavListComponent {
  readonly extraClass = input('', { alias: 'class' });
  readonly ariaLabel = input('Navigation');
  protected readonly hostCls = computed(() => cn('block w-full', this.extraClass()));
}
