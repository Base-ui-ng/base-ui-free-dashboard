// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SidebarService } from '../../sidebar/sidebar.service';
import { cn } from '../../tw-merge/tw-merge';
import { LayoutAppShellComponent } from '../layout-app-shell.component';

/**
 * Labeled group inside `base-app-shell-sidebar`. The heading fades out with the
 * desktop mini-rail; a small gap still separates groups.
 *
 * @example
 * <base-app-shell-nav-section label="Workspace">
 *   <a base-app-shell-nav-item icon="home" routerLink="/">Home</a>
 * </base-app-shell-nav-section>
 */
@Component({
  selector: 'base-app-shell-nav-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell-nav-section.component.html',
  host: {
    '[class]': 'hostCls()',
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class AppShellNavSectionComponent {
  private readonly sidebar = inject(SidebarService);
  private readonly chrome = inject(LayoutAppShellComponent, { optional: true });

  /**
   * Extra host classes merged via `cn()`.
   * @example
   * <base-app-shell-nav-section class="mt-6" label="Account"></base-app-shell-nav-section>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Visible section heading. Fades out when the desktop rail is collapsed.
   * @example
   * <base-app-shell-nav-section label="Docs"></base-app-shell-nav-section>
   */
  readonly label = input('');

  protected readonly collapsed = computed(() => {
    if (this.chrome) {
      return this.chrome.collapsed();
    }
    return !this.sidebar.isOpen();
  });

  protected readonly hostCls = computed(() =>
    cn(
      'flex flex-col transition-[margin] duration-300 ease-in-out',
      this.collapsed() ? 'mt-2 first:mt-0' : 'mt-3 first:mt-0',
      this.extraClass(),
    ),
  );

  protected readonly headingCls = computed(() =>
    cn(
      'm-0! overflow-hidden whitespace-nowrap px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-[max-height,opacity,padding] duration-300 ease-in-out dark:text-slate-400',
      this.collapsed() ? 'max-h-0 py-0 opacity-0' : 'max-h-8 pb-1 pt-2 opacity-100',
    ),
  );
}
