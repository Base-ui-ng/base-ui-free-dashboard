// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, input, computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { IconComponent } from '../icon/icon.component';
import { QuoteVariant } from "../types";
import { cn } from '../tw-merge/tw-merge';

/**
 * A stylized blockquote component for displaying testimonials, reviews, or pull quotes.
 * 
 * @example
 * <base-quote variant="avatar-left" authorName="John Doe" authorRole="CEO" avatarUrl="user.jpg">
 *   This is an amazing product!
 * </base-quote>
 */
@Component({
  selector: 'base-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, IconComponent],
  templateUrl: './quote.component.html'
})
export class QuoteComponent {
  /** The structural and visual layout variant of the quote. */
  readonly variant = input<QuoteVariant>('default');
  
  /** The name of the person being quoted. */
  readonly authorName = input<string>();
  
  /** The subtitle or role of the author (e.g. "CEO, Company"). */
  readonly authorRole = input<string>();
  
  /** The URL to the author's avatar image. Primarily used in 'avatar-left' variant. */
  readonly avatarUrl = input<string>();
  
  /** The semantic color name for the quote icon. Defaults to 'primary'. */
  readonly iconColor = input<'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'default' | string>('primary');

  readonly containerClass = computed(() => cn('relative',
    (this.variant() === 'default' || this.variant() === 'border-left') && 'border-l-4 border-slate-300 dark:border-slate-600 pl-4 py-1',
    this.variant() === 'avatar-left' && 'border-l-2 border-slate-200 dark:border-slate-700 pl-4',
    this.variant() === 'icon-top' && 'pt-8 px-4'
  ));

  readonly contentClass = computed(() => cn('leading-relaxed',
    (this.variant() === 'default' || this.variant() === 'border-left') && 'text-slate-600 dark:text-slate-400 italic text-base px-4',
    this.variant() === 'icon-top' && 'text-xl font-bold text-slate-900 dark:text-white mb-4'
  ));

  readonly authorClass = computed(() => cn('text-sm text-left',
    (this.variant() === 'default' || this.variant() === 'border-left') && 'mt-2 px-4'
  ));
}
