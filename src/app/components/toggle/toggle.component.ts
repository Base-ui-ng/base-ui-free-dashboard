// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md


import { Component, forwardRef, input, model, computed ,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ToggleColor, ToggleSize, ToggleShape } from "../types";

/**
 * A highly customizable toggle/switch component.
 * Integrates natively with Angular Forms (`ngModel` and `formControlName`).
 * 
 * @example
 * <base-toggle [(ngModel)]="isActive" color="success" size="lg" shape="rounded"></base-toggle>
 */
@Component({
  selector: 'base-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
}]
})
export class ToggleComponent implements ControlValueAccessor {
  /** The semantic color variant applied when the toggle is checked. */
  readonly color = input<ToggleColor>('primary');
  
  /** The physical size of the toggle switch. */
  readonly size = input<ToggleSize>('md');
  
  /** The border-radius style of the toggle track and thumb. */
  readonly shape = input<ToggleShape>('smooth');

  /**
   * Accessible name applied to the underlying checkbox input, for cases where
   * the toggle has no adjacent visible text label (e.g. a standalone switch).
   *
   * @example
   * <base-toggle aria-label="Two-factor authentication"></base-toggle>
   */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Disables the toggle, preventing interaction. */
  readonly disabled = model(false);
  
  /** The current checked/unchecked state. */
  readonly checked = model(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  readonly containerClasses = computed(() => {
    const base = 'cursor-pointer inline-block relative transition-all duration-300';
    const sizeMap: Record<ToggleSize, string> = {
      'sm': 'h-5 w-9',
      'md': 'h-6 w-11',
      'lg': 'h-7 w-[52px]'
};
    return `${base} ${sizeMap[this.size()] || sizeMap['md']}`;
  });

  readonly trackClasses = computed(() => {
    const base = 'absolute inset-0 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-700 z-0 transition-all duration-300 peer-disabled:opacity-50 peer-disabled:cursor-default';
    
    const shapeMap: Record<ToggleShape, string> = {
      'rounded': 'rounded-full',
      'smooth': 'rounded-lg',
      'square': 'rounded-md'
};

    const colorMap: Record<string, string> = {
      'primary': 'peer-checked:bg-blue-500 peer-checked:border-blue-500 dark:peer-checked:bg-blue-500 dark:peer-checked:border-blue-500',
      'danger': 'peer-checked:bg-red-500 peer-checked:border-red-500 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500',
      'success': 'peer-checked:bg-green-500 peer-checked:border-green-500 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500',
      'accent': 'peer-checked:bg-purple-500 peer-checked:border-purple-500 dark:peer-checked:bg-purple-500 dark:peer-checked:border-purple-500',
      'warning': 'peer-checked:bg-orange-500 peer-checked:border-orange-500 dark:peer-checked:bg-orange-500 dark:peer-checked:border-orange-500'
    };
    
    return `${base} ${shapeMap[this.shape()] || shapeMap['smooth']} ${colorMap[this.color()] || colorMap['primary']}`;
  });

  readonly thumbClasses = computed(() => {
    const base = 'bg-white absolute left-0.5 top-0.5 transform transition-all duration-300 peer-disabled:cursor-default';
    
    const shapeMap: Record<ToggleShape, string> = {
      'rounded': 'rounded-full',
      'smooth': 'rounded-md',
      'square': 'rounded'
};

    const sizeMap: Record<ToggleSize, string> = {
      'sm': 'h-4 w-4 peer-checked:translate-x-4',
      'md': 'h-5 w-5 peer-checked:translate-x-5',
      'lg': 'h-6 w-6 peer-checked:translate-x-6'
};

    return `${base} ${shapeMap[this.shape()] || shapeMap['smooth']} ${sizeMap[this.size()] || sizeMap['md']}`;
  });

  onToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
    this.onChange(this.checked());
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
