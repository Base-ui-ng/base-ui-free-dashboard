// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconComponent } from '../icon/icon.component';
import { IconStrokedButtonDirective } from '../button/base-icon-stroked-button.directive';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbItemComponent } from '../breadcrumb/breadcrumb-item/breadcrumb-item.component';
import { IconStrokedButtonColor, SidenavLayoutMode } from '../types';
import { cn } from '../tw-merge/tw-merge';

/**
 * Responsive section shell with a left nav rail and scrollable body.
 * Pair with `base-sidenav-nav` and `base-sidenav-body`. On small screens a
 * hamburger toggles the nav; active label is inferred from `routerLinkActive`.
 *
 * @example
 * <base-sidenav>
 *   <base-sidenav-nav>
 *     <base-nav-list>
 *       <button base-list-item routerLink="overview" routerLinkActive="text-blue-500!">Overview</button>
 *     </base-nav-list>
 *   </base-sidenav-nav>
 *   <base-sidenav-body>
 *     <router-outlet></router-outlet>
 *   </base-sidenav-body>
 * </base-sidenav>
 *
 * @example
 * <!-- Force mobile chrome inside a narrow preview frame -->
 * <base-sidenav layout="mobile"></base-sidenav>
 */
@Component({
  selector: 'base-sidenav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    IconStrokedButtonDirective,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
  ],
  templateUrl: './sidenav.component.html',
  host: { '[class]': 'hostCls()' },
})
export class SidenavComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-sidenav class="bg-white dark:bg-slate-900"></base-sidenav>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Color for the mobile nav toggle button.
   *
   * @example
   * <base-sidenav color="accent"></base-sidenav>
   */
  readonly color = input<IconStrokedButtonColor | undefined>(undefined);

  /**
   * Layout chrome mode. `auto` follows the viewport `lg` breakpoint;
   * `mobile` / `desktop` force that chrome (useful for narrow demos).
   *
   * @example
   * <base-sidenav layout="mobile"></base-sidenav>
   */
  readonly layout = input<SidenavLayoutMode>('auto');

  protected readonly hostCls = computed(() =>
    cn('flex flex-col w-full h-full overflow-hidden', this.extraClass())
  );

  /** Whether the mobile hamburger bar should render. */
  readonly showMobileBar = computed(() => {
    const mode = this.layout();
    if (mode === 'mobile') return true;
    if (mode === 'desktop') return false;
    return true; // auto: shown via CSS `lg:hidden`
  });

  readonly mobileBarClass = computed(() => {
    const mode = this.layout();
    if (mode === 'mobile') {
      return 'flex h-10 w-full shrink-0 items-center justify-start border-b border-slate-200 px-4 dark:border-slate-700';
    }
    if (mode === 'desktop') {
      return 'hidden';
    }
    return 'flex h-10 w-full shrink-0 items-center justify-start border-b border-slate-200 px-4 dark:border-slate-700 lg:hidden';
  });

  readonly navRailClass = computed(() => {
    const open = this.navBarOpen();
    const mode = this.layout();
    const base =
      'h-full w-60 min-w-60 max-w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 py-4 transition-all duration-300 dark:border-slate-700 dark:bg-slate-900';
    if (mode === 'desktop') {
      return cn(base, 'ml-0');
    }
    if (mode === 'mobile') {
      return cn(base, open ? 'ml-0' : '-ml-60');
    }
    return cn(base, open ? 'ml-0' : '-ml-60', 'lg:ml-0');
  });

  readonly bodyClass = computed(() => {
    const mode = this.layout();
    const base = 'flex h-full flex-1 flex-col overflow-hidden transition-all duration-300';
    if (mode === 'desktop') {
      return cn(base, 'min-w-0');
    }
    if (mode === 'mobile') {
      return cn(base, 'min-w-full');
    }
    return cn(base, 'min-w-full md:min-w-0');
  });

  readonly navBarOpen = signal(false);
  readonly selectedLabel = signal('Overview');
  readonly parentLabel = signal<string | undefined>(undefined);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateSelectedLabel());

    effect(() => {
      // Collapse the drawer when entering forced mobile preview.
      if (this.layout() === 'mobile') {
        this.navBarOpen.set(false);
      }
    });
  }

  ngAfterViewInit() {
    this.updateSelectedLabel();
  }

  updateSelectedLabel() {
    setTimeout(() => {
      // Scope to this shell's nav slot so nested demos / pages with
      // `!text-blue-500` (or their own sidenav) do not steal the label.
      const nav = this.el.nativeElement.querySelector('base-sidenav-nav');
      const activeElement = (nav ?? this.el.nativeElement).querySelector(
        '.\\!text-blue-500'
      ) as HTMLElement | null;
      if (activeElement) {
        const label = Array.from(activeElement.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent?.trim() ?? '')
          .filter(Boolean)
          .join(' ')
          .trim() || activeElement.textContent?.trim() || '';
        if (label) {
          this.selectedLabel.set(label);
        }

        let previous = activeElement.previousElementSibling as HTMLElement | null;
        while (previous) {
          if (previous.tagName.toLowerCase() === 'p') {
            this.parentLabel.set(previous.textContent?.trim());
            break;
          }
          previous = previous.previousElementSibling as HTMLElement | null;
        }
      }
    }, 50);
  }

  openNavBar() {
    this.navBarOpen.update((open) => !open);
  }

  onNavClick() {
    this.navBarOpen.set(false);
    this.updateSelectedLabel();
  }

}
