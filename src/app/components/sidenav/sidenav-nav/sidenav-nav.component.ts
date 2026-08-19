// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Left navigation slot for `base-sidenav`.
 *
 * @example
 * <base-sidenav-nav>
 *   <base-nav-list>...</base-nav-list>
 * </base-sidenav-nav>
 */
@Component({
  selector: 'base-sidenav-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-nav.component.html',
  host: { '[class]': 'hostCls()' },
})
export class SidenavNavComponent {
  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-sidenav-nav class="px-2"></base-sidenav-nav>
   */
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() =>
    cn('block w-60 min-w-60 h-full overflow-y-auto overflow-x-hidden', this.extraClass()),
  );
}
