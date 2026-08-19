// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DualRangeValue, SliderColor } from '../types';
import { cn } from '../tw-merge/tw-merge';

/**
 * A dual-thumb range slider for selecting a numeric span (e.g. 20–60 within 10–100).
 * Implements ControlValueAccessor for `ngModel` / reactive forms.
 *
 * @example
 * <base-dual-range-slider [(ngModel)]="priceRange" [min]="10" [max]="100"></base-dual-range-slider>
 * <base-dual-range-slider color="success" [showValue]="true" [(ngModel)]="ages"></base-dual-range-slider>
 */
@Component({
  selector: 'base-dual-range-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dual-range-slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualRangeSliderComponent),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClass()',
  },
  styles: [
    `
      :host input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        pointer-events: none;
      }
      :host input[type='range']::-webkit-slider-runnable-track {
        background: transparent;
        height: 0.375rem;
      }
      :host input[type='range']::-moz-range-track {
        background: transparent;
        height: 0.375rem;
        border: none;
      }
      :host input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        pointer-events: auto;
        height: 1rem;
        width: 1rem;
        margin-top: -0.3125rem;
        border-radius: 9999px;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
        cursor: pointer;
        background: var(--base-dual-thumb);
      }
      :host input[type='range']::-moz-range-thumb {
        pointer-events: auto;
        height: 1rem;
        width: 1rem;
        border-radius: 9999px;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
        cursor: pointer;
        background: var(--base-dual-thumb);
      }
      :host input[type='range']:disabled::-webkit-slider-thumb {
        cursor: default;
        opacity: 0.6;
      }
      :host input[type='range']:disabled::-moz-range-thumb {
        cursor: default;
        opacity: 0.6;
      }
    `,
  ],
})
export class DualRangeSliderComponent implements ControlValueAccessor {
  /**
   * Lower bound of the track.
   *
   * @example
   * <base-dual-range-slider [min]="10" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly min = input(0, { transform: numberAttribute });

  /**
   * Upper bound of the track.
   *
   * @example
   * <base-dual-range-slider [max]="100" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly max = input(100, { transform: numberAttribute });

  /**
   * Step increment between selectable values.
   *
   * @example
   * <base-dual-range-slider [step]="5" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly step = input(1, { transform: numberAttribute });

  /**
   * Accent color for the selected span and thumbs.
   *
   * @example
   * <base-dual-range-slider color="success" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly color = input<SliderColor>('primary');

  /**
   * Disables both thumbs. Also set by forms via `setDisabledState`.
   *
   * @example
   * <base-dual-range-slider [disabled]="true" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly disabled = model(false);

  /**
   * Always show the selected start–end label after the track.
   *
   * @example
   * <base-dual-range-slider [showValue]="true" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly showValue = input(false, { transform: booleanAttribute });

  /**
   * Show the track min/max labels beside the slider.
   *
   * @example
   * <base-dual-range-slider [showMinMax]="true" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly showMinMax = input(false, { transform: booleanAttribute });

  /**
   * When true (default), hover/focus shows value tips above each thumb.
   *
   * @example
   * <base-dual-range-slider [showTip]="false" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly showTip = input(true, { transform: booleanAttribute });

  /**
   * Accessible name for the control group.
   *
   * @example
   * <base-dual-range-slider ariaLabel="Price range" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly ariaLabel = input('Range');

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-dual-range-slider class="mb-4" [(ngModel)]="range"></base-dual-range-slider>
   */
  readonly extraClass = input('', { alias: 'class' });

  readonly start = signal(20);
  readonly end = signal(80);
  readonly activeThumb = signal<'start' | 'end' | null>(null);

  private onChange: (value: DualRangeValue) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly hostClass = computed(() => cn('block w-full', this.extraClass()));

  protected readonly thumbCssVar = computed(() => {
    const map: Record<SliderColor, string> = {
      primary: 'rgb(59 130 246)',
      success: 'rgb(34 197 94)',
      danger: 'rgb(239 68 68)',
      warning: 'rgb(249 115 22)',
      accent: 'rgb(168 85 247)',
    };
    return map[this.color()];
  });

  protected readonly fillClass = computed(() =>
    cn('absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full', {
      'bg-blue-500': this.color() === 'primary',
      'bg-green-500': this.color() === 'success',
      'bg-red-500': this.color() === 'danger',
      'bg-orange-500': this.color() === 'warning',
      'bg-purple-500': this.color() === 'accent',
    })
  );

