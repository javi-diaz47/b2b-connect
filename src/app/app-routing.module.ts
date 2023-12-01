import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserComponent } from './pages/account/user/user.component';
import { EditComponent } from './pages/account/edit/edit.component';
import { MyRoundsComponent } from './pages/rounds/my-rounds/my-rounds.component';
import { CreateRoundsComponent } from './pages/rounds/create-rounds/create-rounds.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'account/user', component: UserComponent },
  { path: 'account/edit', component: EditComponent },
  { path: 'rounds/my-rounds', component: MyRoundsComponent },
  { path: 'rounds/create-rounds', component: CreateRoundsComponent },

  // Otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
