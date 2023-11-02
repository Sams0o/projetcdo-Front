import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @Input() initial: String | undefined;
  user!: User;
  experiences!: Experience[];

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.getDataUserProfil();
    // console.log(this.user);
  }

  link() {
    this.router.navigate(['/profil/user-profile/settings']);
  }
  getDataUserProfil() {
    this.userService.getUserById().subscribe((data) => {
      this.user = data;
      this.experiences = data.experiences;
      // console.log('moncul ' + JSON.stringify(data));
    });
  }
}
