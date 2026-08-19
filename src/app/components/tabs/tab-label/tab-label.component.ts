// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, TemplateRef, viewChild, signal ,
  ChangeDetectionStrategy
} from '@angular/core';


import { IconComponent } from '../../icon/icon.component';

/**
 * A custom label for a `base-tab`. Allows you to add rich content (icons, badges, etc.) as the tab label.
 *
 * @example
 * <base-tab>
 *   <base-tab-label>
 *     <base-icon name="settings"></base-icon>
 *     Settings
 *   </base-tab-label>
 *   <base-tab-body>Content</base-tab-body>
 * </base-tab>
 */
@Component({
  selector: 'base-tab-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './tab-label.component.html'
})
export class TabLabelComponent {
  // These are set by TabComponent or parent
  readonly icon = signal<string | undefined>(undefined);
  readonly icon_position = signal<string | undefined>(undefined);
  readonly isActive = signal(false);
  readonly type = signal<string | undefined>(undefined);

  readonly labelContent = viewChild.required(TemplateRef);
}
