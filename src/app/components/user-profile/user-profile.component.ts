import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { User } from 'src/app/models/user.model';
import { ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userExperiences: Experience[]=[]; // Stocker les experiences de l'utilisateur

  constructor(
    private router: Router, 
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.getDataUserProfil();
    // console.log(this.user);
  }

  getDataUserProfil() {
    this.userService.getUserById().subscribe((data) => {
      this.user = data;
      this.userExperiences = data.experiences;
      // console.log('moncul ' + JSON.stringify(data));
    });
  }
  // Lien qui permet à l'utilisateur de modifier ses données personnelles
  link() {
    this.router.navigate(['/profil/user-profile/settings']);
  }

  logout() {
    this.userService.logout();
  }
}
