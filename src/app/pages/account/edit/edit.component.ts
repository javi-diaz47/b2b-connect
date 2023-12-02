import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import {
  EXPERIENCE_AREAS,
  USER_STORAGE_KEY,
} from 'src/app/shared/constants/constants';
import { Project, UserWithProjects } from 'src/types';

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
    projects: [],
    userExperienceAreas: [],
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
        console.log(user);
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
    console.log('here');
    await this.authService.updateExperienceAreas(this.user);
  }

  // Projects

  inputProject: Project = {
    id: crypto.randomUUID(),
    user_id: this.user.id,
    title: '',
    description: '',
  };

  unfilledNewProject = false;

  addProject() {
    if (
      this.user.projects &&
      this.inputProject.title &&
      this.inputProject.description
    ) {
      this.user.projects.push(this.inputProject);
      console.log(this.user.projects);
      this.inputProject = {
        id: crypto.randomUUID(),
        title: '',
        description: '',
      }; // Clear the input field
      this.unfilledNewProject = false;
      return;
    }
    this.unfilledNewProject = true;
  }

  removeProject(id: string) {
    if (this.user.projects) {
      this.user.projects = this.user.projects.filter(
        (project) => project.id !== id
      );
    }

    this.authService.removeProject(id);
  }

  // Experience Area
  AREAS = EXPERIENCE_AREAS;

  inputExperienceArea = '';

  isExperienceAreaDuplicated = false;

  isExperienceDuplicated(): boolean {
    if (this.user.userExperienceAreas) {
      return this.user.userExperienceAreas.some(
        (experienceArea) => experienceArea.area === this.inputExperienceArea
      );
    }
    return false;
  }

  addExperienceArea() {
    this.isExperienceAreaDuplicated = this.isExperienceDuplicated();
    if (
      this.inputExperienceArea &&
      this.user.userExperienceAreas &&
      !this.isExperienceAreaDuplicated
    ) {
      const areaId = EXPERIENCE_AREAS.filter(
        (a) => a.area === this.inputExperienceArea
      )[0].id;

      this.user.userExperienceAreas.push({
        id: crypto.randomUUID(),
        area_id: areaId,
        area: this.inputExperienceArea,
        user_id: this.user.id,
      });
      console.log(this.user.userExperienceAreas);
      this.inputExperienceArea = ''; // Clear the input field
    }
  }

  removeExperienceArea(id: string) {
    if (this.user.userExperienceAreas) {
      this.user.userExperienceAreas = this.user.userExperienceAreas.filter(
        (area) => area.id !== id
      );
    }

    this.authService.removeProject(id);
  }
}
