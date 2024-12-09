import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/iuser';
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
  nameValid: boolean = true;
  isSubmitting: boolean = false;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {}

  goToLogin(): void {
    this.router.navigate(['/login'])
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9_]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name);
  }

  ngDoCheck(): void {
    this.emailValid = this.validateEmail(this.user.email);
    this.passwordValid = this.user.password.length >= 8;
    this.passwordsMatch = this.user.password === this.pwdConfirm;
    this.nameValid = this.validateName(this.user.name);
  }

  register(): void {
    this.isSubmitting = true;

    if (!this.user.name || !this.user.email || !this.user.password || !this.pwdConfirm) {
      this.alertService.showWarning('Por favor, completa todos los campos.');
      this.isSubmitting = false;
      return;
    }

    if (!this.emailValid) {
      this.alertService.showWarning('Por favor, ingresa un correo válido.');
      this.isSubmitting = false;
      return;
    }

    if (!this.passwordValid) {
      this.alertService.showWarning('La contraseña debe tener al menos 8 caracteres.');
      this.isSubmitting = false;
      return;
    }

    if (!this.passwordsMatch) {
      this.alertService.showWarning('Las contraseñas no coinciden.');
      this.isSubmitting = false;
      return;
    }

    if (!this.nameValid) {
      this.alertService.showWarning('El nombre de usuario debe comenzar con una letra y no se permiten caracteres especiales, solo números y letras.');
      this.isSubmitting = false;
      return;
    }

    this.userService.register(this.user).subscribe(
      response => {
        this.alertService.showSuccess('Registrado exitosamente.');
        this.router.navigate(['/'])
      }, error => {
        this.alertService.showError('Hubo un error al registrarse.');
        this.isSubmitting = false;
      }
    )
  }
}
