import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MonCompteComponent } from './pages/mon-compte/mon-compte.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'mon-compte/register', component: RegisterComponent },
  { path: 'mon-compte/login', component: LoginComponent },
  { path: 'mon-compte/user-profil', component: UserProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
