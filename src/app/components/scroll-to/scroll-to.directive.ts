// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/**
 * A behavior directive that smoothly scrolls the window to a target element when the host is clicked.
 * 
 * @example
 * <button [baseScrollTo]="'#footer'">Scroll to Footer</button>
 */
@Directive({
  selector: '[baseScrollTo]',
})
export class ScrollToDirective {
  /** A valid CSS selector (like an ID '#my-div') specifying the target to scroll to. */
  readonly target = input('', { alias: "baseScrollTo" });
  
  private el = inject(ElementRef);

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = this.target();
    if (!target) return;
    
    const targetElement = document.querySelector(target);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
