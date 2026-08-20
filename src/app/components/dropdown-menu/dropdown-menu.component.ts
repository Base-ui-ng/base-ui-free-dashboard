// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Component,
  TemplateRef,
  viewChild,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPanel } from './dropdown-panel';
import { focusMenuItem, focusMenuItemEdge, getMenuItems } from '../a11y-keyboard/a11y-keyboard';
import { injectTimers } from '../safe-timer/safe-timer';
import { DropdownMenuStack } from '../dropdown-menu-stack/dropdown-menu-stack.service';

let dropdownMenuIdCounter = 0;

/**
 * The container component for a dropdown menu.
 * Designed to be passed into a `[base-dropdown-menu-trigger]` directive.
 *
 * @example
 * <base-dropdown-menu #myMenu size="200px">
 *   <base-dropdown-menu-item>Option 1</base-dropdown-menu-item>
 * </base-dropdown-menu>
 * <button [base-dropdown-menu-trigger]="myMenu">Open Menu</button>
 */
@Component({
  selector: 'base-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent<T> implements DropdownPanel<T> {
  /** Timers cancelled automatically on destroy — see utils/safe-timer. */
  private readonly timers = injectTimers();
  private readonly menuStack = inject(DropdownMenuStack);

  /** Optional custom width size for the dropdown container. */
  readonly size = input<string>();

  readonly templateRef = viewChild.required(TemplateRef);
  readonly menuRoot = viewChild<ElementRef<HTMLElement>>('menuRoot');

  /** Event emitted when the menu has fully closed. */
  readonly closed = output<void>();

  /** Stable id referenced by the trigger's aria-controls. */
  readonly menuId = `base-dropdown-menu-${dropdownMenuIdCounter++}`;

  readonly menuClasses = computed(() => {
    const base =
      'bg-white dark:bg-slate-800 rounded-md shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden min-w-40 outline-none';
    const size = this.size();
    return size ? `${base} w-[${size}]` : base;
  });

  /** Focus the first menu item after the overlay opens. */
  focusFirstItem(): void {
    this.timers.setTimeout(() => {
      const root = this.menuRoot()?.nativeElement;
      if (!root) return;
      root.focus();
      focusMenuItemEdge(root, 'first');
    });
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const root = this.menuRoot()?.nativeElement;
    if (!root) return;

    const active = document.activeElement as HTMLElement | null;
    const items = getMenuItems(root);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusMenuItem(root, active, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusMenuItem(root, active, -1);
        break;
      case 'Home':
        event.preventDefault();
        focusMenuItemEdge(root, 'first');
        break;
      case 'End':
        event.preventDefault();
        focusMenuItemEdge(root, 'last');
        break;
      case 'Escape':
        event.preventDefault();
        this.closed.emit();
        break;
      case 'ArrowRight': {
        // Open cascading submenu when the focused item is a submenu trigger
        const trigger = active?.closest('[role^="menuitem"]') as HTMLElement | null;
        if (trigger?.getAttribute('aria-haspopup') === 'menu') {
          event.preventDefault();
          trigger.click();
        }
        break;
      }
      case 'ArrowLeft':
        // Unwind one cascade level when this panel is a nested submenu
        if (this.menuStack.size > 1) {
          event.preventDefault();
          this.closed.emit();
        }
        break;
      case 'Tab':
        this.menuStack.closeAll(true);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          const char = event.key.toLowerCase();
          const start = items.indexOf(active!) + 1;
          for (let i = 0; i < items.length; i++) {
            const item = items[(start + i) % items.length];
            if (item.textContent?.trim().toLowerCase().startsWith(char)) {
              event.preventDefault();
              item.focus();
              break;
            }
          }
        }
        break;
    }
  }

  /**
   * Hovering a leaf item closes sibling submenus. Submenu triggers open on
   * `pointerenter` via the dropdown trigger directive.
   *
   * @example
   * // Bound on the menu root `(pointerover)`
   */
  onMenuPointerOver(event: PointerEvent): void {
    const root = this.menuRoot()?.nativeElement;
    if (!root) return;
    const item = this.closestMenuItem(event.target);
    if (!item || !root.contains(item)) return;
    if (item.getAttribute('aria-haspopup') === 'menu') return;
    this.menuStack.closeNonAncestors(item);
  }

  /**
   * Leaf item clicks dismiss the whole cascade. Submenu triggers
   * (`aria-haspopup="menu"`) and selectable / `stayOpen` items keep the parent open.
   *
   * @example
   * // Bound on the menu root `(click)`
   */
  onMenuClick(event: MouseEvent): void {
    const item = this.closestMenuItem(event.target);
    if (!item) return;

    if (item.getAttribute('aria-haspopup') === 'menu') return;
    if (this.keepsMenuOpen(item)) return;

    this.menuStack.closeAll(true);
  }

  private closestMenuItem(target: EventTarget | null): HTMLElement | null {
    return (target as HTMLElement | null)?.closest('[role^="menuitem"]') ?? null;
  }

  private keepsMenuOpen(item: HTMLElement): boolean {
    const role = item.getAttribute('role');
    return (
      item.hasAttribute('data-stay-open') ||
      role === 'menuitemcheckbox' ||
      role === 'menuitemradio'
    );
  }
}
