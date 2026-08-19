import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import {
  AppShellContentComponent,
  AppShellNavItemComponent,
  AppShellNavSectionComponent,
  AppShellSidebarComponent,
  AppShellTopbarComponent,
  AvatarComponent,
  BaseAddonEndDirective,
  BaseAddonStartDirective,
  BaseInputDirective,
  DropdownMenuComponent,
  DropdownMenuDirective,
  DropdownMenuItemComponent,
  IconComponent,
  IconStrokedButtonDirective,
  InputGroupComponent,
  KbdComponent,
  LayoutAppShellComponent,
  ScrollAreaComponent,
  SidebarService,
  ThemeService,
} from 'Base';
import { AuthService } from '../../core/auth/auth';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  badge?: string;
  title: string;
}

@Component({
  selector: 'app-app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LayoutAppShellComponent,
    AppShellSidebarComponent,
    AppShellTopbarComponent,
    AppShellContentComponent,
    AppShellNavSectionComponent,
    AppShellNavItemComponent,
    ScrollAreaComponent,
    IconComponent,
    IconStrokedButtonDirective,
    InputGroupComponent,
    BaseInputDirective,
    BaseAddonStartDirective,
    BaseAddonEndDirective,
    KbdComponent,
    AvatarComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    DropdownMenuDirective,
  ],
  templateUrl: './app-shell.html',
})
export class AppShell {
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly sidebar = inject(SidebarService);

  protected readonly githubRepoUrl = 'https://github.com/lussos/base-ui-free-dashboard';

  protected readonly appNav: NavItem[] = [
    { path: '/app/dashboard', label: 'Home', icon: 'home', title: 'Dashboard' },
    { path: '/app/users', label: 'Users', icon: 'users', badge: '3', title: 'Users' },
    { path: '/app/settings', label: 'Settings', icon: 'settings', title: 'Settings' },
  ];

  protected readonly uiNav: NavItem[] = [
    { path: '/app/ui/primitives', label: 'Primitives', icon: 'grid', title: 'Primitives' },
    { path: '/app/ui/forms', label: 'Forms', icon: 'edit-line', title: 'Forms' },
    { path: '/app/ui/feedback', label: 'Feedback', icon: 'bell', title: 'Feedback' },
    { path: '/app/ui/overlays', label: 'Overlays', icon: 'layout', title: 'Overlays' },
    { path: '/app/ui/navigation', label: 'Navigation', icon: 'menu', title: 'Navigation' },
    { path: '/app/ui/data-display', label: 'Data display', icon: 'bar-chart', title: 'Data display' },
    { path: '/app/ui/form-blocks', label: 'Form blocks', icon: 'layout-grid', title: 'Form blocks' },
  ];

  private readonly allNav = [...this.appNav, ...this.uiNav];

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly pageTitle = computed(() => {
    const path = this.url();
    const match = this.allNav.find((item) => path.startsWith(item.path));
    return match?.title ?? 'Dashboard';
  });

  protected logout(): void {
    this.auth.logout();
  }
}
