// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Main content column for `base-scroll-nav`. Grows with its children; scrolling
 * is handled by the parent `base-scroll-nav` host (not this element).
 *
 * @example
 * <base-scroll-nav-content>
 *   <section id="section-1">Content</section>
 * </base-scroll-nav-content>
 */
@Component({
  selector: 'base-scroll-nav-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-nav-content.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ScrollNavContentComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('min-w-0 w-full flex-1 p-4', this.extraClass())
  );
}
