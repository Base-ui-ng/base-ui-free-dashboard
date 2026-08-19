// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { SidebarService } from '../../sidebar/sidebar.service';
import { cn } from '../../tw-merge/tw-merge';
import { LayoutAppShellComponent } from '../layout-app-shell.component';

/**
 * Navigation item for `base-app-shell`. Shows an icon plus a label; in the
 * desktop mini rail the label fades out with the rail width.
 *
 * Pair with `routerLink` / `routerLinkActive="active"` on the host.
 *
 * @example
 * <a base-app-shell-nav-item icon="home" routerLink="/" routerLinkActive="active">
 *   Home
 * </a>
 */
@Component({
  selector: 'a[base-app-shell-nav-item], button[base-app-shell-nav-item], base-app-shell-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './app-shell-nav-item.component.html',
  host: {
    '[class]': 'hostCls()',
  },
})
export class AppShellNavItemComponent {
  private readonly sidebar = inject(SidebarService);
  private readonly chrome = inject(LayoutAppShellComponent, { optional: true });

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <a base-app-shell-nav-item class="mt-1" icon="home" routerLink="/">Home</a>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Icon sprite name rendered before the label.
   *
   * @example
   * <a base-app-shell-nav-item icon="settings" routerLink="/settings">Settings</a>
   */
  readonly icon = input('');

  /**
   * Optional badge text shown after the label (hidden in the mini rail).
   *
   * @example
   * <a base-app-shell-nav-item icon="users" badge="3" routerLink="/users">Users</a>
   */
  readonly badge = input('');

  protected readonly collapsed = computed(() => {
    if (this.chrome) {
      return this.chrome.collapsed();
    }
    return !this.sidebar.isOpen();
  });

  protected readonly hostCls = computed(() =>
    cn(
      'group my-1 flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-4 text-sm font-medium text-slate-600 no-underline transition-all duration-300 ease-in-out hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700/50 [&.active]:bg-blue-500 [&.active]:text-white [&.active]:hover:bg-blue-700',
      this.extraClass(),
    ),
  );

  protected readonly iconCls = computed(() =>
    cn(
      'h-5 w-5 min-w-5 shrink-0 pointer-events-none stroke-slate-500 transition-[margin] duration-300 ease-in-out dark:stroke-slate-400 group-[.active]:stroke-white dark:group-[.active]:stroke-white',
      this.collapsed() ? 'mr-0' : 'mr-3',
    ),
  );

  protected readonly labelCls = computed(() =>
    cn(
      'pointer-events-none min-w-0 overflow-hidden whitespace-nowrap font-medium text-slate-700 transition-[max-width,opacity,margin] duration-300 ease-in-out dark:text-slate-300 group-[.active]:text-white dark:group-[.active]:text-white',
      this.collapsed() ? 'max-w-0 opacity-0' : 'max-w-48 opacity-100',
    ),
  );

  protected readonly badgeCls = computed(() =>
    cn(
      'ml-auto shrink-0 rounded-md bg-blue-500 px-1.5 py-0.5 text-[10px] font-semibold text-white transition-[max-width,opacity] duration-300 ease-in-out group-[.active]:bg-white group-[.active]:text-blue-600',
      this.collapsed() ? 'max-w-0 overflow-hidden opacity-0' : 'max-w-12 opacity-100',
    ),
  );
}
