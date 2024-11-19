import { Component, OnInit } from '@angular/core';
import { IdataMP } from '../../interfaces/idata-mp';
import { MpService } from '../../services/mp.service';
import { PaymentsMpService } from '../../services/payments-mp.service';

@Component({
  selector: 'app-form-mp',
  templateUrl: './form-mp.component.html',
  styleUrl: './form-mp.component.css'
})
export class FormMpComponent implements OnInit {
  mp: any

  constructor(private mpServ: MpService, private payMpServ: PaymentsMpService) {}

  async ngOnInit() {
    this.mp = await this.mpServ.getMpInstance();
    console.log('MercadoPago instance:', this.mp);
    
    const cardForm = this.mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
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
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event: any) => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
          

          const data: IdataMP = {
            transaction_amount: amount,
            token: token,
            description: 'Suscripcion',
            installments: installments,
            payment_method_id: payment_method_id,
            issuer_id: issuer_id,
            email: email,
            type: identificationType,
            number: identificationNumber
          }
          console.log('Esto se esta enviando', data);

          this.payMpServ.pay(data).subscribe(
            response => console.log('Ta bien: ', response),
            error => console.log('errorsito: ', error)
          )

          console.log(
            'token: ', token,
            'Pago: ',payment_method_id,
            'Issuer: ', issuer_id,
            'mail: ', email,
            'mont del pago: ',amount,
            'Installments: ',installments,
            'Numero de identificacion: ', identificationNumber,
            'Tipo de identificacion: ', identificationType,);
          
          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descripción del producto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });
        },
        onFetching: (resource: any) => {
          console.log("Fetching resource: ", resource);
          
          
          // Para animar la barra de progreso
          const progressBar = document.querySelector(".progress-bar");
          if (progressBar){
            progressBar.removeAttribute("value");

            return () => {
              progressBar.setAttribute("value", "0");
            };
          }
          return
        }
      },
    });

  }

}
