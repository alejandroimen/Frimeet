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

  getFormStatic(): any {
    return {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Numero de tarjeta",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de seguridad",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular de la tarjeta",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emisor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Cuotas",
      },        
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
    }
  }
}
