import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements DoCheck {
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0
  }
  emailValid: boolean = true;
  isSubmitting: boolean = false;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  ngDoCheck(): void {
    this.emailValid = this.validateEmail(this.user.email);
  }

  login(): void {
    this.isSubmitting = true;

    if (!this.user.email || !this.user.password) {
      this.alertService.showWarning('Por favor, completa todos los campos.');
      this.isSubmitting = false;
      return;
    }

    if (!this.emailValid) {
      this.alertService.showWarning('Por favor, ingresa un correo válido.');
      this.isSubmitting = false;
      return;
    }

    this.userService.login(this.user).subscribe(
      response => {
        console.log('Bienvenido', response);
        this.alertService.showSuccess('Inicio de sesión exitoso.');
       
        // Guardar el token en localStorage
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/']);
      }, error => {
        this.alertService.showError('Hubo un error al iniciar sesión.');
        this.isSubmitting = false;
      }
    );
  }
}
