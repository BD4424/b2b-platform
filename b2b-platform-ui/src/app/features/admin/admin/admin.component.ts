import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  profile = {
    name: '',
    email: '',
    phone: '',
    role: 'Administrator'
  };

  saving = false;
  saved = false;

  // Change password
  passwordModalOpen = false;
  changingPassword = false;
  passwordError = '';
  passwordSuccess = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService
  ) {
    const user = this.authService.user();

    if (user) {
      this.profile = {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role === 'ADMIN'
          ? 'Administrator'
          : 'User'
      };
    }
  }

  saveProfile(): void {

    this.saved = false;
    this.saving = true;

    // Profile API can be connected here later.

    setTimeout(() => {
      this.saving = false;
      this.saved = true;
    }, 500);
  }

  changePassword(): void {

    this.passwordModalOpen = true;

    this.passwordError = '';
    this.passwordSuccess = '';

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  closePasswordModal(): void {

    if (this.changingPassword) {
      return;
    }

    this.passwordModalOpen = false;
  }

  submitPasswordChange(): void {

    this.passwordError = '';
    this.passwordSuccess = '';

    if (!this.currentPassword) {
      this.passwordError = 'Enter your current password.';
      return;
    }

    if (!this.newPassword) {
      this.passwordError = 'Enter a new password.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.passwordError =
        'New password must contain at least 8 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError =
        'New password and confirmation do not match.';
      return;
    }

    if (this.currentPassword === this.newPassword) {
      this.passwordError =
        'New password must be different from your current password.';
      return;
    }

    this.changingPassword = true;

    this.authService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({

      next: () => {

        this.changingPassword = false;

        this.passwordSuccess =
          'Password changed successfully.';

        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },

      error: error => {

        this.changingPassword = false;

        this.passwordError =
          error?.error?.message ??
          'Unable to change password. Please check your current password.';
      }
    });
  }

  signOut(): void {
    this.authService.logout();
  }
}