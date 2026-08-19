// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, HostListener, output } from '@angular/core';

/**
 * A structural directive that wraps elements inside a slider/carousel, adding touch-swipe support.
 *
 * @example
 * <div baseSlider (slideAction)="onSlide($event)">
 *   <div>Slide content</div>
 * </div>
 */
@Directive({
  selector: '[baseSlider]',
})
export class SliderDirective {
  private threshold = 50;
  private startX: number | null = null;
  
  /**
     * The slideAction output property.
     * @example slideAction="value"
     */
    readonly slideAction = output<boolean>();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (this.startX === null) return;
    
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - this.startX;
    this.startX = null;

    if (deltaX > this.threshold) {
      this.slideAction.emit(true);
    } else if (deltaX < -this.threshold) {
      this.slideAction.emit(false);
    }
  }
}
