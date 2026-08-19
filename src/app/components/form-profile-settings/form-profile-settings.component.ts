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
import { BaseButtonDirective } from '../button/base-button.directive';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { IconStrokedButtonDirective } from '../button/base-icon-stroked-button.directive';
import { BaseTextareaDirective } from '../input-group/base-textarea.directive';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-profile-settings',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardBodyComponent,     
    InputGroupComponent, LabelComponent, BaseInputDirective, BaseAddonEndDirective, IconComponent, 
     BaseButtonDirective, IconButtonDirective, IconStrokedButtonDirective, 
        
     BaseTextareaDirective, AvatarComponent
  ],
  templateUrl: './form-profile-settings.component.html'
})
export class FormProfileSettingsComponent {
}
