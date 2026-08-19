// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, input, viewChild, ElementRef ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * A highly optimized SVG icon component.
 *
 * Icons in the default sprite (`assets/icons.svg`) are outline/stroke-only artwork —
 * their `<symbol>` elements set `fill="none"` directly, which (per SVG cascade rules)
 * always wins over an inherited `fill` from a `fill-*`/`text-*` class, so a plain CSS
 * class can never visually "fill" them. Use the `filled` input to switch to the
 * companion solid sprite (`assets/icons-filled.svg`) instead, e.g. for a toggled
 * favorite/wishlist heart or a filled star rating.
 *
 * @example
 * <base-icon name="home" size="32" class="stroke-blue-500"></base-icon>
 * <base-icon name="heart" [filled]="isFavorited" class="fill-red-500"></base-icon>
 */
@Component({
  selector: 'base-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './icon.component.html',
  host: {
    '[class]': 'hostCls()',
    '[style.width]':  'sizeWithUnit()',
    '[style.height]': 'sizeWithUnit()'
},
  styles: [`
    :host:not([class*=" w-"]):not([class^="w-"]):not([style*="width"]) { width: 24px; }
    :host:not([class*=" h-"]):not([class^="h-"]):not([style*="height"]) { height: 24px; }
    :host:not([class*=" stroke-"]):not([class^="stroke-"]):not([class*=" text-"]):not([class^="text-"]):not([class*=" fill-"]):not([class^="fill-"]) { stroke: currentColor; }
  `]
})
export class IconComponent {
  readonly extraClass = input('', { alias: 'class' });
  readonly name  = input<string | undefined>('');
  readonly path  = input('assets/icons.svg');
  readonly color = input('');
  readonly size  = input<string | number>('');

  /** Renders the solid variant from `filledPath` instead of the outline sprite. */
  readonly filled = input(false, { transform: booleanAttribute });

  /** Sprite used when `filled` is true. Its symbols must use `fill="currentColor"`, not `fill="none"`. */
  readonly filledPath = input('assets/icons-filled.svg');

  protected readonly hostCls = computed(() => cn('inline-flex align-middle', this.extraClass()));

  protected readonly resolvedPath = computed(() => (this.filled() ? this.filledPath() : this.path()));

  readonly sizeWithUnit = computed(() => {
    const s = this.size();
    if (!s) return null;
    return typeof s === 'number' || !isNaN(Number(s)) ? `${s}px` : s;
  });
}
