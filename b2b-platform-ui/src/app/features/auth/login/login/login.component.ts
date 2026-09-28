import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loading = false;
  error = '';
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required]
  });
  }

  submit(): void {

    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService
      .login(this.form.getRawValue())
      .subscribe({

        next: () => {
          this.loading = false;
          this.router.navigate(['/overview']);
        },

        error: error => {

          this.loading = false;

          this.error =
            error?.error?.message ??
            'Invalid email or password.';
        }
      });
  }
}