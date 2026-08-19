// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SidebarService } from '../../sidebar/sidebar.service';
import { cn } from '../../tw-merge/tw-merge';
import { LayoutAppShellComponent } from '../layout-app-shell.component';

/**
 * Sidebar slot for `base-app-shell` — logo and primary nav
 * (`base-app-shell-nav-section` / `base-app-shell-nav-item`).
 *
 * @example
 * <base-app-shell-sidebar>
 *   <base-app-shell-nav-section label="App">…</base-app-shell-nav-section>
 * </base-app-shell-sidebar>
 */
@Component({
  selector: 'base-app-shell-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell-sidebar.component.html',
  host: { '[class]': 'hostCls()' },
})
export class AppShellSidebarComponent {
  private readonly sidebar = inject(SidebarService);
  private readonly chrome = inject(LayoutAppShellComponent, { optional: true });

  readonly extraClass = input('', { alias: 'class' });

  protected readonly collapsed = computed(() => {
    if (this.chrome) {
      return this.chrome.collapsed();
    }
    return !this.sidebar.isOpen();
  });

  protected readonly hostCls = computed(() =>
    cn(
      'flex h-full min-h-0 w-full flex-col overflow-hidden',
      this.collapsed() ? 'px-2' : 'px-3',
      this.extraClass(),
    ),
  );
}
