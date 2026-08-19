// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { style } from '@angular/animations';
import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * A standard input directive that applies consistent Lussos theme styling to native text inputs.
 * Supports disabled and readonly states out of the box.
 * 
 * @example
 * <input type="text" base-input placeholder="Enter your name" />
 */
@Directive({
  selector: '[base-input]',
  host: {
    class: 'w-full outline-0 rounded-lg h-9 px-4 text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800! disabled:cursor-not-allowed disabled:text-slate-400 read-only:pointer-events-none read-only:cursor-not-allowed read-only:bg-slate-50 dark:read-only:bg-slate-700 transition-all duration-200 focus:ring-0 focus:outline-none'
  },
})
export class BaseInputDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    // Basic initialization if needed, host binding handles classes mostly
  }
}
