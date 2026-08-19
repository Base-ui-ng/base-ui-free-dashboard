// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { cn } from '../tw-merge/tw-merge';

/**
 * A container component for breadcrumb navigation.
 * Usually contains multiple `base-breadcrumb-item` components.
 * Stays on a single row; the current (last) item truncates with an ellipsis.
 *
 * @example
 * <base-breadcrumb>
 *   <base-breadcrumb-item label="Home" link="/"></base-breadcrumb-item>
 *   <base-breadcrumb-item label="Dashboard" link="/dashboard"></base-breadcrumb-item>
 *   <base-breadcrumb-item label="A very long current page title"></base-breadcrumb-item>
 * </base-breadcrumb>
 */
@Component({
  selector: 'base-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-breadcrumb class="mb-6"></base-breadcrumb>
   */
  @Input('class') extraClass = '';

  @HostBinding('class')
  get hostClass() {
    return cn('block min-w-0 max-w-full', this.extraClass);
  }
}
