import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@core/auth/services/auth';
import { iRegister } from '@core/auth/interfaces/register';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  public registerForm = new FormGroup({
    nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  private authService = inject(Auth);
  private messageService = inject(MessageService);
  private router = inject(Router);

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      let message = '';

      const nicknameErrors = this.registerForm.get('nickname')?.errors;
      const firstNameErrors = this.registerForm.get('firstName')?.errors;
      const lastNameErrors = this.registerForm.get('lastName')?.errors;
      const emailErrors = this.registerForm.get('email')?.errors;
      const passwordErrors = this.registerForm.get('password')?.errors;
      const confirmPasswordErrors = this.registerForm.get('confirmPassword')?.errors;

      if (nicknameErrors) {
        if (nicknameErrors['required']) {
          message = 'Nickname field is required';
        }
        if (nicknameErrors['minlength']) {
          message = 'Nickname must be at least ' + nicknameErrors['minlength'].requiredLength + ' characters long';
        }
        if (nicknameErrors['maxlength']) {
          message = 'Nickname cannot be longer than ' + nicknameErrors['maxlength'].requiredLength + ' characters';
        }
      }

      if (firstNameErrors) {
        if (firstNameErrors['required']) {
          message = 'First name field is required';
        }
        if (firstNameErrors['minlength']) {
          message = 'First name must be at least ' + firstNameErrors['minlength'].requiredLength + ' characters long';
        }
        if (firstNameErrors['maxlength']) {
          message = 'First name cannot be longer than ' + firstNameErrors['maxlength'].requiredLength + ' characters';
        }
      }

      if (lastNameErrors) {
        if (lastNameErrors['required']) {
          message = 'Last name field is required';
        }
        if (lastNameErrors['minlength']) {
          message = 'Last name must be at least ' + lastNameErrors['minlength'].requiredLength + ' characters long';
        }
        if (lastNameErrors['maxlength']) {
          message = 'Last name cannot be longer than ' + lastNameErrors['maxlength'].requiredLength + ' characters';
        }
      }

      if (emailErrors) {
        if (emailErrors['required']) {
          message = 'E-mail field is required';
        }
        if (emailErrors['email']) {
          message = 'E-mail invalid';
        }
      }

      if (passwordErrors) {
        if (passwordErrors['required']) {
          message = 'Password field is required';
        }
      }

      if (confirmPasswordErrors) {
        if (confirmPasswordErrors['required']) {
          message = 'Confirm password field is required';
        }
      }

      if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
        message = 'Confirm password dont match';
      }

      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      return;
    }

    const data = this.registerForm.value as iRegister;

    this.authService.register(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully registered' });
        this.router.navigate(["/auth/login"]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal error, please try again later' });
      }
    });
  }
}
