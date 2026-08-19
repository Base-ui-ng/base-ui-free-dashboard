// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * An element positioned at the start of an input group.
 * 
 * @example
 * <span base-addon-start>https://</span>
 */
@Directive({
  selector: '[base-addon-start]',
  host: {
    class: 'w-5 h-5 flex items-center justify-center ml-4 shrink-0',
  },
})
export class BaseAddonStartDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    // Basic initialization if needed
  }
}
