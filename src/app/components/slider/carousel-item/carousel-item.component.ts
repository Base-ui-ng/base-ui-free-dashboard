// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, inject, input, computed ,
  ChangeDetectionStrategy, signal, HostBinding
} from '@angular/core';

import { GALLERY_SLIDER_TOKEN } from '../slider.tokens';
import { cn } from '../../tw-merge/tw-merge';

/**
 * An individual slide item within a gallery slider (`GallerySliderComponent`).
 * Can contain arbitrary content, typically an image and an optional `base-carousel-caption`.
 *
 * @example
 * <base-carousel-item>
 *   <img src="slide.jpg" alt="Slide" />
 *   <base-carousel-caption>Caption</base-carousel-caption>
 * </base-carousel-item>
 */
@Component({
  selector: 'base-carousel-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './carousel-item.component.html',
  host: {
    '[class]': 'hostClass()',
    '[class.active]': 'active()',
    '[class.shrink-0]': '!isCrossfade()',
    '[class.absolute]': 'isCrossfade()',
    '[class.inset-0]': 'isCrossfade()',
    '[class.z-0]': 'isCrossfade() && !active()',
    '[class.z-[1]]': 'isCrossfade() && active()',
    '[class.opacity-0]': 'isCrossfade() && !active()',
    '[class.opacity-100]': 'isCrossfade() && active()',
    '[class.pointer-events-none]': 'isCrossfade() && !active()',
    '[class.pointer-events-auto]': 'isCrossfade() && active()'
}
})
export class CarouselItemComponent {
  /** Additional CSS classes to merge into the host element. */
  readonly extraClass = input('', { alias: "class" });

  readonly hostClass = computed(() =>
    cn(
      'block h-full transition-all duration-600 ease-in-out',
      !this.isCrossfade() && 'relative',
      this.extraClass()
    )
  );

  readonly totalItems = computed(() => {
    return this.parent?.totalItems() || 1;
  });

  @HostBinding('style.width')
  get width() {
    return this.isCrossfade() ? '100%' : (100 / this.totalItems()) + '%';
  }

  /** Optional override for the auto-play interval when this specific slide is active. */
  readonly interval = input<number>(-1);

  readonly active = signal(false);

  private parent = inject(GALLERY_SLIDER_TOKEN, { optional: true });

  readonly isCrossfade = computed(() => {
    return this.parent?.transition() === 'crossfade';
  });
}
