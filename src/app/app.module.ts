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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CardExperienceComponent } from './components/card-experience/card-experience.component';
import { ExperienceUserComponent } from './pages/experience-user/experience-user.component';
import { CreateExperienceComponent } from './components/create-experience/create-experience.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { DeleteExperienceComponent } from './components/delete-experience/delete-experience.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlService } from './services/url.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ExperiencesComponent,
    LoginComponent,
    NotFoundComponent,
    UserProfileComponent,
    ConnectionComponent,
    ProfileComponent,
    SettingsComponent,
    CardExperienceComponent,
    ExperienceUserComponent,
    CreateExperienceComponent,
    EditExperienceComponent,
    DeleteExperienceComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    // import de ngx-toastr et le forRoot sert a etre utiliser dans toutes les routes de l'applie
    ToastrModule.forRoot({ preventDuplicates: true }),
    BrowserAnimationsModule,
  ],
  providers: [UrlService],
  bootstrap: [AppComponent],
})
export class AppModule {}
