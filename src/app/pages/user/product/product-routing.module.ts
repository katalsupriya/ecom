import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ViewComponent } from './view/view.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    component: ProductComponent,
    path: '',
    title:'Products'
  },
  { path: 'view/:id', component: ViewComponent,title:'Product Info' },
  { path: 'add-product', component: AddProductComponent,title:'Add Product' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
