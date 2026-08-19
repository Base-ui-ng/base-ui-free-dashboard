// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  input,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../tw-merge/tw-merge';

/**
 * A specialized input component that features a floating label.
 *
 * @example
 * <base-floating-input label="Email Address" type="email" [(ngModel)]="email"></base-floating-input>
 */
@Component({
  selector: 'base-floating-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingInputComponent),
      multi: true
    }
  ],
  host: { '[class]': 'hostCls()' },
  templateUrl: './floating-input.component.html'
})
export class FloatingInputComponent implements ControlValueAccessor {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() => cn('block w-full', this.extraClass()));

  readonly label = input<string>('Label');
  readonly type = input<string>('text');

  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  onChange = (val: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void {
    this.value.set(val || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
