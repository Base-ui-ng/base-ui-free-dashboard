// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import { Component,
  OnDestroy,
  computed,
  contentChildren,
  effect,
  input,
  ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

import { outputToObservable } from '@angular/core/rxjs-interop';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cn } from '../tw-merge/tw-merge';

/**
 * A container component for accordion items.
 *
 * @example
 * <base-accordion [multi]="false">
 *   <base-accordion-item>...</base-accordion-item>
 * </base-accordion>
 */
@Component({
  selector: 'base-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './accordion.component.html',
  host: { '[class]': 'hostCls()' }
})
export class AccordionComponent implements OnDestroy {
  readonly extraClass = input('', { alias: 'class' });
  readonly multi = input(false, { transform: booleanAttribute });

  readonly items = contentChildren(AccordionItemComponent);

  protected readonly hostCls = computed(() =>
    cn(
      'overflow-hidden flex flex-col rounded-xl border border-slate-300 dark:border-slate-700',
      this.extraClass()
    )
  );

  private itemDestroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const items = this.items();
      this.setupItems(items);
    });
  }

  private setupItems(items: readonly AccordionItemComponent[]) {
    this.itemDestroy$.next();
    items.forEach(item => {
      // outputToObservable converts OutputEmitterRef → Observable so we can use rxjs operators
      outputToObservable(item.toggled)
        .pipe(takeUntil(this.itemDestroy$))
        .subscribe(isOpen => {
          if (isOpen && !this.multi()) this.closeAllExcept(item);
        });
    });
  }

  closeAllExcept(exceptItem: AccordionItemComponent): void {
    this.items().forEach(item => {
      if (item !== exceptItem) item.isOpen.set(false);
    });
  }

  ngOnDestroy() {
    this.itemDestroy$.next();
    this.itemDestroy$.complete();
  }
}
