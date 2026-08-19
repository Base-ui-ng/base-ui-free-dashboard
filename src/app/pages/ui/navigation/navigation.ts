import { Component } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemBodyComponent,
  AccordionItemComponent,
  AccordionItemHeaderComponent,
  BaseButtonDirective,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  DropdownMenuItemComponent,
  MenubarComponent,
  MenubarMenuComponent,
  ScrollBottomComponent,
  ScrollToDirective,
  ScrollTopComponent,
  StepComponent,
  StepperComponent,
  TabBodyComponent,
  TabComponent,
  TabsComponent,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-navigation',
  imports: [
    ShowcasePage,
    ShowcaseSection,
    TabsComponent,
    TabComponent,
    TabBodyComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderComponent,
    AccordionItemBodyComponent,
    MenubarComponent,
    MenubarMenuComponent,
    DropdownMenuItemComponent,
    StepperComponent,
    StepComponent,
    ScrollToDirective,
    ScrollTopComponent,
    ScrollBottomComponent,
    BaseButtonDirective,
  ],
  templateUrl: './navigation.html',
})
export class UiNavigation {
  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'tabs', label: 'Tabs' },
    { id: 'breadcrumb', label: 'Breadcrumb' },
    { id: 'accordion', label: 'Accordion' },
    { id: 'menubar', label: 'Menubar' },
    { id: 'stepper', label: 'Stepper' },
    { id: 'scroll-to', label: 'Scroll to' },
    { id: 'scroll-buttons', label: 'Scroll buttons' },
  ];
}
