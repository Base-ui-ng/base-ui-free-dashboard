// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { ScrollButtonBase } from './scroll-button.base';

/**
 * Floating “scroll to top” button that appears after the user scrolls past a threshold.
 *
 * @example
 * <base-scroll-top threshold="400" color="primary"></base-scroll-top>
 * <base-scroll-top target="#panel" [fixed]="false"></base-scroll-top>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-scroll-top',
  templateUrl: './scroll-top.component.html',
  imports: [IconComponent, IconButtonDirective],
  host: { '[class]': 'hostClass()' },
})
export class ScrollTopComponent extends ScrollButtonBase {
  /**
   * Accessible label for the button.
   *
   * @example
   * <base-scroll-top ariaLabel="Back to top"></base-scroll-top>
   */
  readonly ariaLabel = input('Scroll to top');

  protected shouldShow(scrollTop: number, _maxScroll: number, threshold: number): boolean {
    return scrollTop > threshold;
  }

  protected destinationTop(_scrollHeight: number, _clientHeight: number): number {
    return 0;
  }
}
