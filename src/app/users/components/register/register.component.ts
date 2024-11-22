import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements DoCheck {
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0
  }
  pwdConfirm: string = ''
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordsMatch: boolean = true;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {}

  goToLogin(): void {
    this.router.navigate(['/login'])
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  ngDoCheck(): void {
    this.emailValid = this.validateEmail(this.user.email);
    this.passwordValid = this.user.password.length >= 8;
    this.passwordsMatch = this.user.password === this.pwdConfirm;
  }

  register(): void {
    if (!this.user.name || !this.user.email || !this.user.password || !this.pwdConfirm) {
      this.alertService.showWarning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.emailValid) {
      this.alertService.showWarning('Por favor, ingresa un correo válido.');
      return;
    }

    if (!this.passwordValid) {
      this.alertService.showWarning('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!this.passwordsMatch) {
      this.alertService.showWarning('Las contraseñas no coinciden.');
      return;
    }

    this.userService.register(this.user).subscribe(
      response => {
        this.alertService.showSuccess('Registrado exitosamente.');
        this.router.navigate(['/'])
      }, error => {
        this.alertService.showError('Hubo un error al registrarse.');
      }
    )
  }
}
