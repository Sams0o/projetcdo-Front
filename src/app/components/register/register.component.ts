import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      pseudo: ['', Validators.required],
      biography: ['', Validators.required],
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
      confirmPassword: ['', Validators.required],
      admin: [false],
    });
  }
  passwordMismatch = false;

  onSubmit() {
    // Verifier si les mots de passe correspondent
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.passwordMismatch = password !== confirmPassword;

    if (this.registerForm.valid && !this.passwordMismatch) {
      // Si tous les champs sont valides, alors continuez avec l'inscription
      const user = this.registerForm.value;

      this.userService.registerUser(user).subscribe({
        next: (res) => {
          this.toast.success(
            "Inscription réussie !",
            'Inscription'
          );
          this.router.navigate(['/connexion/login']);
        },
        error: (error) => {
          this.toast.error(
            "Un problème est survenu lors de l'inscription'",
            'Erreur'
          );
        },
      });
    }
  }
}