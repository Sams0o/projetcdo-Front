import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent  {
  

  constructor(private userService: UserService) {}
}
  // ngOnInit() {
  //   this.isAuthenticated = localStorage.getItem('token') !== null;
  //   if(this.isAuthenticated) {
  //      this.getDataUser();
  //   }
   
  

  // getDataUser() {
  //   const initialUser = this.userService.getUserById().subscribe((data) => {
  //     this.initialUser = data;
  //     console.log(data);
  //   });
  //   console.log(initialUser);

    // return this.userService.getUserById()




