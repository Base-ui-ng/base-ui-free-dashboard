// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../tw-merge/tw-merge';
import { PopoverPlacement } from '../types';

const GAP = 8;
let popoverIdCounter = 0;

/**
 * A self-contained popover with trigger and panel slots.
 * Place the trigger inside the `[popover-trigger]` slot; place panel content as default children.
 * The panel is a CDK overlay attached to the viewport so it stays next to the trigger
 * even inside `overflow: hidden` parents.
 *
 * @example
 * <base-popover placement="bottom-start">
 *   <button popover-trigger base-button>Open</button>
 *   <div>Panel content here</div>
 * </base-popover>
 */
@Component({
  selector: 'base-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './popover.component.html',
  host: { '[class]': 'hostCls()' },
})
export class PopoverComponent implements OnDestroy {
  private readonly isSsrSafeBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly panelId = `base-popover-panel-${++popoverIdCounter}`;

  /**
   * Extra host classes merged via `cn()`.
   * @example
   * <base-popover class="align-middle"></base-popover>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Minimum width of the overlay panel.
   * @example
   * <base-popover minWidth="280px"></base-popover>
   */
  readonly minWidth = input('200px');

  /**
   * Preferred placement relative to the trigger. Flips when there is not enough room.
   * @example
   * <base-popover placement="top-end"></base-popover>
   */
  readonly placement = input<PopoverPlacement>('bottom-start');

  readonly triggerSlot = viewChild<ElementRef<HTMLElement>>('triggerSlot');
  readonly panelTpl = viewChild<TemplateRef<unknown>>('panelTemplate');

  protected readonly hostCls = computed(() => cn('inline-block relative', this.extraClass()));

  readonly isOpen = signal(false);

  private overlayRef: OverlayRef | null = null;
  private openTimeout?: number;
  private previouslyFocused: HTMLElement | null = null;
  private runtimePlacement?: PopoverPlacement;
  private runtimeOrigin?: HTMLElement;

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  /**
   * Toggle with an optional placement override — used by `[base-popover-trigger]`.
   * Pass the external trigger element so the overlay anchors to it.
   *
   * @example
   * popover.toggleWithPlacement('bottom-end', triggerEl);
   */
  toggleWithPlacement(pl: PopoverPlacement, origin?: HTMLElement): void {
    this.runtimePlacement = pl;
    this.runtimeOrigin = origin;
    this.toggle();
  }

  open(): void {
    if (this.isOpen()) return;
    this.previouslyFocused = this.isSsrSafeBrowser
      ? (document.activeElement as HTMLElement | null)
      : null;
    this.isOpen.set(true);
    this.attachOverlay();
    if (!this.isSsrSafeBrowser) return;
    document.addEventListener('keydown', this.onKeydown);
    window.clearTimeout(this.openTimeout);
    this.openTimeout = window.setTimeout(() => {
      if (!this.isOpen()) return;
      this.focusFirstPanelElement();
    });
  }

  close(): void {
    if (this.isSsrSafeBrowser) window.clearTimeout(this.openTimeout);
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.restoreFocus();
    this.detachOverlay();
    this.runtimeOrigin = undefined;
    if (this.isSsrSafeBrowser) document.removeEventListener('keydown', this.onKeydown);
  }

  ngOnDestroy(): void {
    if (!this.isSsrSafeBrowser) return;
    this.close();
  }

  private attachOverlay(): void {
    if (!this.isSsrSafeBrowser || this.overlayRef) return;
    const origin = this.runtimeOrigin ?? this.triggerSlot()?.nativeElement;
    const template = this.panelTpl();
    if (!origin || !template) return;

    const placement = this.runtimePlacement ?? this.placement();
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(origin)
        .withFlexibleDimensions(false)
        .withPush(true)
        .withViewportMargin(GAP)
        .withPositions(this.positionsFor(placement)),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth(),
    });
    this.overlayRef.attach(new TemplatePortal(template, this.viewContainerRef));
    this.overlayRef.overlayElement.style.overflow = 'visible';
    queueMicrotask(() => {
      this.overlayRef?.backdropClick().subscribe(() => this.close());
    });
    requestAnimationFrame(() => this.overlayRef?.updatePosition());
  }

  private detachOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private positionsFor(pl: PopoverPlacement): ConnectedPosition[] {
    const map: Record<PopoverPlacement, ConnectedPosition> = {
      'bottom-start': {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: GAP,
      },
      'bottom-end': {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: GAP,
      },
      bottom: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: GAP,
      },
      'top-start': {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -GAP,
      },
      'top-end': {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: -GAP,
      },
      top: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -GAP,
      },
      left: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -GAP,
      },
      right: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: GAP,
      },
    };
    const flip: Record<PopoverPlacement, PopoverPlacement> = {
      'bottom-start': 'top-start',
      'bottom-end': 'top-end',
      bottom: 'top',
      'top-start': 'bottom-start',
      'top-end': 'bottom-end',
      top: 'bottom',
      left: 'right',
      right: 'left',
    };
    const preferred = map[pl] ?? map['bottom-start'];
    const fallback = map[flip[pl] ?? 'top-start'];
    return [preferred, fallback];
  }

  private focusFirstPanelElement(): void {
    const root = this.overlayRef?.overlayElement;
    const focusable = root?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }

  private restoreFocus(): void {
    (this.previouslyFocused ?? this.triggerSlot()?.nativeElement)?.focus();
    this.previouslyFocused = null;
  }

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
  };
}
