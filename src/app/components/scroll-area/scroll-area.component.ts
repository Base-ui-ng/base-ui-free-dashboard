// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * Overflow container with a thin, theme-aware scrollbar. Give it an explicit
 * height (for example `class="h-64"`) so the inner content can scroll.
 *
 * @example
 * <base-scroll-area class="h-64">
 *   <p>Long content…</p>
 * </base-scroll-area>
 */
@Component({
  selector: 'base-scroll-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './scroll-area.component.html',
  host: { '[class]': 'hostCls()' },
  styles: `
    :host {
      scrollbar-width: thin;
      scrollbar-color: rgb(148 163 184) transparent;
    }
    :host::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    :host::-webkit-scrollbar-thumb {
      background-color: rgb(148 163 184);
      border-radius: 9999px;
    }
    :host::-webkit-scrollbar-track {
      background: transparent;
    }
    :host-context(.dark) {
      scrollbar-color: rgb(71 85 105) transparent;
    }
    :host-context(.dark)::-webkit-scrollbar-thumb {
      background-color: rgb(71 85 105);
    }
  `,
})
export class ScrollAreaComponent {
  /**
   * Extra host classes merged via `cn()`. Include a height so overflow can scroll.
   * @example
   * <base-scroll-area class="h-72 max-w-sm"></base-scroll-area>
   */
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() =>
    cn('block min-h-0 overflow-auto', this.extraClass()),
  );
}
