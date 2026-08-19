import { Component, inject, signal } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BaseButtonDirective,
  DropdownMenuDirective,
  DropdownMenuComponent,
  DropdownMenuItemComponent,
  IconComponent,
  IconButtonDirective,
  LoadingOverlayComponent,
  injectTimers,
} from 'Base';
import { DialogService } from '../../components/dialog/dialog.service';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/users/users';
import { UserDeleteDialog } from './user-delete-dialog/user-delete-dialog';
import { UserFormDialog } from './user-form-dialog/user-form-dialog';

@Component({
  selector: 'app-users',
  imports: [
    BaseButtonDirective,
    AvatarComponent,
    BadgeComponent,
    IconComponent,
    IconButtonDirective,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    DropdownMenuDirective,
    LoadingOverlayComponent,
  ],
  templateUrl: './users.html',
})
export class Users {
  private readonly dialog = inject(DialogService);
  private readonly timers = injectTimers();
  protected readonly usersService = inject(UsersService);
  protected readonly loading = signal(true);

  constructor() {
    this.timers.setTimeout(() => this.loading.set(false), 700);
  }

  openCreate(): void {
    this.dialog.open(UserFormDialog, { mode: 'create' as const }).subscribe();
  }

  openEdit(user: User): void {
    this.dialog.open(UserFormDialog, { mode: 'edit' as const, user }).subscribe();
  }

  openDelete(user: User): void {
    this.dialog.open(UserDeleteDialog, { user }).subscribe();
  }
}
