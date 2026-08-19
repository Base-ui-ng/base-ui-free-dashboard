// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * A label element for use inside a `base-input-group`.
 *
 * @example
 * <base-label>Email address</base-label>
 */
@Component({
  selector: 'base-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './label.component.html',
  host: { '[class]': 'hostCls()' }
})
export class LabelComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1', this.extraClass())
  );
}
