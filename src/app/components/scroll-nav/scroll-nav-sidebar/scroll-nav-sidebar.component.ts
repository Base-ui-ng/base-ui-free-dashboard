// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Sticky TOC sidebar for `base-scroll-nav`. Sticks to the top of the parent
 * scrollport; it does not scroll independently.
 *
 * @example
 * <base-scroll-nav-sidebar>
 *   <a base-list-item>Section 1</a>
 * </base-scroll-nav-sidebar>
 */
@Component({
  selector: 'base-scroll-nav-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-nav-sidebar.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ScrollNavSidebarComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn(
      'sticky top-0 hidden w-[280px] min-w-[280px] max-w-[280px] shrink-0 self-start p-4 lg:block',
      this.extraClass(),
    ),
  );
}
