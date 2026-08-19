import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
}

const STORAGE_KEY = 'base-ui-dashboard-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _user = signal<AuthUser | null>(this.readStoredUser());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  login(email: string, _password: string): void {
    const name = email.split('@')[0] || 'Demo User';
    const displayName = name
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    const authUser: AuthUser = {
      name: displayName || 'Demo User',
      email: email || 'demo@base-ui.net',
      initials: this.toInitials(displayName || 'Demo User'),
    };

    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    }
    this._user.set(authUser);
    void this.router.navigateByUrl('/app/dashboard');
  }

  register(email: string, password: string): void {
    this.login(email, password);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this._user.set(null);
    void this.router.navigateByUrl('/login');
  }

  private readStoredUser(): AuthUser | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private toInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