  protected readonly tipBubbleClass = computed(() =>
    cn(
      'whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold tabular-nums text-white shadow-md',
      {
        'bg-blue-600 dark:bg-blue-500': this.color() === 'primary',
        'bg-green-600 dark:bg-green-500': this.color() === 'success',
        'bg-red-600 dark:bg-red-500': this.color() === 'danger',
        'bg-orange-600 dark:bg-orange-500': this.color() === 'warning',
        'bg-purple-600 dark:bg-purple-500': this.color() === 'accent',
      }
    )
  );

  protected readonly tipCaretClass = computed(() =>
    cn('h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px]', {
      'border-t-blue-600 dark:border-t-blue-500': this.color() === 'primary',
      'border-t-green-600 dark:border-t-green-500': this.color() === 'success',
      'border-t-red-600 dark:border-t-red-500': this.color() === 'danger',
      'border-t-orange-600 dark:border-t-orange-500': this.color() === 'warning',
      'border-t-purple-600 dark:border-t-purple-500': this.color() === 'accent',
    })
  );

  protected readonly startPercent = computed(() => this.toPercent(this.start()));
  protected readonly endPercent = computed(() => this.toPercent(this.end()));
  protected readonly rangePercent = computed(() =>
    Math.max(0, this.endPercent() - this.startPercent())
  );

  protected readonly startZ = computed(() => {
    if (this.activeThumb() === 'start') return 30;
    return this.startPercent() > 50 ? 20 : 10;
  });

  protected readonly endZ = computed(() => {
    if (this.activeThumb() === 'end') return 30;
    return this.endPercent() <= 50 ? 20 : 10;
  });

  protected readonly tipVisibleClass = computed(() =>
    cn(
      'pointer-events-none absolute bottom-0 z-40 flex -translate-x-1/2 flex-col items-center',
      'opacity-0 scale-95 transition-all duration-150 ease-out',
      'group-hover/dual:opacity-100 group-hover/dual:scale-100',
      'group-focus-within/dual:opacity-100 group-focus-within/dual:scale-100',
      this.activeThumb() ? 'opacity-100 scale-100' : null
    )
  );

  protected readonly displayStart = computed(() => this.formatValue(this.start()));
  protected readonly displayEnd = computed(() => this.formatValue(this.end()));
  protected readonly displayRange = computed(
    () => `${this.displayStart()} – ${this.displayEnd()}`
  );

  private toPercent(value: number): number {
    const min = this.min();
    const max = this.max();
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }

  private formatValue(value: number): string {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  private clamp(value: number): number {
    const min = this.min();
    const max = this.max();
    const step = this.step() || 1;
    const snapped = Math.round((value - min) / step) * step + min;
    return Math.min(max, Math.max(min, snapped));
  }

  private emit(): void {
    this.onChange({ start: this.start(), end: this.end() });
  }

  onStartInput(event: Event): void {
    if (this.disabled()) return;
    const raw = Number((event.target as HTMLInputElement).value);
    const next = Math.min(this.clamp(raw), this.end());
    this.start.set(next);
    this.activeThumb.set('start');
    this.emit();
  }

  onEndInput(event: Event): void {
    if (this.disabled()) return;
    const raw = Number((event.target as HTMLInputElement).value);
    const next = Math.max(this.clamp(raw), this.start());
    this.end.set(next);
    this.activeThumb.set('end');
    this.emit();
  }

  onThumbFocus(thumb: 'start' | 'end'): void {
    this.activeThumb.set(thumb);
  }

  onThumbBlur(): void {
    this.activeThumb.set(null);
    this.onTouched();
  }

  writeValue(val: DualRangeValue | null | undefined): void {
    const min = this.min();
    const max = this.max();
    if (!val || typeof val !== 'object') {
      const mid = (min + max) / 2;
      const span = (max - min) * 0.3;
      this.start.set(this.clamp(mid - span / 2));
      this.end.set(this.clamp(mid + span / 2));
      return;
    }
    let start = this.clamp(Number(val.start));
    let end = this.clamp(Number(val.end));
    if (Number.isNaN(start)) start = min;
    if (Number.isNaN(end)) end = max;
    if (start > end) {
      const tmp = start;
      start = end;
      end = tmp;
    }
    this.start.set(start);
    this.end.set(end);
  }

  registerOnChange(fn: (value: DualRangeValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
