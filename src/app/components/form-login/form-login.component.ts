// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BaseButtonDirective } from '../button/base-button.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-login',
  standalone: true,
  imports: [
    CommonModule, CardComponent,      
    InputGroupComponent, LabelComponent, BaseInputDirective,   
    CheckboxComponent, BaseButtonDirective],
  templateUrl: './form-login.component.html'
})
export class FormLoginComponent {
}
