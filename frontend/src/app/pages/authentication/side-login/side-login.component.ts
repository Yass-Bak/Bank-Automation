import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
  styleUrl: './side-login.component.css'
})
export class AppSideLoginComponent {
  constructor(private router: Router,private authService: AuthService   ) { }
  errorMessage: string = 'Email or password incorrect';
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const credentials = {
        email: this.f.uname.value || "",
        password: this.f.password.value || "",
    };

    this.authService.login(credentials).subscribe({
        next: (response) => {
            this.authService.setAuthToken(response.accessToken);
            console.log('Login succès !', response);
            this.router.navigate(['/dashboard']);
        },
        error: (err) => {
            this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
            console.error('Erreur de login :', err);
        }
    });
}
}
