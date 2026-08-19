import { RenderMode, type ServerRoute } from '@angular/ssr';

/**
 * Public auth pages are prerendered for SEO.
 * Authenticated `/app/**` routes stay client-rendered (mock auth + localStorage).
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'forgot-password',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
