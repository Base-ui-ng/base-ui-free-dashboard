// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Directive,
  ElementRef,
  inject,
  NgZone,
  input,
  signal,
  output
} from '@angular/core';

/**
 * A directive to link a navigation item to a specific element ID in a `base-scroll-nav` layout.
 * Automatically receives an active class when its target element is scrolled into view.
 * 
 * @example
 * <a [base-scroll-nav-item]="'section-1'">Go to Section 1</a>
 */
@Directive({
  selector: '[base-scroll-nav-item]',
  host: {
    '(click)': 'onClick()',
    '[class.scroll-nav-item]': 'true',
    '[class.!text-blue-500]': 'isActive()',
    '[attr.aria-current]': 'isActive() ? "location" : null',
  },
})
export class ScrollNavItemDirective {
  elementRef = inject(ElementRef);

  public readonly elementId = input('', { alias: "base-scroll-nav-item" });
  
  public isActive = signal(false);

  /**
   * The clicked output property.
   * @example clicked="value"
   */
  public clicked = output<ScrollNavItemDirective>();

  public onClick() {
    this.clicked.emit(this);
  }
}
