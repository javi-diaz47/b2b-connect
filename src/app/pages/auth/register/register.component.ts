import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export interface Register {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterVerifyEmail extends Register {
  c_password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private readonly authService: AuthService) {}

  register: RegisterVerifyEmail = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    c_password: '',
  };

  //Función para guardar con en la base de datos.
  onRegister() {
    const credentials: Register = {
      name: this.register.name,
      lastname: this.register.lastname,
      email: this.register.email,
      password: this.register.password,
    };
    console.log(credentials);
    this.authService.register(this.register);
  }
}
