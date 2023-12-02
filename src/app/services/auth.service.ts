import { Injectable } from '@angular/core';
import {
  AuthApiError,
  AuthError,
  Session,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USER_STORAGE_KEY } from '../shared/constants/constants';
import { Router } from '@angular/router';
import { Register } from '../pages/auth/register/register.component';
import { UserWithProjects } from 'src/types';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

type supabaseResponse = User | Session | AuthError | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabaseClient: SupabaseClient;

  private userSubject = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  private userWithProject = new BehaviorSubject<UserWithProjects | null>(null);

  get userWithProject$(): Observable<UserWithProjects | null> {
    return this.userWithProject.asObservable();
  }

  constructor(private router: Router) {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async login(
    credentials: SignInWithPasswordCredentials
  ): Promise<supabaseResponse> {
    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseClient.auth.signInWithPassword(credentials);
      this.setUser();

      if (error) {
        console.log(error);
        return error;
      }

      this.router.navigate(['account/user']);
      return user;
    } catch (error) {
      console.log(error);
      return error as AuthApiError;
    }
  }

  async loginWithGoogle() {
    try {
      const { data: error } = await this.supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
        },
      });

      if (error) {
        console.log(error);
        return;
      }

      const {
        data: { user },
      } = await this.supabaseClient.auth.getUser();
      console.log(user);
      this.setUser();
      this.router.navigate(['account/user']);
    } catch (error) {
      console.log(error);
    }
  }

  async register(register: Register): Promise<supabaseResponse> {
    const credentials = {
      email: register.email,
      password: register.password,
      options: {
        data: {
          name: register.name,
          lastname: register.lastname,
        },
      },
    };

    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseClient.auth.signUp(credentials);

      if (error) {
        alert(error.message);
      } else {
        alert('Te hemos enviado un correo para verificarte como usuario');
      }

      return error ? error : user;
    } catch (error) {
      console.log(error);

      return error as AuthApiError;
    }
  }

  signOut(): Promise<{ error: AuthError | null }> {
    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();
  }

  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }

  private setUserWithProject(user: UserWithProjects): void {
    this.userWithProject.next(user);
  }

  async getUser(id: string): Promise<any> {
    try {
      let { data: user, error } = await this.supabaseClient
        .from('users')
        .select('*, projects (*), userExperienceAreas (*) ')
        .eq('id', id)
        .eq('projects.user_id', id)
        .eq('userExperienceAreas.user_id', id)
        .limit(1)
        .single();

      if (error) {
        console.log(error);
        return error;
      }

      await this.setUserWithProject(user as unknown as UserWithProjects);
      return user && (user as unknown as UserWithProjects);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(user: UserWithProjects): Promise<any> {
    const { projects, userExperienceAreas, ...update } = user;
    console.log(update);
    try {
      const { data, error } = await this.supabaseClient
        .from('users')
        .upsert(update)
        .eq('id', update.id);

      if (error) {
        console.log(error);
      }

      alert('Se actualizaron los datos de manera satisfactoria');
    } catch (error) {
      console.log(error);
    }
  }

  async updateProjects(user: UserWithProjects): Promise<any> {
    console.log(user.projects);
    const projects = user.projects?.map((p) => {
      p.user_id = user.id;
      return p;
    });

    try {
      const { data, error } = await this.supabaseClient
        .from('projects')
        .upsert(projects);

      if (error) {
        console.log(error);
      }

      alert('Se actualizaron los datos de manera satisfactoria');
    } catch (error) {
      console.log(error);
    }
  }

  async removeProject(id: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.log(error);
      }

      alert('Se elimino proyecto de manera satisfactoria');
    } catch (error) {
      console.log(error);
    }
  }

  async updateExperienceAreas(user: UserWithProjects): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('userExperienceAreas')
        .upsert(user.userExperienceAreas);

      if (error) {
        console.log(error);
      }

      alert('Se actualizaron los datos de manera satisfactoria');
    } catch (error) {
      console.log(error);
    }
  }

  async removeExperienceArea(id: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('userExperienceArea')
        .delete()
        .eq('id', id);

      if (error) {
        console.log(error);
      }

      alert('Se elimino proyecto de manera satisfactoria');
    } catch (error) {
      console.log(error);
    }
  }
}
