import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { USER_STORAGE_KEY } from 'src/app/shared/constants/constants';
import { UserWithProjects } from 'src/types';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  user: UserWithProjects = {
    id: '',
    email: '',
    name: '',
    lastname: '',
    created_at: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    console.log(this.user);
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

  async onUpdateUser() {
    console.log('updating user');
    await this.authService.updateUser(this.user);
    // this.router.navigate(['account/user']);
  }

  async onUpdateProjects() {
    await this.authService.updateProjects(this.user);
  }

  async onUpdateExperienceAreas() {
    await this.authService.updateExperienceAreas(this.user);
  }
}
