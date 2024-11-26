import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/iuser';
import { UserService } from '../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, DoCheck {
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0,
  };
  confirmPassword: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordsMatch: boolean = true;
  nameValid: boolean = true;
  phoneValid: boolean = true;
  isSubmitting: boolean = false;
  userId: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUser().subscribe(
      (response: Iuser) => {
        this.user = response;
        this.user.name = response.name;
      },
      (error: any) => {
        this.alertService.showError('Hubo un error al cargar los datos del usuario.');
      }
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9_]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name);
  }

  validatePhone(phone: string): boolean {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(phone);
  }

  ngDoCheck(): void {
    this.emailValid = this.validateEmail(this.user.email);
    this.passwordValid = this.user.password.length >= 8;
    this.passwordsMatch = this.user.password === this.confirmPassword;
    this.nameValid = this.validateName(this.user.name);
  }

  updateProfile(): void {
    this.isSubmitting = true;

    if (!this.user.name || !this.user.email || !this.user.password || !this.confirmPassword) {
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
      this.alertService.showWarning('El nombre de usuario debe comenzar con una letra y no se permiten caracteres especiales.');
      this.isSubmitting = false;
      return;
    }

    this.userService.updateProfile(this.userId, this.user).subscribe(
      (response: { message: string; success: boolean }) => {
        this.alertService.showSuccess(response.message);
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        this.alertService.showError('Hubo un error al actualizar el perfil.');
        this.isSubmitting = false;
      }
    );
  }
}
