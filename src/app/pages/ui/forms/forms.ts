import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BaseAddonEndDirective,
  BaseInputDirective,
  BaseMaskDirective,
  BaseTextareaDirective,
  CheckboxComponent,
  ColorPickerComponent,
  CurrencyInputComponent,
  CustomSelectComponent,
  DualRangeSliderComponent,
  FilterPipe,
  FloatingInputComponent,
  IconComponent,
  InputAutocompleteComponent,
  InputGroupComponent,
  InputSpinnerComponent,
  LabelComponent,
  OtpInputComponent,
  PasswordStrengthComponent,
  PhoneInputComponent,
  RadioButtonComponent,
  RadioGroupComponent,
  RangeSliderComponent,
  SelectComponent,
  StarComponent,
  StarRatingComponent,
  ToggleComponent,
  TriStateCheckboxComponent,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-forms',
  imports: [
    FormsModule,
    ShowcasePage,
    ShowcaseSection,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    BaseTextareaDirective,
    BaseAddonEndDirective,
    BaseMaskDirective,
    FloatingInputComponent,
    CheckboxComponent,
    ToggleComponent,
    RadioGroupComponent,
    RadioButtonComponent,
    SelectComponent,
    RangeSliderComponent,
    DualRangeSliderComponent,
    IconComponent,
    OtpInputComponent,
    PhoneInputComponent,
    PasswordStrengthComponent,
    InputSpinnerComponent,
    InputAutocompleteComponent,
    CustomSelectComponent,
    ColorPickerComponent,
    CurrencyInputComponent,
    StarRatingComponent,
    StarComponent,
    TriStateCheckboxComponent,
    FilterPipe,
  ],
  templateUrl: './forms.html',
})
export class UiForms {
  email = '';
  plan = 'pro';
  country = 'us';
  volume = 40;
  priceRange = { start: 20, end: 80 };
  newsletter = true;
  otp = '';
  phone = '';
  password = '';
  quantity = 2;
  brandColor = '#3b82f6';
  usdPrice: number | null = 1240;
  eurPrice: number | null = 990;
  rating = 4;
  triState: boolean | 'indeterminate' = 'indeterminate';
  role = 'editor';
  filterQuery = '';
  protected readonly bio = 'Short bio about the product.';
  protected readonly roleOptions = [
    { label: 'Viewer', value: 'viewer' },
    { label: 'Editor', value: 'editor' },
    { label: 'Admin', value: 'admin' },
  ];
  protected readonly people = [
    { name: 'Sarah Miles', email: 'sarah@example.com' },
    { name: 'James Cole', email: 'james@example.com' },
    { name: 'Priya Patel', email: 'priya@example.com' },
    { name: 'Noah Kim', email: 'noah@example.com' },
  ];

  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'input-group', label: 'Input group' },
    { id: 'floating-input', label: 'Floating input' },
    { id: 'select', label: 'Select' },
    { id: 'custom-select', label: 'Custom select' },
    { id: 'choices', label: 'Radio / checkbox / toggle' },
    { id: 'tri-state', label: 'Tri-state checkbox' },
    { id: 'otp', label: 'OTP input' },
    { id: 'phone', label: 'Phone input' },
    { id: 'password', label: 'Password strength' },
    { id: 'mask', label: 'Input mask' },
    { id: 'spinner', label: 'Input spinner' },
    { id: 'autocomplete', label: 'Autocomplete' },
    { id: 'color-picker', label: 'Color picker' },
    { id: 'currency', label: 'Currency input' },
    { id: 'star-rating', label: 'Star rating' },
    { id: 'range-slider', label: 'Range slider' },
    { id: 'dual-range', label: 'Dual range' },
    { id: 'filter-pipe', label: 'Filter pipe' },
  ];
}
