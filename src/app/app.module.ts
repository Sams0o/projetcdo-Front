import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MonCompteComponent } from './pages/mon-compte/mon-compte.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, NavbarComponent, HomeComponent, ExperiencesComponent, LoginComponent, NotFoundComponent, MonCompteComponent, UserProfileComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
