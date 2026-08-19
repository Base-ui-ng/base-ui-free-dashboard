// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, TemplateRef, viewChild ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * The actual content wrapper for a `base-tab`. 
 * Content inside this tag is only rendered/visible when the parent tab is active.
 *
 * @example
 * <base-tab-body>Content visible when tab is active</base-tab-body>
 */
@Component({
  selector: 'base-tab-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab-body.component.html'
})
export class TabBodyComponent {
  readonly bodyContent = viewChild.required(TemplateRef);
}
