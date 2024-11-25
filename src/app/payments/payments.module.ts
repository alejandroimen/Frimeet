import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMpComponent } from './components/form-mp/form-mp.component';
import { PaymentViewComponent } from './components/payment-view/payment-view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormMpComponent,
    PaymentViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports: [
    PaymentViewComponent
  ]
})
export class PaymentsModule { }
