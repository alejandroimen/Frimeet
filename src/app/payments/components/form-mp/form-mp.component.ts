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
  data: IdataMP = {
    transaction_amount: 0,
    token: '',
    description: '',
    installments: 0,
    payment_method_id: '',
    issuer_id: 0,
    email: '',
    type: '',
    number: 0
  }
  name: string = ''

  constructor(private mpServ: MpService, private payMpServ: PaymentsMpService) {}

  async ngOnInit() {
    //Sé que quedó muy sucio pero así lo marcaba la documentación de MercadoPago,  lo tuve que adaptar a angular 
    //Dividí lo mas posible en funciones
    this.mp = await this.mpServ.getMpInstance();
    console.log('MercadoPago instance:', this.mp);
    
    const cardForm = this.mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: this.mpServ.getFormStatic(),
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event: any) => {
          this.submit(event, cardForm)
        },
        onFetching: (resource: any) => {
          this.fetching(resource)
          
        }
      },
      
    });
    
  }

  ngDoCheck():void {
    const cardholderInput = document.getElementById('form-checkout__cardholderName') as HTMLInputElement | null;
    if (cardholderInput) {
      this.name = cardholderInput.value;
    } else {
      console.warn("El elemento con ID 'form-checkout__cardholderName' no fue encontrado.");
    }
  }

  submit(event: any, cardForm:any):void{
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
    
    this.data = {
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
    console.log('Esto se esta enviando', this.data);

    this.payMpServ.pay(this.data).subscribe(
      response => console.log('Ta bien: ', response),
      error => console.log('errorsito: ', error)
    )
    
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
  }

  fetching(resource: any):any {
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
}
