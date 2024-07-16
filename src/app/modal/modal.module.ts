import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from './create-product/create-product.component';
import { SharedModule } from '../shared/shared.module';
import {     FormsModule,
  ReactiveFormsModule, } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [DeleteComponent, CreateProductComponent, PaymentComponent],
  imports: [
    CommonModule,
    NgbModalModule,FormsModule,ReactiveFormsModule,NgxStripeModule
  ],
  exports:[DeleteComponent],
})
export class ModalModule { }
