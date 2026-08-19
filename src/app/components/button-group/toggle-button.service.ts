// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Injectable, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Minimal child API the toggle service / button group need from each item.
 * Avoids importing `GroupButtonComponent` (circular with the parent).
 */
export interface ToggleGroupButton {
  readonly active: WritableSignal<boolean>;
  value(): unknown;
}

/**
 * An internal service used by `ButtonGroupComponent` to coordinate toggle state
 * among child group button items.
 *
 * @example
 * // This service is used internally by ButtonGroupComponent.
 * // You do not normally inject it directly.
 */
@Injectable({ providedIn: 'root' })
export class ToggleButtonService {
  private selectButton = new Subject<ToggleGroupButton>();
  selectButton$ = this.selectButton.asObservable();

  setSelectedButton(value: ToggleGroupButton) {
    this.selectButton.next(value);
  }
}
