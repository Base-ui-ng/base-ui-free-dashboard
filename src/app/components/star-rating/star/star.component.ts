// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { CommonModule } from '@angular/common';
import { Component, input, output, model, computed,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

/**
 * A single star in the `StarRatingComponent`. Handles the SVG rendering for each star segment.
 *
 * @example
 * <base-star [active]="true" [editable]="false"></base-star>
 */
@Component({
    selector: 'base-star',
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
    templateUrl: './star.component.html'
})
export class StarComponent {
  /**
     * The rating input property.
     * @example rating="value"
     */
    readonly rating = model(0);
  /**
     * The editable input property.
     * @example editable="value"
     */
    readonly editable = input(false, { transform: booleanAttribute });
  /**
     * The ratingChanged output property.
     * @example ratingChanged="value"
     */
    readonly ratingChanged = output<number>();
  
  ratings = [
    { val: 1, x: 0 },
    { val: 2, x: 240 },
    { val: 3, x: 480 },
    { val: 4, x: 720 },
    { val: 5, x: 960 }
  ];

  readonly fillWidth = computed(() => {
    const r = this.rating();
    const fullStars = Math.floor(r);
    const fraction = r % 1;
    // Each star+gap block is 240 SVG units, except the last one.
    const svgUnits = fullStars * 240 + fraction * 200;
    return `${(svgUnits / 1160) * 100}%`;
  });

  changeRating(val: number): void {
    if (this.editable()) {
      this.rating.set(val);
      this.ratingChanged.emit(val);
    }
  }

  protected readonly Math = Math;
}
