import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/iuser';
import { UserService } from '../services/user.service';
import { NavbarService } from '../../services/navbar.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, DoCheck {
  isNavbarCollapsed: boolean = true;
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0,
  };
  confirmPassword: string = '';
  isEditingName: boolean = false;
  isEditingEmail: boolean = false;
  passwordValid: boolean = true;
  passwordsMatch: boolean = true;
  updatedName: string = '';
  updatedEmail: string = '';
  emailValid: boolean = true;
  nameValid: boolean = true;
  isSubmitting: boolean = false;
  userId: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.loadUserData();

    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isNavbarCollapsed = isCollapsed;
    });
  }

  ngDoCheck(): void {
    this.emailValid = this.validateEmail(this.user.email);
    this.passwordValid = this.user.password.length >= 8;
    this.passwordsMatch = this.user.password === this.confirmPassword;
    this.nameValid = this.validateName(this.user.name);
  }

  loadUserData(): void {
    this.userService.getUser().subscribe(
      (response: any) => {
        this.user = {
          name: response.nombre,
          email: response.email,
          password: '',
          rol: response.rol,
        };
        this.userId = response.id;
      },
      () => {
        this.alertService.showError('Hubo un error al cargar los datos del usuario.');
      }
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z ]*$/;
    return namePattern.test(name);
  }

  toggleEdit(field: 'name' | 'email'): void {
    if (field === 'name') {
      this.isEditingName = !this.isEditingName;
      this.updatedName = this.user.name;
    } else if (field === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
      this.updatedEmail = this.user.email;
    }
  }

  saveChanges(field: 'name' | 'email'): void {
    if (field === 'name') {
      if (this.validateName(this.updatedName)) {
        const updatedUser: Partial<Iuser> = { name: this.updatedName };
        this.userService.updateProfile(this.userId, updatedUser as Iuser).subscribe(
          () => {
            this.user.name = this.updatedName;
            this.isEditingName = false;
            this.alertService.showSuccess('Nombre actualizado correctamente.');
          },
          () => {
            this.alertService.showError('Hubo un error al actualizar el nombre.');
          }
        );
      } else {
        this.alertService.showWarning('El nombre no puede tener caracteres especiales.');
      }
    } else if (field === 'email') {
      if (this.validateEmail(this.updatedEmail)) {
        const updatedUser: Partial<Iuser> = { email: this.updatedEmail };
        this.userService.updateProfile(this.userId, updatedUser as Iuser).subscribe(
          () => {
            this.user.email = this.updatedEmail;
            this.isEditingEmail = false;
            this.alertService.showSuccess('Correo actualizado correctamente.');
          },
          () => {
            this.alertService.showError('Hubo un error al actualizar el correo.');
          }
        );
      } else {
        this.alertService.showWarning('Por favor, ingresa un correo válido.');
      }
    }
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

  cancelChanges(field: 'name' | 'email'): void {
    if (field === 'name') this.isEditingName = false;
    if (field === 'email') this.isEditingEmail = false;
  }
}
