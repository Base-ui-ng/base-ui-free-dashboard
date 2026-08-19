// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md


import { Component, input ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * A wrapper to center a spinner within a block or the entire page.
 * Provides a backdrop that can be dark or light.
 * 
 * @example
 * <base-spinner-wrapper backdrop="dark">
 *   <base-spinner></base-spinner>
 * </base-spinner-wrapper>
 */
@Component({
  selector: 'base-spinner-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './spinner-wrapper.component.html'
})
export class SpinnerWrapperComponent {
  /**
     * The backdrop input property.
     * @example backdrop="value"
     */
    readonly backdrop = input<'dark' | 'light'>('light');
}
