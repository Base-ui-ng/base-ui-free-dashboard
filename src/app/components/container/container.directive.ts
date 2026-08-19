// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive } from '@angular/core';

/**
 * A structural directive that forces the host element to act as a centered, max-width container.
 * Limits width to 1280px and provides standard horizontal padding.
 * 
 * @example
 * <div container>
 *   <h1>My Page Header</h1>
 * </div>
 */
@Directive({
  selector: '[container]',
  host: {
    class: 'block w-full max-w-7xl mx-auto px-1.5 md:px-2'
  }
})
export class ContainerDirective {}
