// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md


import { Component, computed, signal ,
  ChangeDetectionStrategy
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ToastItem } from './toast.service';
import { ToastPosition } from '../types';
import { injectTimers } from '../safe-timer/safe-timer';

/**
 * Toast renderer used by {@link ToastService}. Do not place this selector in templates.
 *
 * @example
 * this.toast.success('Saved');
 */
@Component({
  selector: 'base-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  /** Timers cancelled automatically on destroy — see utils/safe-timer. */
  private readonly timers = injectTimers();
  readonly toasts = signal<ToastItem[]>([]);

  addToast(toast: ToastItem) {
    this.toasts.set([...this.toasts(), toast]);
  }

  removeToast(id: number) {
    this.toasts.set(this.toasts().map(t => t.id === id ? { ...t, removing: true } : t));
  }

  cleanToast(id: number) {
    this.toasts.set(this.toasts().filter(t => t.id !== id));
  }

  dismissToast(toast: ToastItem): void {
    this.removeToast(toast.id);
    this.timers.setTimeout(() => this.cleanToast(toast.id), 300);
  }

  readonly positionGroups = computed(() => {
    const positions = new Map<ToastPosition, ToastItem[]>();
    for (const t of this.toasts()) {
      const list = positions.get(t.position) || [];
      list.push(t);
      positions.set(t.position, list);
    }
    return Array.from(positions.entries()).map(([position, items]) => ({ position, items }));
  });

  getContainerClasses(position: ToastPosition): string {
    const base = 'fixed z-[9999] flex flex-col gap-2 pointer-events-none';
    const positionMap: Record<ToastPosition, string> = {
      'top-right': 'top-6 right-6 items-end',
      'top-left': 'top-6 left-6 items-start',
      'top-center': 'top-6 left-1/2 -translate-x-1/2 items-center',
      'bottom-right': 'bottom-6 right-6 items-end',
      'bottom-left': 'bottom-6 left-6 items-start',
      'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 items-center'
};
    return `${base} ${positionMap[position]}`;
  }

  getToastClasses(toast: ToastItem): string {
    const base = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border transition-all duration-300 max-w-sm w-full';
    const opacityClass = toast.removing ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0';
    const colorMap: Record<string, string> = {
      'primary': 'bg-white text-slate-800 border-blue-200 dark:bg-slate-800 dark:text-slate-200 dark:border-blue-800',
      'success': 'bg-white text-slate-800 border-green-200 dark:bg-slate-800 dark:text-slate-200 dark:border-green-800',
      'danger': 'bg-white text-slate-800 border-red-200 dark:bg-slate-800 dark:text-slate-200 dark:border-red-800',
      'warning': 'bg-white text-slate-800 border-orange-200 dark:bg-slate-800 dark:text-slate-200 dark:border-orange-800',
      'accent': 'bg-white text-slate-800 border-purple-200 dark:bg-slate-800 dark:text-slate-200 dark:border-purple-800'
};
    return `${base} ${opacityClass} ${colorMap[toast.color]}`;
  }

  getIconClasses(toast: ToastItem): string {
    const base = 'w-5 h-5 min-w-5';
    const colorMap: Record<string, string> = {
      'primary': 'stroke-blue-500 dark:stroke-blue-400',
      'success': 'stroke-green-500 dark:stroke-green-400',
      'danger': 'stroke-red-500 dark:stroke-red-400',
      'warning': 'stroke-orange-500 dark:stroke-orange-400',
      'accent': 'stroke-purple-500 dark:stroke-purple-400'
};
    return `${base} ${colorMap[toast.color]}`;
  }

  getToastRole(toast: ToastItem): 'status' | 'alert' {
    return toast.color === 'danger' || toast.color === 'warning' ? 'alert' : 'status';
  }

  getCloseClasses(): string {
    return 'w-4 h-4 min-w-4 cursor-pointer stroke-slate-400 hover:stroke-slate-600 dark:stroke-slate-500 dark:hover:stroke-slate-300';
  }

  runAction(toast: ToastItem): void {
    toast.action?.onClick();
    if (toast.action?.dismiss !== false) {
      this.dismissToast(toast);
    }
  }
}
