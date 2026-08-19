// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../../tw-merge/tw-merge';

/**
 * A footer section for `base-page-main`.
 *
 * @example
 * <base-page-main-footer>
 *   <p>&copy; 2026 Company</p>
 * </base-page-main-footer>
 */
@Component({
  selector: 'base-page-main-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './page-main-footer.component.html',
  host: { '[class]': 'hostCls()' } })
export class PageMainFooterComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block w-full border-t border-slate-200 dark:border-slate-800', this.extraClass())
  );
}
