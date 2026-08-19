// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../../tw-merge/tw-merge';

/**
 * A header section for `base-page-main`.
 *
 * @example
 * <base-page-main-header>
 *   <h1>Page Title</h1>
 * </base-page-main-header>
 */
@Component({
  selector: 'base-page-main-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './page-main-header.component.html',
  host: { '[class]': 'hostCls()' } })
export class PageMainHeaderComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block w-full border-b border-slate-200 dark:border-slate-800', this.extraClass())
  );
}
