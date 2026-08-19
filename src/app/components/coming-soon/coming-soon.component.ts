// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

/**
 * A placeholder component used to indicate that a feature or page is under construction.
 * Displays a shimmer effect and customizable text.
 * 
 * @example
 * <base-coming-soon 
 *   title="Dashboard Analytics" 
 *   description="We're currently building advanced reporting features. Check back soon!">
 * </base-coming-soon>
 */
@Component({
  selector: 'base-coming-soon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './coming-soon.component.html',
  styles: [`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `]
})
export class ComingSoonComponent {
  /** The primary heading text to display. */
  readonly title = input<string>('');
  
  /** The secondary descriptive text providing more context. */
  readonly description = input<string>('');
}
