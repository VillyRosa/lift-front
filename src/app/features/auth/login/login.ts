import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '@core/auth/services/auth';
import { Token } from '@core/auth/services/token';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private authService = inject(Auth);
  private router = inject(Router);
  private messageService = inject(MessageService);

  public onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      let message = '';

      const emailErrors = this.loginForm.get('email')?.errors;
      const passwordErrors = this.loginForm.get('password')?.errors;

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

      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      return;
    }

    const data = this.loginForm.value;

    this.authService.login({ email: data.email!, password: data.password! }).subscribe({
      next: (response) => {
        Token.setToken(response.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in' });
        this.router.navigate(['/']);
      },
      error: (error) => {
        let message = '';
        switch (error.status) {
          case 403:
            message = 'Invalid credentials';
            break;
          default:
            message = 'Internal error, please try again later';
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      }
    })
  }
}
