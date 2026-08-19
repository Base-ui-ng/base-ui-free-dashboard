// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component ,
  ChangeDetectionStrategy
} from '@angular/core';


/**
 * A footer section for a dialog, rendered as part of `base-dialog`.
 *
 * @example
 * <base-dialog-footer>
 *   <button base-button color="primary">Save</button>
 * </base-dialog-footer>
 */
@Component({
  selector: 'base-dialog-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent {}
