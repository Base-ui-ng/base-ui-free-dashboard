// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component ,
  ChangeDetectionStrategy
} from '@angular/core';


/**
 * A header section for a dialog, rendered as part of `base-dialog`.
 *
 * @example
 * <base-dialog-header>
 *   <h3>Modal Title</h3>
 * </base-dialog-header>
 */
@Component({
  selector: 'base-dialog-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent {}
