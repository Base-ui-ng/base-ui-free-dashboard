// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * An element positioned at the end of an input group.
 * 
 * @example
 * <span base-addon-end>.com</span>
 */
@Directive({
  selector: '[base-addon-end]',
  host: {
    class: 'w-5 h-5 flex items-center justify-center mr-4 shrink-0',
  },
})
export class BaseAddonEndDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    // Basic logic if needed
  }
}
