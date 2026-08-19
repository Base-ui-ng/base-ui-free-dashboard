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
import { IconComponent } from '../icon/icon.component';
import { BaseButtonDirective } from '../button/base-button.directive';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { StarComponent } from '../star-rating/star/star.component';
import { BaseTextareaDirective } from '../input-group/base-textarea.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-review',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardBodyComponent,     
    InputGroupComponent, LabelComponent, BaseInputDirective,  IconComponent, 
     BaseButtonDirective,   
      StarRatingComponent, StarComponent, 
     BaseTextareaDirective],
  templateUrl: './form-review.component.html'
})
export class FormReviewComponent {
}
