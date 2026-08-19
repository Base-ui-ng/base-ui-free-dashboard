// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { OutputEmitterRef, TemplateRef, Signal } from '@angular/core';

/**
 * Interface that a dropdown component must satisfy for use with the `[base-dropdown-menu-trigger]` directive.
 *
 * @example
 * class MyDropdownComponent implements DropdownPanel<MyContext> {
 *   templateRef = inject(TemplateRef<MyContext>);
 *   closed = output<void>();
 * }
 */
export interface DropdownPanel<T> {
  templateRef: Signal<TemplateRef<T>>;
  readonly closed: OutputEmitterRef<void>;
}
