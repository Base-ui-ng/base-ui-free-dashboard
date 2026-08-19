// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * Box that preserves a width-to-height ratio. Project media or any block inside.
 *
 * @example
 * <base-aspect-ratio ratio="16/9">
 *   <img src="hero.jpg" alt="" class="h-full w-full object-cover" />
 * </base-aspect-ratio>
 */
@Component({
  selector: 'base-aspect-ratio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './aspect-ratio.component.html',
  host: {
    '[class]': 'hostCls()',
    '[style.aspect-ratio]': 'cssRatio()',
  },
})
export class AspectRatioComponent {
  /**
   * Extra host classes merged via `cn()`.
   * @example
   * <base-aspect-ratio class="w-full rounded-lg" ratio="1/1"></base-aspect-ratio>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * CSS `aspect-ratio` value (`16/9`, `1`, `4/3`, …).
   * @example
   * <base-aspect-ratio ratio="4/3"></base-aspect-ratio>
   */
  readonly ratio = input('16/9');

  protected readonly hostCls = computed(() =>
    cn('relative block w-full overflow-hidden', this.extraClass()),
  );

  protected readonly cssRatio = computed(() => {
    const raw = this.ratio().trim();
    return raw || '16 / 9';
  });
}
