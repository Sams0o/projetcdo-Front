import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
// import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExperienceUserComponent } from './pages/experience-user/experience-user.component';
import { CreateExperienceComponent } from './components/create-experience/create-experience.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accueil', component: HomeComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'connexion', component: ConnectionComponent },
  { path: 'connexion/register', component: RegisterComponent },
  { path: 'connexion/login', component: LoginComponent },
  { path: 'profil/user-profile', component: ProfileComponent },
  { path: 'profil/user-profile/create', component: CreateExperienceComponent },
  { path: 'profil/user-profile/settings', component: SettingsComponent },
  { path: 'experience-user', component: ExperienceUserComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
