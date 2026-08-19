// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CardBodyComponent } from '../card/card-body/card-body.component';
import { IconComponent } from '../icon/icon.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BaseButtonDirective } from '../button/base-button.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-checkout-summary',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardBodyComponent,     
        IconComponent, 
    CheckboxComponent, BaseButtonDirective],
  templateUrl: './form-checkout-summary.component.html'
})
export class FormCheckoutSummaryComponent {
}
