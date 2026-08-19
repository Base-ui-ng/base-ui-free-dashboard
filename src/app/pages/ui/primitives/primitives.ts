import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AspectRatioComponent,
  AvatarComponent,
  BadgeComponent,
  BaseButtonDirective,
  ButtonGroupComponent,
  ChipComponent,
  CurrentScreenSizeService,
  DividerComponent,
  GroupButtonComponent,
  IconButtonDirective,
  IconComponent,
  IconStrokedButtonDirective,
  KbdComponent,
  RevealDirective,
  RippleDirective,
  ScrollAreaComponent,
  StrokedButtonDirective,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-primitives',
  imports: [
    FormsModule,
    ShowcasePage,
    ShowcaseSection,
    BaseButtonDirective,
    StrokedButtonDirective,
    IconButtonDirective,
    IconStrokedButtonDirective,
    ButtonGroupComponent,
    GroupButtonComponent,
    BadgeComponent,
    ChipComponent,
    AvatarComponent,
    IconComponent,
    DividerComponent,
    RippleDirective,
    RevealDirective,
    KbdComponent,
    AspectRatioComponent,
    ScrollAreaComponent,
  ],
  templateUrl: './primitives.html',
})
export class UiPrimitives {
  viewMode: string | number = 'list';
  protected readonly screen = inject(CurrentScreenSizeService);
  protected readonly scrollTags = [
    'hover-card',
    'menubar',
    'loading-overlay',
    'currency-input',
    'kbd',
    'aspect-ratio',
    'scroll-area',
    'cookie-banner',
  ];

  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'button-group', label: 'Button group' },
    { id: 'badges-chips', label: 'Badges & chips' },
    { id: 'avatars', label: 'Avatars' },
    { id: 'icons-divider', label: 'Icons & divider' },
    { id: 'ripple', label: 'Ripple' },
    { id: 'reveal', label: 'Reveal' },
    { id: 'kbd', label: 'Kbd' },
    { id: 'aspect-ratio', label: 'Aspect ratio' },
    { id: 'scroll-area', label: 'Scroll area' },
    { id: 'screen-size', label: 'Screen size' },
  ];
}
