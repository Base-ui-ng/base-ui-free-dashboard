// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * A helper/info text element for use inside a `base-input-group`.
 *
 * @example
 * <base-info-text>We'll never share your email</base-info-text>
 */
@Component({
  selector: 'base-info-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-text.component.html',
  host: { '[class]': 'hostCls()' }
})
export class InfoTextComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block text-xs text-slate-500 dark:text-slate-400 mt-1', this.extraClass())
  );
}
