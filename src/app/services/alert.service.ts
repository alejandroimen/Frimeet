import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'success-popup',
        icon: 'success-icon',
        title: 'success-message'
      }
    });
  }

  showWarning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'alert-popup',
        icon: 'alert-icon',
        title: 'alert-message'
      }
    });
  }

  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'error-popup',
        icon: 'error-icon',
        title: 'error-message'
      }
    });
  }

  showInfo(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-confirm-button',
        popup: 'info-popup',
        icon: 'info-icon',
        title: 'info-message'
      }
    });
  }
}
