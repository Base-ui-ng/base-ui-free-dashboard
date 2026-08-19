// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * A caption overlay for a gallery slider or carousel item, typically positioned over the image.
 *
 * @example
 * <base-carousel-caption>
 *   <h3>Slide Title</h3>
 *   <p>Slide description</p>
 * </base-carousel-caption>
 */
@Component({
  selector: 'base-carousel-caption',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    class:
      'absolute inset-x-0 bottom-12 z-20 px-[15%] pt-4 pb-2 text-center pointer-events-none',
  },
  styles: [`@keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    :host-context(.active) ::ng-deep h5 { animation: fadeInDown 1s ease-out forwards; }
    :host-context(.active) ::ng-deep p { animation: fadeInUp 1s forwards; }

    /* Ensure hidden when not active to prevent"pop" before animation */
    :host-context(:not(.active)) ::ng-deep h5,
    :host-context(:not(.active)) ::ng-deep p { opacity: 0; }
  `],
})
export class CarouselCaptionComponent {}
