import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.checkConnection()
  // }

  toggleIcon() {
    this.isButtonClicked = !this.isButtonClicked;
  }

  // checkConnection() {
  // Met à jour isConnecter en fonction de la présence du token
    // this.isConnected = !!localStorage.getItem('token');
    // if (this.isConnected) {
    //   this.router.navigate(['profil/user-profile']);
    // } }
}


