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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { cn } from '../tw-merge/tw-merge';

/**
 * A numeric input component with increment and decrement buttons.
 *
 * @example
 * <base-input-spinner [(ngModel)]="quantity" [min]="1" [max]="10"></base-input-spinner>
 */
@Component({
  selector: 'base-input-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, IconButtonDirective],
  templateUrl: './input-spinner.component.html',
  host: { '[class]': 'hostCls()' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputSpinnerComponent), multi: true }]
})
export class InputSpinnerComponent implements ControlValueAccessor {
  readonly extraClass = input('', { alias: 'class' });
  readonly classes    = input('');
  readonly min        = input(0);
  readonly max        = input(Infinity);
  readonly step       = input(1);

  protected readonly hostCls = computed(() => cn('block', this.extraClass()));

  readonly disabled = model(false);

  value = 0;
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  updateValue(add: boolean) {
    if (this.disabled()) return;
    const next = this.value + (add ? this.step() : -this.step());
    if (next >= this.min() && next <= this.max()) {
      this.value = next;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  onInputChange(e: Event) {
    let n = Number((e.target as HTMLInputElement).value);
    if (!isNaN(n)) {
      n = Math.max(this.min(), Math.min(this.max(), n));
      this.value = n;
      this.onChange(n);
      this.onTouched();
    } else {
      (e.target as HTMLInputElement).value = String(this.value);
    }
  }

  writeValue(v: unknown) { this.value = typeof v === 'number' ? v : 0; }
  registerOnChange(fn: (v: number) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void)         { this.onTouched = fn; }
  setDisabledState(d: boolean)              { this.disabled.set(d); }
}
