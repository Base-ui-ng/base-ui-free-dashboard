// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, HostListener, Optional, inject } from '@angular/core';
import { AlertComponent } from './alert.component';

/**
 * A directive that dismisses the parent `base-alert` when clicked.
 * 
 * @example
 * <button baseAlertDismiss>Close</button>
 */
@Directive({
  selector: '[baseAlertDismiss]',
})
export class AlertDismissDirective {
  private alert = inject(AlertComponent, { optional: true });

  @HostListener('click')
  onClick() {
    if (this.alert) {
      this.alert.handleClose();
    }
  }
}
