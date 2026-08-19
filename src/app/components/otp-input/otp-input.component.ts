// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component,
  OnChanges,
  computed,
  effect,
  forwardRef,
  input,
  model,
  output,
  viewChildren,
  ElementRef,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../tw-merge/tw-merge';

/**
 * A PIN / OTP input component with individually-focusable digit boxes.
 * Integrates with Angular Forms via ControlValueAccessor.
 *
 * @example
 * <base-otp-input [length]="6" (completed)="onVerify($event)"></base-otp-input>
 */
@Component({
  selector: 'base-otp-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './otp-input.component.html',
  host: { '[class]': 'hostCls()' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OtpInputComponent), multi: true }]
})
export class OtpInputComponent implements ControlValueAccessor, OnChanges {
  readonly extraClass   = input('', { alias: 'class' });
  readonly length       = input(6);
  readonly mask = input(false, { transform: booleanAttribute });
  readonly numbersOnly = input(true, { transform: booleanAttribute });

  /** Emitted when all boxes are filled with the full code string. */
  readonly completed = output<string>();

  readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('otpBox');

  protected readonly hostCls = computed(() => cn('flex gap-2', this.extraClass()));

  readonly disabled = model(false);

  digits: string[] = [];
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges() {
    this.digits = Array.from({ length: this.length() }, () => '');
  }

  readonly boxArray = computed<number[]>(() => {
    return Array.from({ length: this.length() }, (_, i) => i);
  });

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let val = input.value;
    if (this.numbersOnly()) val = val.replace(/\D/g, '');
    val = val.slice(-1);
    this.digits[index] = val;
    input.value = val;
    if (val && index < this.length() - 1) this.focusBox(index + 1);
    this.emit();
  }

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.digits[index]) {
        this.digits[index] = '';
        const el = this.boxes()[index]?.nativeElement;
        if (el) el.value = '';
        this.emit();
      }
      if (index > 0) this.focusBox(index - 1);
      return;
    }
    if (event.key === 'ArrowLeft'  && index > 0)                this.focusBox(index - 1);
    if (event.key === 'ArrowRight' && index < this.length() - 1) this.focusBox(index + 1);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let paste = event.clipboardData?.getData('text') ?? '';
    if (this.numbersOnly()) paste = paste.replace(/\D/g, '');
    paste = paste.slice(0, this.length());
    this.digits = Array.from({ length: this.length() }, (_, i) => paste[i] ?? '');
    this.emit();
    this.focusBox(Math.min(paste.length, this.length() - 1));
  }

  private focusBox(index: number) {
    const box = this.boxes()[index]?.nativeElement;
    if (!box) return;
    box.focus();
    requestAnimationFrame(() => box.select());
  }

  private emit() {
    const value = this.digits.join('');
    this.onChange(value);
    this.onTouched();
    if (value.length === this.length() && this.digits.every(d => d !== '')) {
      this.completed.emit(value);
    }
  }

  writeValue(val: string): void {
    const chars = (val ?? '').split('').slice(0, this.length());
    this.digits = Array.from({ length: this.length() }, (_, i) => chars[i] ?? '');
  }

  registerOnChange(fn: (v: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled.set(d); }
}
