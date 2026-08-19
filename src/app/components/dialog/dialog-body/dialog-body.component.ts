// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, input, model ,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A body section for a dialog, rendered as part of `base-dialog`.
 *
 * @example
 * <base-dialog-body>
 *   <p>Dialog content goes here.</p>
 * </base-dialog-body>
 */
@Component({
  selector: 'base-dialog-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './dialog-body.component.html'
})
export class DialogBodyComponent {
  readonly height = model<number>();
}
