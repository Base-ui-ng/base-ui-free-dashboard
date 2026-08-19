// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastAction, ToastColor, ToastPosition } from '../types';
import { injectTimers } from '../safe-timer/safe-timer';

/**
 * Options passed to ToastService.show and the color shortcuts.
 *
 * @example
 * this.toast.show('Saved', { color: 'success', action: { label: 'Undo', onClick: restore } });
 */
export interface ToastConfig {
  /** Semantic color of the toast. Defaults to `primary`. */
  color?: ToastColor;
  /** Auto-dismiss delay in ms. `0` keeps the toast until dismissed. Defaults to 4000. */
  duration?: number;
  /** `base-icon` name. Defaults from `color` when omitted. */
  icon?: string;
  /** Viewport corner. Defaults to `top-right`. */
  position?: ToastPosition;
  /** Optional inline button (e.g. Undo). `{ label, onClick, dismiss? }`. */
  action?: ToastAction;
}

/**
 * Status messages for ToastService.promise.
 *
 * @example
 * await this.toast.promise(save(), { loading: 'Saving…', success: 'Saved', error: 'Failed' });
 */
export interface ToastPromiseMessages<T> {
  /** Shown while the promise is pending (`duration: 0`). */
  loading: string;
  /** Shown on resolve. */
  success: string | ((data: T) => string);
  /** Shown on reject. */
  error: string | ((err: unknown) => string);
}

export interface ToastItem {
  id: number;
  message: string;
  color: ToastColor;
  icon: string;
  duration: number;
  position: ToastPosition;
  removing: boolean;
  action?: ToastAction;
}

/**
 * Imperative toast API. Mounts a live region on first use.
 * SSR-safe: skips DOM work off the browser; creates and appends the host via `DOCUMENT`.
 *
 * @example
 * this.toast.success('Copied');
 * this.toast.show('Deleted', { action: { label: 'Undo', onClick: () => restore() } });
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /** Timers cancelled with the injector — see utils/safe-timer. */
  private readonly timers = injectTimers();
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  private hostEl?: HTMLElement;
  private toastComponent?: ToastComponent;
  private nextId = 0;
  private defaultDuration = 4000;

  private ensureContainer() {
    if (this.hostEl || !this.isBrowser) return;

    const hostEl = this.document.createElement('div');
    hostEl.setAttribute('aria-live', 'polite');
    hostEl.setAttribute('aria-relevant', 'additions removals');
    this.document.body.appendChild(hostEl);

    const componentRef = createComponent(ToastComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: hostEl,
    });

    this.appRef.attachView(componentRef.hostView);
    this.toastComponent = componentRef.instance;
    this.hostEl = hostEl;
  }

  /**
   * Shows a toast and returns its id.
   * @example
   * const id = this.toast.show('Hello', { duration: 0 });
   */
  show(message: string, config: ToastConfig = {}): number {
    this.ensureContainer();
    if (!this.toastComponent) return 0;

    const id = ++this.nextId;
    const toast: ToastItem = {
      id,
      message,
      color: config.color || 'primary',
      icon: config.icon || this.getDefaultIcon(config.color),
      duration: config.duration ?? this.defaultDuration,
      position: config.position || 'top-right',
      removing: false,
      action: config.action,
    };

    this.toastComponent.addToast(toast);

    if (toast.duration > 0) {
      this.timers.setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  /**
   * Dismisses a toast by id.
   * @example
   * this.toast.dismiss(id);
   */
  dismiss(id: number) {
    if (!this.toastComponent) return;
    this.toastComponent.removeToast(id);

    this.timers.setTimeout(() => {
      if (this.toastComponent) {
        this.toastComponent.cleanToast(id);
      }
    }, 300);
  }

  /**
   * Success toast.
   * @example
   * this.toast.success('Saved');
   */
  success(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'success', icon: 'check' });
  }

  /**
   * Error toast.
   * @example
   * this.toast.error('Could not save');
   */
  error(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'danger', icon: 'alert-triangle' });
  }

  /**
   * Warning toast.
   * @example
   * this.toast.warning('Session expires soon');
   */
  warning(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'warning', icon: 'alert-circle' });
  }

  /**
   * Info toast.
   * @example
   * this.toast.info('3 new messages');
   */
  info(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'primary', icon: 'info-circle' });
  }

  /**
   * Loading toast that resolves to success or error when the promise settles.
   * @example
   * await this.toast.promise(save(), {
   *   loading: 'Saving…',
   *   success: 'Saved',
   *   error: (e) => String(e),
   * });
   */
  promise<T>(
    promiseOrFn: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>,
    config?: ToastConfig,
  ): Promise<T> {
    const pending = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;
    const id = this.show(messages.loading, {
      ...config,
      duration: 0,
      color: 'primary',
      icon: config?.icon || 'loader',
    });

    return pending.then(
      (data) => {
        this.dismiss(id);
        const message =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        this.success(message, config);
        return data;
      },
      (err: unknown) => {
        this.dismiss(id);
        const message = typeof messages.error === 'function' ? messages.error(err) : messages.error;
        this.error(message, config);
        throw err;
      },
    );
  }

  /**
   * Dismisses every visible toast.
   * @example
   * this.toast.clearAll();
   */
  clearAll() {
    if (!this.toastComponent) return;
    this.toastComponent.toasts.set(
      this.toastComponent.toasts().map((t) => ({ ...t, removing: true })),
    );
    this.timers.setTimeout(() => {
      if (this.toastComponent) {
        this.toastComponent.toasts.set([]);
      }
    }, 300);
  }

  private getDefaultIcon(color?: ToastColor): string {
    switch (color) {
      case 'success':
        return 'check';
      case 'danger':
        return 'alert-triangle';
      case 'warning':
        return 'alert-circle';
      case 'primary':
        return 'info-circle';
      case 'accent':
        return 'help-circle';
      default:
        return 'info-circle';
    }
  }
}
