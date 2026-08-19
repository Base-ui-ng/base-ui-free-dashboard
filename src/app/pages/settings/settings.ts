import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AvatarComponent,
  BaseButtonDirective,
  BaseInputDirective,
  BaseListItemDirective,
  BaseTextareaDirective,
  CardBodyComponent,
  CardComponent,
  CurrencyInputComponent,
  FormBillingComponent,
  FormNotificationsComponent,
  IconComponent,
  InputGroupComponent,
  LabelComponent,
  NavListComponent,
  SidenavBodyComponent,
  SidenavComponent,
  SidenavNavComponent,
} from 'Base';
import { AuthService } from '../../core/auth/auth';

type SettingsSection = 'profile' | 'billing' | 'notifications';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    SidenavComponent,
    SidenavNavComponent,
    SidenavBodyComponent,
    NavListComponent,
    BaseListItemDirective,
    CardComponent,
    CardBodyComponent,
    CurrencyInputComponent,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    BaseTextareaDirective,
    BaseButtonDirective,
    AvatarComponent,
    IconComponent,
    FormBillingComponent,
    FormNotificationsComponent,
  ],
  templateUrl: './settings.html',
})
export class Settings {
  private readonly auth = inject(AuthService);

  protected readonly section = signal<SettingsSection>('profile');

  name = this.auth.user()?.name || 'Demo User';
  email = this.auth.user()?.email || 'demo@base-ui.net';
  bio = 'Product designer building clean dashboards with Base UI.';
  spendCap: number | null = 2500;

  selectSection(next: SettingsSection): void {
    this.section.set(next);
  }

  saveProfile(): void {
    // Mock save — wire to your API later.
  }
}
