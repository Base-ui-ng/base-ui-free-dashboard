// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * The header section of a base-card. Usually contains the title and optional actions.
 *
 * @example
 * <base-card-header>Card Title</base-card-header>
 */
@Component({
  selector: 'base-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-header.component.html',
  host: { '[class]': 'hostCls()' }
})
export class CardHeaderComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn(
      'flex h-14 font-semibold justify-between items-center border-b border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:bg-slate-800 px-4 not-prose',
      this.extraClass()
    )
  );
}
