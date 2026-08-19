// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, input, contentChild, model, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { TabBodyComponent } from '../tab-body/tab-body.component';
import { TabLabelComponent } from '../tab-label/tab-label.component';

let tabIdCounter = 0;

/**
 * The wrapper element for a single tab in a `base-tabs` group.
 *
 * @example
 * <base-tab label="Overview">
 *   <base-tab-body>Content for Overview tab</base-tab-body>
 * </base-tab>
 */
@Component({
  selector: 'base-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab.component.html',
})
export class TabComponent {
  /** Stable id for the tab trigger element (aria-controls target). */
  readonly tabId = `base-tab-${tabIdCounter}`;

  /** Stable id for the tab panel element (aria-labelledby target). */
  readonly panelId = `base-tabpanel-${tabIdCounter++}`;

  /** A simple string label for the tab. If complex HTML is needed, project a `base-tab-label` inside instead. */
  readonly label = input('');

  /** Tracks whether this tab is currently selected. */
  readonly isActive = model(false);

  /** Additional CSS classes to apply to the tab trigger. */
  readonly tabClass = input('cursor-pointer');

  readonly bodyComponent = contentChild(TabBodyComponent);
  readonly labelComponent = contentChild(TabLabelComponent);
}
