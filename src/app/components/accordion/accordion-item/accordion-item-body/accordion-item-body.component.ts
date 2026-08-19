// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../../tw-merge/tw-merge';

/**
 * The body content of an accordion item.
 *
 * @example
 * <base-accordion-item-body>
 *   Content goes here
 * </base-accordion-item-body>
 */
@Component({
  selector: 'base-accordion-item-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-item-body.component.html',
  host: { '[class]': 'hostCls()' }
})
export class AccordionItemBodyComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('!text-slate-700 dark:!text-slate-300 font-thin block p-4', this.extraClass())
  );
}
