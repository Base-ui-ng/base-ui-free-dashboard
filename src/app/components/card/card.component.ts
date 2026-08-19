// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * A flexible card container component used for grouping related content.
 *
 * @example
 * <base-card [horizontal]="true">
 *   <base-card-body>Content here...</base-card-body>
 * </base-card>
 */
@Component({
  selector: 'base-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './card.component.html',
  host: { '[class]': 'hostCls()' } })
export class CardComponent {
  readonly extraClass = input('', { alias: 'class' });
  /** If true, the card lays out its children horizontally instead of vertically. */
  readonly horizontal = input(false, { transform: booleanAttribute });

  protected readonly hostCls = computed(() =>
    cn(
      'block bg-white dark:bg-slate-800 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 not-prose',
      this.extraClass()
    )
  );
}
