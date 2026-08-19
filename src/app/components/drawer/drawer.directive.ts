// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Directive,
  OnDestroy,
  ViewContainerRef,
  inject,
  input
} from '@angular/core';
import { DrawerPanel } from './drawer-panel';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Subscription } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';

/**
 * A directive that attaches a `base-drawer` to a trigger element (like a button).
 * Automatically handles the overlay backdrop and click-to-open behavior.
 * 
 * @example
 * <base-drawer #myDrawer position="right">Drawer Content</base-drawer>
 * <button [base-drawer]="myDrawer">Open Drawer</button>
 */
@Directive({
  selector: '[base-drawer]',
  host: {
    '(click)': 'toggleDrawer()',
  },
})
export class DrawerDirective<T> implements OnDestroy {
  private isDrawerOpen = false;
  private overlayRef?: OverlayRef;
  private closingSubscription = Subscription.EMPTY;

  /** The edge of the screen to slide the drawer in from. */
  readonly placement = input('right');
  
  /** The reference to the `base-drawer` component to open. */
  readonly drawerPanel = input.required<DrawerPanel<T>>({ alias: "base-drawer" });

  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  toggleDrawer(): void {
    this.isDrawerOpen ? this.destroyDrawer() : this.openDrawer();
  }

  openDrawer(): void {
    const drawerPanel = this.drawerPanel();
    if (!drawerPanel) return;

    this.isDrawerOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: ['bg-slate-300/50', 'dark:bg-slate-800/80', 'backdrop-blur-[8px]'],
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const templatePortal = new TemplatePortal(
      drawerPanel.templateRef(),
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);

    this.closingSubscription = merge(
      this.overlayRef.backdropClick(),
      this.overlayRef.detachments(),
      outputToObservable(drawerPanel.closed)
    ).subscribe(() => this.destroyDrawer());
  }

  private destroyDrawer(): void {
    if (!this.overlayRef || !this.isDrawerOpen) {
      return;
    }

    this.closingSubscription.unsubscribe();
    this.isDrawerOpen = false;
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.closingSubscription.unsubscribe();
  }
}
