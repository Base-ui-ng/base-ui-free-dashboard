// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Directive, ElementRef, Renderer2, OnInit, inject } from '@angular/core';

/**
 * A stylistic directive that applies monospace font and code-block styling to inline elements.
 * 
 * @example
 * Please run the <span code>npm install</span> command.
 */
@Directive({
  selector: '[code]',
})
export class CodeDirective implements OnInit {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);


  ngOnInit() {
    const classes = 'bg-slate-100 dark:bg-slate-800 text-xs rounded-md px-0.5 py-px text-pink-700 dark:text-pink-400 font-mono';
    this.renderer.setAttribute(this.el.nativeElement, 'class', classes);
  }
}
