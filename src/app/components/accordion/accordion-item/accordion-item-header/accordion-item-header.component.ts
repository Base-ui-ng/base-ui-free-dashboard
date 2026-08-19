// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * The clickable header of an accordion item that toggles the body visibility.
 * 
 * @example
 * <base-accordion-item-header>
 *   Section Title
 * </base-accordion-item-header>
 */
@Component({
  selector: 'base-accordion-item-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-item-header.component.html'
})
export class AccordionItemHeaderComponent {}
