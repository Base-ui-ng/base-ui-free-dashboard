// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ViewContainerRef, Signal } from '@angular/core';
import { DialogContext } from './dialog-context';

/**
 * Interface that a dialog container must satisfy.
 * The default implementation is `DialogContainerComponent`.
 */
export interface DialogContainer {
  /** The dialog context injected into the hosted component. */
  context: DialogContext<unknown, unknown>;
  /** The ViewContainerRef where the dialog content is dynamically rendered. */
  container: Signal<ViewContainerRef>;
  /** Optional CSS class string applied to the container wrapper. */
  className: string;
}
