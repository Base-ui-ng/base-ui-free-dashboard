// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { BaseButtonDirective } from '../button/base-button.directive';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-wizard',
  standalone: true,
  imports: [
    CardComponent,
    InputGroupComponent, LabelComponent, BaseInputDirective,
    BaseButtonDirective, BadgeComponent, IconComponent, CheckboxComponent
  ],
  templateUrl: './form-wizard.component.html'
})
export class FormWizardComponent {
  currentStep = signal<number>(0);
  selectedPlan = signal<string>('pro');

  steps = [
    { label: 'Account' },
    { label: 'Plan' },
    { label: 'Confirm' }];

  next() {
    if (this.currentStep() < 2) {
      this.currentStep.update(s => s + 1);
    }
  }

  back() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  selectPlan(plan: string) {
    this.selectedPlan.set(plan);
  }
}
