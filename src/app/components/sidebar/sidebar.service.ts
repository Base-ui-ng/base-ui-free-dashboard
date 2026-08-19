// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Injectable, signal } from '@angular/core';

/**
 * A service to control the visibility state of the application sidebar.
 *
 * @example
 * sidebar = inject(SidebarService);
 * toggle() { this.sidebar.toggle(); }
 * isOpen = this.sidebar.isOpen;
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _isOpen = signal(true);

  /** Signal: whether the sidebar is currently open. */
  readonly isOpen = this._isOpen.asReadonly();

  toggle() {
    this._isOpen.update(v => !v);
  }

  setOpen(open: boolean) {
    this._isOpen.set(open);
  }
}
