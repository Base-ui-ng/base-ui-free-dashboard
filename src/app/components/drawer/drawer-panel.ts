// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { OutputEmitterRef, TemplateRef, Signal } from '@angular/core';

/**
 * Interface that a drawer component must satisfy for use with the `[base-drawer-trigger]` directive.
 *
 * @example
 * class MyDrawerComponent implements DrawerPanel<MyContext> {
 *   templateRef = inject(TemplateRef<MyContext>);
 *   closed = output<void>();
 * }
 */
export interface DrawerPanel<T> {
  templateRef: Signal<TemplateRef<T>>;
  readonly closed: OutputEmitterRef<void>;
}
