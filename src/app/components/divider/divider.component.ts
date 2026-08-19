// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

import { cn } from '../tw-merge/tw-merge';

/**
 * A layout component used to separate content visually.
 *
 * @example
 * <base-divider></base-divider>
 * <base-divider [vertical]="true"></base-divider>
 */
@Component({
  selector: 'base-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './divider.component.html',
  host: { '[class]': 'hostCls()' } })
export class DividerComponent {
  readonly extraClass = input('', { alias: 'class' });
  /** If true, renders the divider vertically. */
  readonly vertical = input(false, { transform: booleanAttribute });

  protected readonly hostCls = computed(() => cn('block', this.extraClass()));
}
