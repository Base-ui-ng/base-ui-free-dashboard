// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, Renderer2, OnInit, inject, input } from '@angular/core';

/**
 * Applies badge styling to an icon.
 * 
 * @example
 * <base-icon base-badge-icon color="danger" size="md" name="bell"></base-icon>
 */
@Directive({
  selector: '[badge-icon]',
})
export class BaseBadgeIconDirective implements OnInit {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  /** Tailwind color name (e.g., 'red', 'blue', 'green'). Defaults to 'red'. */
  readonly color = input<'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'pink' | string>();
  
  /** Numeric Tailwind spacing size for width and height (e.g., '16', '24'). Defaults to '16'. */
  readonly size = input<'12' | '16' | '20' | '24' | '28' | '32' | string>();

  ngOnInit() {
    const icon = this.el.nativeElement.classList;
    icon.add('absolute', '-top-2', '-right-2');

    const color = this.color();
    if (color) {
      this.renderer.addClass(this.el.nativeElement, `bg-${color}-500`);
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-red-500');
    }

    const size = this.size();
    if (size) {
      this.renderer.addClass(this.el.nativeElement, `h-${size}`);
      this.renderer.addClass(this.el.nativeElement, `w-${size}`);
    } else {
      this.renderer.addClass(this.el.nativeElement, 'h-4');
      this.renderer.addClass(this.el.nativeElement, 'w-4');
    }

    this.renderer.addClass(this.el.nativeElement, 'rounded-full');
    this.renderer.addClass(this.el.nativeElement, 'border-2');
    this.renderer.addClass(this.el.nativeElement, 'border-white');
    this.renderer.addClass(this.el.nativeElement, 'dark:border-slate-900');
  }
}
