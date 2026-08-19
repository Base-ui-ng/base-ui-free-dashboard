// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { DropdownPanel } from '../dropdown-menu/dropdown-panel';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { DropdownPlacement } from '../types';
import {
  DropdownMenuStack,
  DropdownMenuStackEntry,
} from '../dropdown-menu-stack/dropdown-menu-stack.service';

/**
 * A directive that attaches a `base-dropdown-menu` to a trigger element (like a button).
 * Automatically handles overlay positioning, backdrop clicks, and detachment.
 * Supports cascading submenus: put `[base-dropdown-menu-trigger]` on a menu item with
 * `placement="right"` (or `left`) to open a nested menu without closing the parent.
 *
 * @example
 * <button [base-dropdown-menu-trigger]="myMenu" placement="end">Open</button>
 * <base-dropdown-menu #myMenu>
 *   <base-dropdown-menu-item>Action</base-dropdown-menu-item>
 * </base-dropdown-menu>
 *
 * @example
 * <!-- Cascading submenu -->
 * <button base-dropdown-menu-item [base-dropdown-menu-trigger]="sub" placement="right">More</button>
 * <base-dropdown-menu #sub>
 *   <base-dropdown-menu-item>Nested action</base-dropdown-menu-item>
 * </base-dropdown-menu>
 */
@Directive({
  selector: '[base-dropdown-menu-trigger]',
  host: {
    '(click)': 'onTriggerClick($event)',
  },
})
export class DropdownMenuDirective<T> implements OnDestroy, DropdownMenuStackEntry {
  private isDropdownOpen = false;
  private overlayRef?: OverlayRef;
  private closingSubscription = Subscription.EMPTY;

  /** The physical placement of the dropdown relative to the trigger. Defaults to 'end'. */
  readonly placement = input<DropdownPlacement>('end');

  /** The reference to the `base-dropdown-menu` component to open. */
  readonly dropdownPanel = input.required<DropdownPanel<T>>({
    alias: 'base-dropdown-menu-trigger',
  });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private readonly menuStack = inject(DropdownMenuStack);

  @HostBinding('attr.aria-haspopup') readonly ariaHasPopup = 'menu';

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): boolean {
    return this.isDropdownOpen;
  }

  /**
   * Whether the linked dropdown panel is currently open.
   *
   * @example
   * if (trigger.isOpen) { … }
   */
  get isOpen(): boolean {
    return this.isDropdownOpen;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string | null {
    const panel = this.dropdownPanel();
    return panel instanceof DropdownMenuComponent ? panel.menuId : null;
  }

  /**
   * Toggle on click. Stops propagation so a parent menu does not treat this
   * as a leaf item selection when this trigger is itself a menu item.
   *
   * @example
   * // Bound via host `(click)`
   */
  onTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDropdownOpen ? this.menuStack.closeFrom(this, true) : this.openDropdown();
  }

  @HostListener('keydown', ['$event'])
  onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        if (!this.isDropdownOpen) {
          event.preventDefault();
          event.stopPropagation();
          this.openDropdown();
        }
        break;
      case 'ArrowRight':
        if (!this.isDropdownOpen && (this.placement() === 'right' || this.isNestedTrigger())) {
          event.preventDefault();
          event.stopPropagation();
          this.openDropdown();
        }
        break;
      case 'ArrowLeft':
        if (!this.isDropdownOpen && this.placement() === 'left') {
          event.preventDefault();
          event.stopPropagation();
          this.openDropdown();
        } else if (this.isDropdownOpen && this.isNestedTrigger()) {
          event.preventDefault();
          event.stopPropagation();
          this.menuStack.closeFrom(this, true);
        }
        break;
      case 'Escape':
        if (this.isDropdownOpen) {
          event.preventDefault();
          this.menuStack.closeFrom(this, true);
        }
        break;
    }
  }

  /**
   * Whether this trigger sits inside an already-open dropdown overlay (submenu).
   *
   * @example
   * if (this.isNestedTrigger()) { … }
   */
  private isNestedTrigger(): boolean {
    return !!this.elementRef.nativeElement.closest('.cdk-overlay-pane');
  }

  /**
   * Open the linked dropdown panel (no-op if already open).
   *
   * @example
   * trigger.openDropdown();
   */
  openDropdown(): void {
    const dropdownPanel = this.dropdownPanel();
    if (!dropdownPanel || this.isDropdownOpen) return;

    // Drop sibling / unrelated menus; keep ancestor cascade intact
    this.menuStack.closeNonAncestors(this.elementRef.nativeElement);

    const nested = this.isNestedTrigger();
    const positions: ConnectedPosition[] = this.getPositions();

    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      // Only the root menu needs a backdrop; nested menus share the root dismiss target
      hasBackdrop: !nested,
      backdropClass: 'bg-transparent',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(positions)
        .withPush(false),
    });

    const templatePortal = new TemplatePortal(
      dropdownPanel.templateRef(),
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);
    this.menuStack.push(this);

    if (dropdownPanel instanceof DropdownMenuComponent) {
      dropdownPanel.focusFirstItem();
    }

    // Escape (and panel-driven close) unwinds from this level downward
    this.closingSubscription = outputToObservable(dropdownPanel.closed).subscribe(() => {
      this.menuStack.closeFrom(this, true);
    });

    // Root backdrop dismisses the entire cascade
    if (!nested) {
      this.closingSubscription.add(
        this.overlayRef.backdropClick().subscribe(() => this.menuStack.closeAll(true))
      );
    }
  }

  /** @inheritdoc */
  containsElement(el: Element): boolean {
    return !!this.overlayRef?.overlayElement?.contains(el);
  }

  /**
   * Detach this overlay only. Used by {@link DropdownMenuStack}.
   *
   * @example
   * entry.closeOverlay(true);
   */
  closeOverlay(restoreFocus = false): void {
    this.destroyDropdown(restoreFocus);
  }

  private getPositions(): ConnectedPosition[] {
    const defaultPosition: ConnectedPosition = {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 4,
    };

    const maps: Record<string, ConnectedPosition> = {
      start: { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      end: { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
      left: { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -4 },
      right: { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 4 },
      'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
    };

    return [maps[this.placement()] || defaultPosition];
  }

  private destroyDropdown(restoreFocus = false): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.closingSubscription.unsubscribe();
    this.closingSubscription = Subscription.EMPTY;
    this.isDropdownOpen = false;
    this.menuStack.pop(this);
    this.overlayRef.detach();

    if (restoreFocus) {
      this.elementRef.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.menuStack.pop(this);
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
    this.closingSubscription.unsubscribe();
    this.isDropdownOpen = false;
  }
}
