// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component,
  computed,
  forwardRef,
  input,
  model,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { cn } from '../tw-merge/tw-merge';

/**
 * A native HTML `<select>` wrapper component.
 *
 * @example
 * <base-select [(ngModel)]="selectedValue" placeholder="Select an option">
 *   <option value="1">Option 1</option>
 * </base-select>
 */
@Component({
  selector: 'base-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './select.component.html',
  host: { '[class]': 'hostCls()' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }]
})
export class SelectComponent implements ControlValueAccessor {
  readonly extraClass   = input('', { alias: 'class' });
  readonly placeholder  = input('');
  readonly size = input<'sm' | 'default' | 'xl'>('default');

  protected readonly hostCls = computed(() => cn('relative block', this.extraClass()));

  readonly disabled = model(false);

  value: unknown;
  private onChange: (v: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  onSelectChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(v: unknown)                  { this.value = v; }
  registerOnChange(fn: (v: unknown) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void)        { this.onTouched = fn; }
  setDisabledState(d: boolean)             { this.disabled.set(d); }
}
