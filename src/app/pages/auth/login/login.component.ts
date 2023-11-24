import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  title = 'Login';

  login = {
    email: '',
    password: '',
  };

  onLogin() {
    console.log(this.login);

    this.authService.login(this.login);
  }

  onLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
