// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { CommonModule } from '@angular/common';
import { Component, input ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

/**
 * Represents an individual page number button inside a `base-paginator`.
 *
 * @example
 * <base-p-page [active]="true">1</base-p-page>
 */
@Component({
  selector: 'base-p-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './p-page.component.html'
})
export class PPageComponent {
  /** Indicates if this page is currently the active/selected page. */
  readonly active = input(false, { transform: booleanAttribute });
}
