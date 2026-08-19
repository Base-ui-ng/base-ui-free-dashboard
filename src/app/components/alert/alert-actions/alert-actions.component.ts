// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * Container for action buttons within an alert component.
 * 
 * @example
 * <base-alert>
 *   <base-alert-actions>
 *     <button base-button>Undo</button>
 *   </base-alert-actions>
 * </base-alert>
 */
@Component({
  selector: 'base-alert-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert-actions.component.html'
})
export class AlertActionsComponent {}
