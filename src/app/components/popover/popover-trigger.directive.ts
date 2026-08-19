// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, HostListener, OnDestroy, inject, input } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { PopoverPlacement } from '../types';

/**
 * Alternative external trigger for `base-popover`.
 * Use this when the trigger button must live outside the `<base-popover>` element.
 *
 * @example
 * <base-popover #myPop placement="bottom-start">Panel content</base-popover>
 * <button [base-popover-trigger]="myPop" placement="bottom-end">Open</button>
 */
@Directive({
  selector: '[base-popover-trigger]',
})
export class PopoverTriggerDirective implements OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly popover = input.required<PopoverComponent>({ alias: "base-popover-trigger" });
  readonly placement = input<PopoverPlacement>('bottom-start');

  @HostListener('click')
  onClick() {
    const popover = this.popover();
    if (!popover) return;
    popover.toggleWithPlacement(this.placement(), this.el.nativeElement);
  }

  ngOnDestroy() { this.popover()?.close(); }
}
