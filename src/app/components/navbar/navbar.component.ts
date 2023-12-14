import { Component } from '@angular/core';    
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent  {
  isButtonClicked = false;

  constructor(
    public userService: UserService
  ) {}

  toggleIcon() {
    this.isButtonClicked = !this.isButtonClicked;
  }
}


