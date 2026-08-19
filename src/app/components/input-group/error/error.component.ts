// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * An error message element for use inside a `base-input-group`.
 *
 * @example
 * <base-error>This field is required</base-error>
 */
@Component({
  selector: 'base-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ErrorComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('block text-xs text-red-500 mt-1', this.extraClass())
  );
}
