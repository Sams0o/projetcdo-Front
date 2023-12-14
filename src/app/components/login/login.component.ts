import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toast: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.toast.warning(
        'Veuillez vérifier vos informations et réessayer.',
        'Erreur de connexion',
        {
          positionClass: 'toast-top-right',
          closeButton: true,
        }
      );
    }
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.userService.loginUser(user).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.accessToken);
          this.toast.success('Connexion réussie !', 'Connexion');
          this.router.navigate(['/profil/user-profile']);
        },
        error: (error) => {
          console.error(
            "Une erreur s'est produite lors de la connexion :",
            error
          );
        },
      });
    }
  }
}
