// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * A standard textarea directive that applies consistent Lussos theme styling.
 * 
 * @example
 * <textarea base-textarea rows="4" placeholder="Enter your message"></textarea>
 */
@Directive({
  selector: '[base-textarea]',
  host: {
    class: 'w-full outline-0 px-1 py-0.5 text-sm text-slate-700 dark:text-slate-300 dark:bg-slate-800 disabled:cursor-not-allowed disabled:text-slate-400 read-only:pointer-events-none read-only:cursor-not-allowed read-only:bg-slate-50 dark:read-only:bg-slate-700 transition-colors duration-200 focus:border-blue-500 border border-slate-300 dark:border-slate-700 rounded-md min-h-14 block',
  },
})
export class BaseTextareaDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    // Basic initialization if needed
  }
}
