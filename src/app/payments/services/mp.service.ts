import { Injectable } from '@angular/core';
import { loadMercadoPago } from "@mercadopago/sdk-js";

declare global {
  interface Window {
    MercadoPago: any; // De tipo genérico para evitar errores al compilar
  }
}

@Injectable({
  providedIn: 'root'
})
export class MpService {
  private mp: any

  constructor() {
    this.initializeMercadoPago();
  }

  private async initializeMercadoPago() {
    await loadMercadoPago(); 
    this.mp = new window.MercadoPago("APP_USR-a3f68a94-28c6-4160-a367-4ac477a3fde6"); 
  }

  async getMpInstance(): Promise<any> {
    if (!this.mp) {
      await this.initializeMercadoPago();
    }
    return this.mp;
  }

  
}
