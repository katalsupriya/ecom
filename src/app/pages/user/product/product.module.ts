import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';
import { NgbRatingModule, NgbNavModule,NgbTooltipModule , NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import { faHeart,faCartPlus,faTag,faCreditCard,faCheck,} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [ProductComponent, ViewComponent, AddProductComponent],
  imports: [
    CommonModule,
    NgbNavModule ,
    ProductRoutingModule,
    SharedModule,NgbRatingModule,FontAwesomeModule,NgbTooltipModule,NgbAccordionModule,
  ]
})
export class ProductModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faHeart,faCartPlus,faTag,faCheck);
  }
}
