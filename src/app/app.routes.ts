import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth-guard';
import type { SeoRouteData } from './core/seo/site';

const seo = (data: SeoRouteData) => ({ seo: data });

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        title: 'Sign in',
        data: seo({
          description:
            'Sign in to the Base UI Free Dashboard demo. Mock auth — try demo@base-ui.net / password.',
        }),
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        title: 'Create account',
        data: seo({
          description:
            'Create a demo account for Base UI Free Dashboard. Registration is mocked with localStorage.',
        }),
        loadComponent: () => import('./pages/register/register').then((m) => m.Register),
      },
      {
        path: 'forgot-password',
        title: 'Forgot password',
        data: seo({
          description:
            'Request a password reset for the Base UI Free Dashboard demo (mocked auth flow).',
        }),
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
    ],
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard',
        data: seo({
          description:
            'Overview metrics and activity for the Base UI Free Dashboard Angular admin template.',
        }),
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        title: 'Users',
        data: seo({
          description:
            'Users CRUD demo with tables and dialogs built from Base UI free components.',
        }),
        loadComponent: () => import('./pages/users/users').then((m) => m.Users),
      },
      {
        path: 'settings',
        title: 'Settings',
        data: seo({
          description:
            'Profile, billing, and notification settings with in-page Base UI sidenav navigation.',
        }),
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'ui/primitives',
        title: 'Primitives',
        data: seo({
          description:
            'Base UI primitives gallery: buttons, badges, chips, avatars, icons, kbd, aspect-ratio, scroll-area, ripple, and reveal.',
        }),
        loadComponent: () =>
          import('./pages/ui/primitives/primitives').then((m) => m.UiPrimitives),
      },
      {
        path: 'ui/forms',
        title: 'Forms',
        data: seo({
          description:
            'Base UI form controls gallery: inputs, select, OTP, phone, currency, masks, sliders, and rating.',
        }),
        loadComponent: () => import('./pages/ui/forms/forms').then((m) => m.UiForms),
      },
      {
        path: 'ui/feedback',
        title: 'Feedback',
        data: seo({
          description:
            'Base UI feedback gallery: alerts, toasts, progress, loading overlay, cookie banner, countdown, and skeletons.',
        }),
        loadComponent: () => import('./pages/ui/feedback/feedback').then((m) => m.UiFeedback),
      },
      {
        path: 'ui/overlays',
        title: 'Overlays',
        data: seo({
          description:
            'Base UI overlays gallery: dialog, dropdown, hover-card, context menu, tooltip, popover, drawer, and bottom sheet.',
        }),
        loadComponent: () => import('./pages/ui/overlays/overlays').then((m) => m.UiOverlays),
      },
      {
        path: 'ui/navigation',
        title: 'Navigation',
        data: seo({
          description:
            'Base UI navigation gallery: tabs, breadcrumb, accordion, menubar, stepper, and scroll helpers.',
        }),
        loadComponent: () =>
          import('./pages/ui/navigation/navigation').then((m) => m.UiNavigation),
      },
      {
        path: 'ui/data-display',
        title: 'Data display',
        data: seo({
          description:
            'Base UI data display gallery: cards, stats, calendar, carousel, code, paginator, and timeline.',
        }),
        loadComponent: () =>
          import('./pages/ui/data-display/data-display').then((m) => m.UiDataDisplay),
      },
      {
        path: 'ui/form-blocks',
        title: 'Form blocks',
        data: seo({
          description:
            'All 19 free Base UI form blocks: billing, payment, shipping, checkout, team invite, and more.',
        }),
        loadComponent: () =>
          import('./pages/ui/form-blocks/form-blocks').then((m) => m.UiFormBlocks),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
