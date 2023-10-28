import { Component } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { USER_STORAGE_KEY } from 'src/app/shared/constants/constants';
import { UserWithProjects } from 'src/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user: UserWithProjects = {
    id: '',
    email: '',
    name: '',
    lastname: '',
    created_at: '',
  };
  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  async getUser() {
    let localSession = localStorage.getItem(USER_STORAGE_KEY);
    if (localSession) {
      const session: Session = JSON.parse(localSession);
      const {
        user: { id: userId },
      } = session;

      const user = await this.authService.getUser(userId);

      if (user) {
        this.user = user;
      }
    }
  }
}
