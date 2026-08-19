import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from 'Base';
import { ThemeService } from './components/theme/theme.service';
import { SeoService } from './core/seo/seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieBannerComponent],
  template: `
    <router-outlet />
    <base-cookie-banner
      storageKey="base-ui-dashboard-cookie-consent"
      title="We use cookies"
      message="We store theme and a mock session in this demo. You can reject non-essential cookies."
      policyHref="https://base-ui.net">
    </base-cookie-banner>
  `,
})
export class App {
  /** Eagerly initialize theme (light/dark class on <html>). */
  private readonly theme = inject(ThemeService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();
  }
}
