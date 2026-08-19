// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * A vertical timeline container. Wrap `base-timeline-item` elements inside.
 *
 * @example
 * <base-timeline>
 *   <base-timeline-item color="primary" icon="check" time="Jan 1">Step one</base-timeline-item>
 * </base-timeline>
 */
@Component({
  selector: 'base-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: { '[class]': 'hostCls()' }
})
export class TimelineComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() => cn('flex flex-col', this.extraClass()));
}
