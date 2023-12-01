import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserComponent } from './pages/account/user/user.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { EditComponent } from './pages/account/edit/edit.component';
import { CreateRoundsComponent } from './pages/rounds/create-rounds/create-rounds.component';
import { MyRoundsComponent } from './pages/rounds/my-rounds/my-rounds.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    EditComponent,
    CreateRoundsComponent,
    MyRoundsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
