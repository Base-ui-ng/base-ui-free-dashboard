// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { CheckboxColor } from '../types';
import { cn } from '../tw-merge/tw-merge';

/**
 * Value for {@link TriStateCheckboxComponent}: unchecked, checked, or mixed.
 */
export type TriCheckboxState = boolean | 'indeterminate';

/**
 * A checkbox that cycles unchecked → checked → indeterminate on each click.
 * Integrates with Angular Forms via ControlValueAccessor. Free tier.
 *
 * Use {@link CheckboxComponent} with `[indeterminate]` instead when a parent
 * control derives the mixed state (e.g. select-all).
 *
 * @example
 * <base-tri-state-checkbox [(ngModel)]="status">Include archived</base-tri-state-checkbox>
 *
 * @example
 * <base-tri-state-checkbox color="success" [(ngModel)]="filter">Published</base-tri-state-checkbox>
 */
@Component({
  selector: 'base-tri-state-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './tri-state-checkbox.component.html',
  host: { '[class]': 'hostCls()' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TriStateCheckboxComponent),
      multi: true,
    },
  ],
})
export class TriStateCheckboxComponent implements ControlValueAccessor {
  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-tri-state-checkbox class="mb-4" [(ngModel)]="value">Label</base-tri-state-checkbox>
   */
  readonly extraClass = input('', { alias: 'class' });

  /**
   * Semantic visual color.
   *
   * @example
   * <base-tri-state-checkbox color="danger" [(ngModel)]="value">Delete</base-tri-state-checkbox>
   */
  readonly color = input<CheckboxColor>('primary');

  /**
   * Disables the checkbox (also set by forms via `setDisabledState`).
   *
   * @example
   * <base-tri-state-checkbox [disabled]="true" [(ngModel)]="value">Locked</base-tri-state-checkbox>
   */
  readonly disabled = model(false);

  /**
   * Current tri-state value. Prefer `[(ngModel)]` / `formControlName` in forms.
   * Also supports two-way binding via `[(state)]`.
   *
   * @example
   * <base-tri-state-checkbox [(state)]="status">Status</base-tri-state-checkbox>
   */
  readonly state = model<TriCheckboxState>(false);

  /**
   * Optional accessible name for the native input when there is no visible label text.
   *
   * @example
   * <base-tri-state-checkbox [ariaLabel]="'Select row'" [(ngModel)]="rowState"></base-tri-state-checkbox>
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  protected readonly hostCls = computed(() => cn('inline-block', this.extraClass()));

  private onChange: (value: TriCheckboxState) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isChecked = computed(() => this.state() === true);
  readonly isIndeterminate = computed(() => this.state() === 'indeterminate');

  readonly checkboxClasses = computed(() =>
    cn(
      'peer mt-1 mr-2 h-4 w-4 min-w-4 max-w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800',
      'hover:border-slate-400 dark:hover:border-slate-500',
      'disabled:cursor-default disabled:opacity-50 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-600',
      {
        'checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 indeterminate:border-blue-500 indeterminate:bg-blue-500 indeterminate:hover:border-blue-600':
          this.color() === 'primary',
        'checked:border-red-500 checked:bg-red-500 checked:hover:border-red-600 indeterminate:border-red-500 indeterminate:bg-red-500 indeterminate:hover:border-red-600':
          this.color() === 'danger',
        'checked:border-green-500 checked:bg-green-500 checked:hover:border-green-600 indeterminate:border-green-500 indeterminate:bg-green-500 indeterminate:hover:border-green-600':
          this.color() === 'success',
        'checked:border-purple-500 checked:bg-purple-500 checked:hover:border-purple-600 indeterminate:border-purple-500 indeterminate:bg-purple-500 indeterminate:hover:border-purple-600':
          this.color() === 'accent',
        'checked:border-orange-500 checked:bg-orange-500 checked:hover:border-orange-600 indeterminate:border-orange-500 indeterminate:bg-orange-500 indeterminate:hover:border-orange-600':
          this.color() === 'warning',
      },
    ),
  );

  readonly ariaChecked = computed(() => {
    const s = this.state();
    if (s === 'indeterminate') {
      return 'mixed';
    }
    return s ? 'true' : 'false';
  });

  /**
   * Cycles unchecked → checked → indeterminate → unchecked.
   */
  onClick(event: Event): void {
    event.preventDefault();
    if (this.disabled()) {
      return;
    }
    const next = this.nextState(this.state());
    this.state.set(next);
    this.onChange(next);
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.state.set(this.normalize(value));
  }

  registerOnChange(fn: (value: TriCheckboxState) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private nextState(current: TriCheckboxState): TriCheckboxState {
    if (current === false) {
      return true;
    }
    if (current === true) {
      return 'indeterminate';
    }
    return false;
  }

  private normalize(value: unknown): TriCheckboxState {
    if (value === 'indeterminate' || value === 'mixed') {
      return 'indeterminate';
    }
    if (value === true || value === 'true' || value === 1) {
      return true;
    }
    return false;
  }
}
