// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { ScrollButtonBase } from './scroll-button.base';

/**
 * Floating “scroll to bottom” button that appears when more content remains below.
 *
 * @example
 * <base-scroll-bottom threshold="200" color="primary"></base-scroll-bottom>
 * <base-scroll-bottom target="#chat" position="bottom-left"></base-scroll-bottom>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-scroll-bottom',
  templateUrl: './scroll-bottom.component.html',
  imports: [IconComponent, IconButtonDirective],
  host: { '[class]': 'hostClass()' },
})
export class ScrollBottomComponent extends ScrollButtonBase {
  /**
   * Accessible label for the button.
   *
   * @example
   * <base-scroll-bottom ariaLabel="Jump to latest"></base-scroll-bottom>
   */
  readonly ariaLabel = input('Scroll to bottom');

  protected shouldShow(scrollTop: number, maxScroll: number, threshold: number): boolean {
    if (maxScroll <= 0) return false;
    const distanceFromBottom = maxScroll - scrollTop;
    return distanceFromBottom > threshold;
  }

  protected destinationTop(scrollHeight: number, clientHeight: number): number {
    return Math.max(0, scrollHeight - clientHeight);
  }
}
