// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { cn } from '../tw-merge/tw-merge';

/**
 * The primary layout wrapper for a main page view.
 *
 * @example
 * <base-page-main>
 *   <base-page-main-header>Title</base-page-main-header>
 *   <base-page-main-body>Content</base-page-main-body>
 *   <base-page-main-footer>Footer</base-page-main-footer>
 * </base-page-main>
 */
@Component({
  selector: 'base-page-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './page-main.component.html',
  host: { '[class]': 'hostCls()' } })
export class PageMainComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block w-full h-full flex flex-col overflow-hidden', this.extraClass())
  );
}
