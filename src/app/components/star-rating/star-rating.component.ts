// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, input ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * A flexbox container wrapper for `base-star` components.
 * Aligns stars horizontally with appropriate gap spacing.
 * 
 * @example
 * <base-star-rating ariaLabel="Product rating">
 *   <base-star filled="true"></base-star>
 *   <base-star filled="false"></base-star>
 * </base-star-rating>
 */
@Component({
  selector: 'base-star-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './star-rating.component.html',
  host: {
    role: 'group',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class StarRatingComponent {
  /** Accessible label for the star rating group. */
  readonly ariaLabel = input('Rating');
}
