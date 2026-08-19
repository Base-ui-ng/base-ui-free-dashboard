// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  input,
  model,
  viewChild,
  effect,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { buttonSlideRightToLeft, openClose } from '../animations/animations';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { ToastService } from '../toast/toast.service';
import { injectTimers } from '../safe-timer/safe-timer';

/**
 * A component to display formatted code blocks with syntax highlighting and a copy-to-clipboard button.
 * Supports HTML, TypeScript, JavaScript, and Bash highlighting.
 *
 * @example
 * <base-code language="HTML" [showCode]="true">
 *   <div class="test">Hello World</div>
 * </base-code>
 */
@Component({
  selector: 'base-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconButtonDirective, ClipboardModule, TooltipDirective],
  templateUrl: './code.component.html',
  animations: [buttonSlideRightToLeft, openClose],
  host: { class: 'block' },
})
export class CodeComponent {
  /** Timers cancelled automatically on destroy — see utils/safe-timer. */
  private readonly timers = injectTimers();
  /** The programming language of the code (e.g., 'HTML', 'TypeScript', 'Bash'). Used for syntax highlighting. */
  readonly language = input('');

  /** If true, the code block is expanded and visible by default. If false, it starts collapsed. */
  readonly showCode = model(false);

  readonly contentRef = viewChild<ElementRef>('content');

  /** Tooltip label for the copy button; flips to "Copied" after a successful copy. */
  readonly copyTooltip = signal('Copy to clipboard');

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect(() => {
      const el = this.contentRef();
      // Highlighting is a browser-only visual enhancement: it rewrites innerHTML
      // and reads `dataset`, neither of which is meaningful during server render.
      if (el && this.isBrowser) {
        this.timers.setTimeout(() => this.highlight());
      }
    });
  }

  private clipboard = inject(Clipboard);
  private toastService = inject(ToastService);

  highlight() {
    if (!this.isBrowser) return;
    const content = this.contentRef();
    if (!content) return;
    const el = content.nativeElement;

    // Check if we already highlighted this element
    if (el.dataset?.highlighted === 'true') return;

    // Use textContent to preserve exact whitespaces and newlines
    const text = el.textContent || '';

    let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (this.language().toLowerCase().includes('html')) {
      // Highlight HTML attributes
      html = html.replace(
        /([a-zA-Z\-]+)=(&quot;|"|')(.*?)\2/g,
        '<span class="text-slate-400">$1</span>=$2<span class="text-cyan-400">$3</span>$2',
      );
      // Highlight HTML tags and their opening brackets
      html = html.replace(
        /(&lt;\/?)([a-zA-Z0-9\-]+)/g,
        '<span class="text-slate-400">$1</span><span class="text-pink-400">$2</span>',
      );
      // Highlight closing brackets
      html = html.replace(/(\/?&gt;)/g, '<span class="text-slate-400">$1</span>');
    } else if (
      this.language().toLowerCase().includes('typescript') ||
      this.language().toLowerCase().includes('javascript')
    ) {
      // Extract strings first to avoid messing up injected HTML later
      const strings: string[] = [];
      html = html.replace(/(&quot;|"|')(.*?)\1/g, (match: string) => {
        strings.push(match);
        return `__STR_${strings.length - 1}__`;
      });

      // Highlight keywords
      html = html.replace(
        /\b(import|export|from|class|const|let|var|function|return|if|else|switch|case|default|break|continue|new|try|catch|finally|throw|typeof|instanceof|void|delete|in|of|yield|await|async|implements|interface|extends)\b/g,
        '<span class="text-pink-400">$1</span>',
      );

      // Restore strings with highlight
      html = html.replace(/__STR_(\d+)__/g, (_match: string, indexStr: string) => {
        const index = parseInt(indexStr, 10);
        return `<span class="text-cyan-400">${strings[index]}</span>`;
      });
    } else if (this.language().toLowerCase().includes('bash') || this.language().toLowerCase().includes('sh')) {
      // Highlight common bash commands
      html = html.replace(/^(npm|ng|npx|node|git|cd|ls|mkdir|rm|cp|mv)\b/gm, '<span class="text-pink-400">$1</span>');
    }

    // Wrap the result in a <pre> tag to preserve formatting natively,
    // overriding margins/paddings to rely on the container's padding instead.
    el.innerHTML = `<pre class="m-0! p-0! bg-transparent! text-inherit! font-inherit whitespace-pre-wrap">${html}</pre>`;
    el.dataset.highlighted = 'true';
  }

  show() {
    this.showCode.set(!this.showCode());
  }

  copyTo() {
    const content = this.contentRef();
    if (content) {
      const text = content.nativeElement.innerText;
      this.clipboard.copy(text);
      this.copyTooltip.set('Copied');
      this.toastService.success('Code copied to clipboard!');
    }
  }

  resetCopyTooltip() {
    this.copyTooltip.set('Copy to clipboard');
  }
}
