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

type supabaseResponse = User | Session | AuthError | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabaseClient: SupabaseClient;

  private userSubject = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
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

  async register(
    credentials: SignInWithPasswordCredentials
  ): Promise<supabaseResponse> {
    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseClient.auth.signUp(credentials);
      this.setUser();
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
}
