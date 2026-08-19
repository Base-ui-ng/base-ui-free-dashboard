// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * The main content container of a base-card. Provides correct padding and spacing.
 *
 * @example
 * <base-card-body>
 *   <p>Card content goes here.</p>
 * </base-card-body>
 */
@Component({
  selector: 'base-card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-body.component.html',
  host: { '[class]': 'hostCls()' }
})
export class CardBodyComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block p-4 relative overflow-y-auto overflow-x-hidden dark:!text-slate-300', this.extraClass())
  );
}
