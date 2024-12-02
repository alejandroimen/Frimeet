import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { jwtDecode } from 'jwt-decode';

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
  };
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

        const token = response.token;
        localStorage.setItem('jwtToken', token);

        const decodedToken: any = jwtDecode(token);
        console.log('Datos del usuario:', decodedToken);

        localStorage.setItem('userId', decodedToken.sub);
        localStorage.setItem('userRol', decodedToken.id_Rol);
        localStorage.setItem('username', decodedToken.nombre);
 
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.showError('Hubo un error al iniciar sesión.');
        this.isSubmitting = false;
      }
    );
  }
}