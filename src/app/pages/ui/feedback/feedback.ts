import { Component, inject, signal, viewChild } from '@angular/core';
import {
  AlertComponent,
  AnimatedCounterComponent,
  BaseButtonDirective,
  ComingSoonComponent,
  CookieBannerComponent,
  CountdownComponent,
  EmptyStateComponent,
  LoadingOverlayComponent,
  MeterGroupComponent,
  ProgressComponent,
  SkeletonComponent,
  SpinnerComponent,
  ToastService,
} from 'Base';
import type { CookieConsent } from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-feedback',
  imports: [
    ShowcasePage,
    ShowcaseSection,
    AlertComponent,
    ProgressComponent,
    SkeletonComponent,
    SpinnerComponent,
    EmptyStateComponent,
    BaseButtonDirective,
    MeterGroupComponent,
    AnimatedCounterComponent,
    CountdownComponent,
    ComingSoonComponent,
    LoadingOverlayComponent,
    CookieBannerComponent,
  ],
  templateUrl: './feedback.html',
})
export class UiFeedback {
  private readonly toast = inject(ToastService);
  protected readonly progress = signal(62);
  protected readonly launchDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 12);
  protected readonly storageMeters = [
    { label: 'Apps', value: 16, color: 'primary' as const, icon: 'grid' },
    { label: 'Messages', value: 8, color: 'success' as const, icon: 'bell' },
    { label: 'Media', value: 24, color: 'warning' as const, icon: 'star' },
  ];

  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'alerts', label: 'Alerts' },
    { id: 'toasts', label: 'Toasts' },
    { id: 'progress', label: 'Progress' },
    { id: 'meter-group', label: 'Meter group' },
    { id: 'animated-counter', label: 'Animated counter' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'coming-soon', label: 'Coming soon' },
    { id: 'skeleton', label: 'Skeleton' },
    { id: 'spinner', label: 'Spinner' },
    { id: 'loading-overlay', label: 'Loading overlay' },
    { id: 'empty-state', label: 'Empty state' },
    { id: 'cookie-banner', label: 'Cookie banner' },
  ];

  protected readonly saving = signal(false);
  protected readonly lastConsent = signal<CookieConsent | null>(null);
  private readonly demoBanner = viewChild<CookieBannerComponent>('demoBanner');

  showToast(kind: 'success' | 'error' | 'warning' | 'info'): void {
    const messages = {
      success: 'Changes saved successfully.',
      error: 'Something went wrong.',
      warning: 'Your trial ends in 3 days.',
      info: 'New components are available.',
    };
    this.toast[kind === 'info' ? 'info' : kind](messages[kind]);
  }

  simulateSave(): void {
    this.saving.set(true);
    window.setTimeout(() => this.saving.set(false), 1400);
  }

  resetCookieDemo(): void {
    this.demoBanner()?.reset();
    this.lastConsent.set(null);
  }
}
