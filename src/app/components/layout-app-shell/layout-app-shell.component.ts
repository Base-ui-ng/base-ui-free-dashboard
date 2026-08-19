// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconComponent } from '../icon/icon.component';
import { IconStrokedButtonDirective } from '../button/base-icon-stroked-button.directive';
import { SidebarService } from '../sidebar/sidebar.service';
import { cn } from '../tw-merge/tw-merge';

/** Dashboard rail: expanded above this width, overlay drawer below. */
const DASH_DESKTOP_BP = '(min-width: 1080px)';

/**
 * Primary **application / dashboard chrome**: left rail, sticky top bar, and
 * scrollable content. Pair with `base-app-shell-sidebar`, `base-app-shell-topbar`,
 * `base-app-shell-content`, and optional `base-app-shell-nav-section` /
 * `base-app-shell-nav-item`.
 *
 * Desktop: expanded rail or a 76px mini rail (`SidebarService`). Mobile: overlay
 * drawer. Do **not** use `base-sidenav` for app chrome — that component is for
 * in-page section navigation only.
 *
 * Nested nav, mega menus, and the full `base-shell` product chrome (page +
 * dashboard modes) belong in Base UI Pro.
 *
 * @example
 * <base-app-shell>
 *   <base-app-shell-sidebar>
 *     <base-app-shell-nav-section label="App">
 *       <a base-app-shell-nav-item icon="home" routerLink="/app">Home</a>
 *     </base-app-shell-nav-section>
 *   </base-app-shell-sidebar>
 *   <base-app-shell-topbar>Title / search / avatar</base-app-shell-topbar>
 *   <base-app-shell-content>
 *     <router-outlet />
 *   </base-app-shell-content>
 * </base-app-shell>
 */
@Component({
  selector: 'base-app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconStrokedButtonDirective],
  templateUrl: './layout-app-shell.component.html',
  host: {
    '[class]': 'hostCls()',
    '[attr.data-collapsed]': 'collapsed() ? "" : null',
  },
})
export class LayoutAppShellComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly sidebar = inject(SidebarService);

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-app-shell class="bg-slate-50"></base-app-shell>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Expanded rail width in px.
   *
   * @example
   * <base-app-shell [width]="260"></base-app-shell>
   */
  readonly width = input(280);

  /**
   * Mini (icons-only) rail width in px.
   *
   * @example
   * <base-app-shell [miniWidth]="72"></base-app-shell>
   */
  readonly miniWidth = input(76);

  /** Tracks viewport below 1080px for overlay + drawer behavior. */
  readonly isMobile = signal(
    typeof window !== 'undefined' ? !window.matchMedia(DASH_DESKTOP_BP).matches : false,
  );

  /** Desktop mini-rail: sidebar marked closed, but still visible as icons. */
  readonly collapsed = computed(() => !this.isMobile() && !this.sidebar.isOpen());

  protected readonly hostCls = computed(() =>
    cn('relative flex h-full w-full overflow-hidden', this.extraClass()),
  );

  protected readonly showMobileOverlay = computed(
    () => this.isMobile() && this.sidebar.isOpen(),
  );

  protected readonly railWidth = computed(() =>
    this.collapsed() ? this.miniWidth() : this.width(),
  );

  protected readonly sidebarClass = computed(() => {
    const mobile = this.isMobile();
    const open = this.sidebar.isOpen();
    return cn(
      'fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white py-4 shadow-xl outline-none transition-[width,min-width,max-width,transform] duration-300 ease-out dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 min-[1080px]:static min-[1080px]:z-auto min-[1080px]:shadow-none min-[1080px]:translate-x-0',
      mobile && !open ? '-translate-x-full' : 'translate-x-0',
    );
  });

  protected readonly mainClass = computed(() =>
    cn(
      'relative flex h-full flex-1 flex-col overflow-hidden',
      this.showMobileOverlay() ? 'min-w-full' : 'min-w-0',
    ),
  );

  protected readonly topbarClass = computed(() =>
    cn(
      'sticky top-0 z-20 flex h-[60px] w-full shrink-0 items-center gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:gap-3 sm:px-4 md:px-6',
    ),
  );

  protected readonly contentClass = computed(() =>
    cn('min-h-0 flex-1 overflow-x-hidden overflow-y-auto'),
  );

  protected readonly hamburgerClass = computed(() =>
    cn(
      'shrink-0',
      this.isMobile() ? 'inline-flex' : 'hidden',
    ),
  );

  constructor() {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia(DASH_DESKTOP_BP);
      const onChange = () => {
        const desktop = mq.matches;
        this.isMobile.set(!desktop);
        if (desktop) {
          this.sidebar.setOpen(true);
        } else {
          this.sidebar.setOpen(false);
        }
      };
      mq.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mq.removeEventListener('change', onChange));
      onChange();
    }

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.sidebar.setOpen(false);
        }
      });
  }

  protected toggleSidebar(): void {
    this.sidebar.toggle();
  }

  protected closeMobile(): void {
    this.sidebar.setOpen(false);
  }
}
