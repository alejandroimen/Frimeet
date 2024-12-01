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

  showLoading():void {
    Swal.fire({
      html: `
          <div class="container-load"> 
            <div class="circle">
              <svg width="102" height="96" viewBox="0 0 102 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 95.5C4.5 58 20 36 30.5 36C41 36 47.5 48 51.5 64C55.5 80 62 95.5 70.5 95.5C79 95.5 97.5 83 101.5 0.5" stroke="transparent"/>
              </svg>
              <div class="dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <i class="fa-solid fa-location-dot"></i>
                </div>
            </div>
            <span>Estamos pensando a donde puedes ir</span>
          </div>
      `,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: 'custom-popup-style',
        htmlContainer: 'swal-class-container-load'
      }
    });
  }

  closeLoading(): void {
    Swal.close(); // Cierra la alerta
  }
}
