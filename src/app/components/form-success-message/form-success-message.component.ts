// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { BaseButtonDirective } from '../button/base-button.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-success-message',
  standalone: true,
  imports: [
    CommonModule, CardComponent,      
        IconComponent, 
     BaseButtonDirective],
  templateUrl: './form-success-message.component.html'
})
export class FormSuccessMessageComponent {
}
