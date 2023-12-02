import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { USER_STORAGE_KEY } from '../constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // user$ = this.authService.user$;
  user = localStorage.getItem(USER_STORAGE_KEY);

  constructor(private readonly authService: AuthService) {}

  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();

      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }
}
