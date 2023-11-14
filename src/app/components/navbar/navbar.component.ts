import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent  {
  isButtonClicked = false;
  isConnected: boolean = false;

  constructor(
  ) {}

  toggleIcon() {
    this.isButtonClicked = !this.isButtonClicked;
  }
}


