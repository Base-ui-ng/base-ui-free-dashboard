// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { IconButtonColor, IconButtonSize, ScrollButtonPosition } from '../types';
import {
  ScrollContainerTarget,
  getScrollMetrics,
  listenScroll,
  resolveScrollContainer,
  scrollContainerTo,
} from '../scroll-container/scroll-container';
import { cn } from '../tw-merge/tw-merge';

/**
 * Shared scroll FAB behavior for {@link ScrollTopComponent} / {@link ScrollBottomComponent}.
 */
@Directive()
export abstract class ScrollButtonBase implements OnDestroy {
  protected readonly host = inject(ElementRef<HTMLElement>);

  /**
   * Scroll container: `'window'`, `'nearest'` (closest scrollable ancestor), or a CSS selector.
   *
   * @example
   * <base-scroll-top target="#panel"></base-scroll-top>
   */
  readonly target = input<ScrollContainerTarget>('window');

  /**
   * Pixels of scroll before the button becomes visible.
   *
   * @example
   * <base-scroll-top [threshold]="200"></base-scroll-top>
   */
  readonly threshold = input(400, { transform: numberAttribute });

  /**
   * Semantic color for the icon button.
   *
   * @example
   * <base-scroll-top color="primary"></base-scroll-top>
   */
  readonly color = input<IconButtonColor | string>('primary');

  /**
   * Size of the icon button.
   *
   * @example
   * <base-scroll-top size="lg"></base-scroll-top>
   */
  readonly size = input<IconButtonSize>('lg');

  /**
   * Corner placement of the floating button.
   *
   * @example
   * <base-scroll-top position="bottom-left"></base-scroll-top>
   */
  readonly position = input<ScrollButtonPosition>('bottom-right');

  /**
   * When true (default), uses `position: fixed` against the viewport.
   * Set false for `absolute` placement inside a `relative` parent.
   *
   * @example
   * <base-scroll-top [fixed]="false"></base-scroll-top>
   */
  readonly fixed = input(true, { transform: booleanAttribute });

  /**
   * Scroll behavior passed to `scrollTo`.
   *
   * @example
   * <base-scroll-top behavior="auto"></base-scroll-top>
   */
  readonly behavior = input<ScrollBehavior>('smooth');

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-scroll-top class="!bottom-20"></base-scroll-top>
   */
  readonly extraClass = input('', { alias: 'class' });

  /** Whether the button should be shown. */
  readonly visible = signal(false);

  private unlisten: (() => void) | null = null;
  private boundTarget: ScrollContainerTarget | null = null;

  constructor() {
    afterNextRender(() => this.rebind());
  }

  /** Merged host classes (position, visibility, consumer `class`). */
  readonly hostClass = computed(() => {
    const pos = this.positionClasses();
    const layer = this.fixed() ? 'fixed' : 'absolute';
    const visibility = this.visible()
      ? 'opacity-100 translate-y-0 pointer-events-auto'
      : 'opacity-0 translate-y-1 pointer-events-none';
    return cn(
      layer,
      'z-50 transition-all duration-200',
      pos,
      visibility,
      this.extraClass()
    );
  });

  protected abstract shouldShow(scrollTop: number, maxScroll: number, threshold: number): boolean;
  protected abstract destinationTop(scrollHeight: number, clientHeight: number): number;

  /** Smoothly scroll to the component's destination. */
  scroll(): void {
    const container = resolveScrollContainer(this.target(), this.host.nativeElement);
    const { scrollHeight, clientHeight } = getScrollMetrics(container);
    scrollContainerTo(container, this.destinationTop(scrollHeight, clientHeight), this.behavior());
  }

  ngOnDestroy(): void {
    this.unlisten?.();
    this.unlisten = null;
  }

  private rebind(): void {
    this.unlisten?.();
    this.boundTarget = this.target();
    const container = resolveScrollContainer(this.boundTarget, this.host.nativeElement);
    const update = () => this.updateVisibility(container);
    this.unlisten = listenScroll(container, update);
    update();
  }

  private updateVisibility(container: HTMLElement | Window): void {
    // Re-resolve if the target input changed after first bind.
    if (this.target() !== this.boundTarget) {
      this.rebind();
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = getScrollMetrics(container);
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    this.visible.set(this.shouldShow(scrollTop, maxScroll, Number(this.threshold()) || 0));
  }

  private positionClasses(): string {
    const map: Record<ScrollButtonPosition, string> = {'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
    };
    return map[this.position()] ?? map['bottom-right'];
  }
}
