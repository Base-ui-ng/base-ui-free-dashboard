// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CardBodyComponent } from '../card/card-body/card-body.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { BaseAddonEndDirective } from '../input-group/base-addon-end.directive';
import { IconComponent } from '../icon/icon.component';
import { StrokedButtonDirective } from '../button/base-stroked-button.directive';
import { BaseTextareaDirective } from '../input-group/base-textarea.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-shipping',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardBodyComponent,     
    InputGroupComponent, LabelComponent, BaseInputDirective, BaseAddonEndDirective, IconComponent, 
        
        StrokedButtonDirective,
     BaseTextareaDirective],
  templateUrl: './form-shipping.component.html'
})
export class FormShippingComponent {
}
