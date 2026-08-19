// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { CommonModule } from '@angular/common';
import { Component, input, computed ,
  ChangeDetectionStrategy
} from '@angular/core';
import { SpinnerColor, SpinnerSize } from "../types";

/**
 * A standard circular loading spinner component.
 * Uses CSS animations for a smooth spinning effect.
 * 
 * @example
 * <base-spinner size="lg" color="primary"></base-spinner>
 */
@Component({
  selector: 'base-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  /** The diameter/thickness of the loading spinner. Defaults to 'md'. */
  readonly size = input<SpinnerSize>('md');
  
  /** The semantic color variant. Use 'inverted' for white spinners on dark backgrounds. */
  readonly color = input<SpinnerColor>('primary');

  readonly spinnerClasses = computed(() => {
    const classes = ['border-solid', 'animate-spin', 'rounded-full', 'block'];

    // Size
    switch (this.size()) {
      case 'sm': classes.push('w-4 h-4 border'); break;
      case 'md': classes.push('w-6 h-6 border-2'); break;
      case 'lg': classes.push('w-10 h-10 border-4'); break;
      case 'xl': classes.push('w-12 h-12 border-[5px]'); break;
      default: classes.push('w-8 h-8 border-[3px]');
    }

    // Color
    const colorMap: Record<SpinnerColor, string> = {
      'primary': 'border-blue-500 border-t-blue-100 border-r-blue-100 border-b-blue-100',
      'success': 'border-green-500 border-t-green-100 border-r-green-100 border-b-green-100',
      'danger': 'border-red-500 border-t-red-100 border-r-red-100 border-b-red-100',
      'warning': 'border-orange-500 border-t-orange-100 border-r-orange-100 border-b-orange-100',
      'accent': 'border-purple-500 border-t-purple-100 border-r-purple-100 border-b-purple-100',
      'inverted': 'border-white border-t-white/20 border-r-white/20 border-b-white/20'
    };
    classes.push(colorMap[this.color()] || colorMap['primary']);

    return classes.join(' ');
  });
}