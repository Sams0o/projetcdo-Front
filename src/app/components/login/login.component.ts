import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/)]]});
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.userService.loginUser(user).subscribe({
        next: (res) => {
          console.log("Connexion réussie :", res);
         
          localStorage.setItem('token', res.accessToken);
          location.reload(); // Recharge la page actuelle
        },
        error: (error) => {
          console.log("Erreur lors de la connextion", );
          
        }
      })
    }
  }
}
