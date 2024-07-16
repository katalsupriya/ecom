import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule,
    NgxStripeModule.forRoot('pk_test_51NBBP5SINDY3G2MawNpoPObyEdJdNotIEW0bBmE7OpUsrnZS2mpLw6it8gVlRUqejCUYSKmJFYlqcvtrLaRpPITd00OJOOuXpz'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
