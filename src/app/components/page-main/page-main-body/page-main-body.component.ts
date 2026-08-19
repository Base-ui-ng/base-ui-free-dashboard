// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../../tw-merge/tw-merge';

/**
 * A body content section for `base-page-main`.
 *
 * @example
 * <base-page-main-body>
 *   <p>Main page content</p>
 * </base-page-main-body>
 */
@Component({
  selector: 'base-page-main-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './page-main-body.component.html',
  host: { '[class]': 'hostCls()' } })
export class PageMainBodyComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8', this.extraClass())
  );
}
