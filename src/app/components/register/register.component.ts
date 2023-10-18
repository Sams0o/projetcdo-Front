import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      console.log('onSubmit', user);
      this.userService.registerUser(user).subscribe({
        next: (res) => {
          console.log("Inscription réussie:", res);
          this.router.navigate(['/mon-compte/login']);
        },
        error: (error) => {
          console.log("Erreur lors de l'inscription :", error);
        }
      });
    }
  }
}
     


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent implements OnInit {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserService,
//     private ht: HttpClient
//   ) {
//     this.registerForm = this.fb.group({
//       first_name: ['', Validators.required],
//       last_name: ['', Validators.required],
//       pseudo: ['', Validators.required],
//       biography: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern(
//             /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
//           ),
//         ],
//       ],
//       confirmPassword: ['', Validators.required],
//       admin: [false],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     if (this.registerForm.valid) {
//       const user = this.registerForm.value;
//       console.log('onSubmit', user);
//       // this.userService.registerUser(user);
//       this.userService.registerUser(user);
//     }
//   }
// }
