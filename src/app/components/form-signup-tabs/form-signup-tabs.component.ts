// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TabsComponent } from '../tabs/tabs.component';
import { TabComponent } from '../tabs/tab/tab.component';
import { TabLabelComponent } from '../tabs/tab-label/tab-label.component';
import { TabBodyComponent } from '../tabs/tab-body/tab-body.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { LabelComponent } from '../input-group/label/label.component';
import { BaseInputDirective } from '../input-group/base-input.directive';
import { BaseAddonEndDirective } from '../input-group/base-addon-end.directive';
import { IconComponent } from '../icon/icon.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BaseButtonDirective } from '../button/base-button.directive';
import { IconButtonDirective } from '../button/base-icon-button.directive';
import { IconStrokedButtonDirective } from '../button/base-icon-stroked-button.directive';
import { BaseLinkDirective } from '../button/base-link.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'base-form-signup-tabs',
  standalone: true,
  imports: [
    CommonModule, CardComponent,  TabsComponent, TabComponent, TabLabelComponent, TabBodyComponent, 
    InputGroupComponent, LabelComponent, BaseInputDirective, BaseAddonEndDirective, IconComponent, 
    CheckboxComponent, BaseButtonDirective, IconButtonDirective, IconStrokedButtonDirective, 
    BaseLinkDirective],
  templateUrl: './form-signup-tabs.component.html'
})
export class FormSignupTabsComponent {
}
