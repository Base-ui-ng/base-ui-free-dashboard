// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, computed, signal, ChangeDetectionStrategy} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { BaseButtonDirective } from '../button/base-button.directive';
import { IconComponent } from '../icon/icon.component';
import { BaseAddonEndDirective } from '../input-group/base-addon-end.directive';
import { BaseAddonStartDirective } from '../input-group/base-addon-start.directive';

interface FilterChip {
  label: string;
  active: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-filter',
  standalone: true,
  imports: [
    CardComponent,
    InputGroupComponent, LabelComponent, BaseInputDirective,
    BaseButtonDirective, IconComponent, BaseAddonEndDirective, BaseAddonStartDirective
  ],
  templateUrl: './form-filter.component.html'
})
export class FormFilterComponent {
  readonly statuses = signal<FilterChip[]>([
    { label: 'Active', active: true },
    { label: 'Pending', active: false },
    { label: 'Inactive', active: false },
    { label: 'Draft', active: true },
  ]);

  readonly tags = signal<FilterChip[]>([
    { label: 'Frontend', active: true },
    { label: 'Backend', active: false },
    { label: 'Design', active: false },
    { label: 'Marketing', active: false },
    { label: 'Mobile', active: true },
  ]);

  readonly activeCount = computed(() =>
    this.statuses().filter((s) => s.active).length + this.tags().filter((t) => t.active).length
  );

  toggleStatus(i: number) {
    this.statuses.update((items) =>
      items.map((item, index) => index === i ? { ...item, active: !item.active } : item)
    );
  }

  toggleTag(i: number) {
    this.tags.update((items) =>
      items.map((item, index) => index === i ? { ...item, active: !item.active } : item)
    );
  }

  clearAll() {
    this.statuses.update((items) => items.map((item) => ({ ...item, active: false })));
    this.tags.update((items) => items.map((item) => ({ ...item, active: false })));
  }
}
