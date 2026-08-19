// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { AfterViewInit, Component, OnDestroy, ViewEncapsulation, computed, input, viewChild, ElementRef, ChangeDetectorRef, inject ,
  ChangeDetectionStrategy
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { cn } from '../tw-merge/tw-merge';

/**
 * A horizontally scrollable carousel with drag-to-scroll and touch swipe.
 *
 * @example
 * <base-horizontal-carousel title="Featured">
 *   <div class="w-16 h-16">Item</div>
 * </base-horizontal-carousel>
 */
@Component({
  selector: 'base-horizontal-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconButtonDirective],
  templateUrl: './carousel.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`
    :host ::ng-deep .carousel-track > * { scroll-snap-align: start; }
    .carousel-track::-webkit-scrollbar { display: none; }
    .carousel-track { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  host: { '[class]': 'hostCls()' }
})
export class HorizontalCarouselComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  readonly extraClass = input('', { alias: 'class' });
  readonly title      = input('');

  protected readonly hostCls = computed(() => cn('block w-full', this.extraClass()));

  readonly track = viewChild<ElementRef<HTMLDivElement>>('track');

  canScrollPrev = false;
  canScrollNext = true;
  isDragging    = false;
  private startX = 0;
  private scrollLeftPos = 0;
  private touchStartX = 0;
  private touchEndX   = 0;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit() {
    this.checkScroll();
    const el = this.track()?.nativeElement;
    if (typeof window !== 'undefined' && window.ResizeObserver && el) {
      this.resizeObserver = new ResizeObserver(() => this.checkScroll());
      this.resizeObserver.observe(el);
    }
  }

  ngOnDestroy() { this.resizeObserver?.disconnect(); }

  onScroll() { this.checkScroll(); }

  checkScroll() {
    const el = this.track()?.nativeElement;
    if (!el) return;
    this.canScrollPrev = el.scrollLeft > 2;
    this.canScrollNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    this.cdr.detectChanges();
  }

  scrollNext() {
    const el = this.track()?.nativeElement;
    const child = el?.firstElementChild as HTMLElement;
    if (el && child) el.scrollBy({ left: child.offsetWidth + 16, behavior: 'smooth' });
  }

  scrollPrev() {
    const el = this.track()?.nativeElement;
    const child = el?.firstElementChild as HTMLElement;
    if (el && child) el.scrollBy({ left: -(child.offsetWidth + 16), behavior: 'smooth' });
  }

  onMouseDown(e: MouseEvent) {
    const el = this.track()?.nativeElement;
    if (!el) return;
    this.isDragging = true;
    el.classList.add('cursor-grabbing');
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeftPos = el.scrollLeft;
  }

  onMouseLeave() {
    this.isDragging = false;
    this.track()?.nativeElement.classList.remove('cursor-grabbing');
  }

  onMouseUp() {
    this.isDragging = false;
    this.track()?.nativeElement.classList.remove('cursor-grabbing');
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    const el = this.track()?.nativeElement;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft = this.scrollLeftPos - (e.pageX - el.offsetLeft - this.startX) * 1.5;
  }

  onTouchStart(e: TouchEvent) {
    if (e.changedTouches.length > 0) this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    if (e.changedTouches.length > 0) {
      this.touchEndX = e.changedTouches[0].screenX;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) { diff > 0 ? this.scrollNext() : this.scrollPrev(); }
    }
  }
}
