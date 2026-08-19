// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { BaseButtonDirective } from '../button/base-button.directive';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-billing',
  standalone: true,
  imports: [
    CommonModule, CardComponent,
    InputGroupComponent, LabelComponent, BaseInputDirective,
    BaseButtonDirective, BadgeComponent, IconComponent
  ],
  templateUrl: './form-billing.component.html'
})
export class FormBillingComponent {
  selectedPlan = signal<string>('pro');
  seats = signal<number>(5);

  selectPlan(plan: string) {
    this.selectedPlan.set(plan);
  }

  increment() {
    this.seats.update(s => Math.min(s + 1, 100));
  }

  decrement() {
    this.seats.update(s => Math.max(s - 1, 1));
  }
}
