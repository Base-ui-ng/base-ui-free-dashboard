// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../../tw-merge/tw-merge';

/**
 * A section within a scroll-nav component that is linked to a sidebar item.
 *
 * @example
 * <base-scroll-nav-item id="section-1">
 *   Section content
 * </base-scroll-nav-item>
 */
@Component({
  selector: 'base-scroll-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './scroll-nav-item.component.html',
  host: { '[class]': 'hostCls()' } })
export class ScrollNavItemComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() => cn('block', this.extraClass()));
}
