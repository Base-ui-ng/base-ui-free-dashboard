// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component, computed, contentChild, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { cn } from '../tw-merge/tw-merge';

/**
 * A structural container wrapping form controls.
 *
 * @example
 * <base-input-group>
 *   <base-label>Username</base-label>
 *   <input base-input type="text" formControlName="username">
 *   <base-error>Required</base-error>
 * </base-input-group>
 */
@Component({
  selector: 'base-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './input-group.component.html',
  host: { 
    '[class]': 'hostCls()',
    '(focusout)': 'onInteract()',
    '(input)': 'onInteract()'
  } 
})
export class InputGroupComponent {
  onInteract() {}
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() => cn('block w-full', this.extraClass()));

  readonly control = contentChild(NgControl);

  showErrors(): boolean {
    const ctrl = this.control();
    if (!ctrl) return false;
    return !!(ctrl.touched && ctrl.errors);
  }

  getWrapperClasses(): string {
    return cn(
      'flex items-center w-full border border-slate-300 dark:border-slate-700 rounded-lg relative bg-white dark:bg-slate-800 focus-within:border-slate-500!',
      { 'border-red-500!': this.showErrors() }
    );
  }
}
