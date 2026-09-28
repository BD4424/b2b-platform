import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {

      this.authService.loadCurrentUser().subscribe({
        error: () => {
          this.authService.logout();
        }
      });

    }
  }
}
