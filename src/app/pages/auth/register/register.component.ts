import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from '../../../core/validators/confirm-password.validator';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    JsonPipe,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      {
        validators: confirmPasswordValidator(
          'password',
          'password_confirmation',
        ),
      },
    );
  }

  register() {
    this.authService.register(this.form.value).subscribe({
      next: async (res) => {
        if (res) {
          await this.router.navigate(['/auth/login']);
        }
      },
    });
  }
}
