import { Component, ElementRef, OnInit, ViewChild ,Renderer2} from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, pluck } from 'rxjs';
import { ProductService } from 'src/app/services';
import { ProductArray,Product,SearchQuery } from 'src/app/shared/models';
import { CreateProductComponent } from 'src/app/modal/create-product/create-product.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products$!: Observable<Product> ;
  public page: number = 1;
  public maxProducts:number = 10;
  public productQuery= new SearchQuery();
  public range:number = 50;

constructor(private _productService: ProductService,private _modalService:NgbModal,private route:ActivatedRoute,private router:Router,private location:Location,private renderer:Renderer2) {

}

ngOnInit(): void {

 this.route.queryParams.subscribe(el=> {this.productQuery.max = el['max']; this.productQuery.skip = el['skip']} )

  this.products$ = this._productService.getProducts(this.productQuery);

}

ngAfterViewInit(): void {
  let expand = document.querySelector('.expandAll') as HTMLElement ;
  expand.click();
}

getPrice(e:number){

}

addProduct(){
  const modalRef = this._modalService.open(CreateProductComponent,{ size: 'xl' });
    modalRef.componentInstance.height = 500;
}

// on pagination
onPageChange(e:any){
  this.productQuery.skip= e * this.productQuery.max - this.productQuery.max;
  this.productQuery.page = e;
  this.page = e;
  this.router.navigate(
    [], 
    {
      relativeTo: this.route,
      queryParams: this.productQuery, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.products$ = this._productService.getProducts(this.productQuery);
}

// set max page value
onChange(event:number,e:EventTarget){
  if(event>50){
    this.maxProducts = 10;
  }
  this.productQuery.max = event;
  this.productQuery.skip = 0;
  console.log(e)
  fromEvent(e,'input').pipe(debounceTime(600),distinctUntilChanged(),pluck('target','value')).subscribe(data=>{
    if (event > 50) {
      this.maxProducts = 10;
    }
    this.productQuery.max = data as number;
    this.productQuery.skip = 0;
    this.products$ = this._productService.getProducts(this.productQuery);
  })
  
}

ngOnDestroy(): void {
 this.productQuery = new SearchQuery();
  this.router.navigate([], {
    queryParams:this.productQuery,
    queryParamsHandling: 'preserve'
  })
}

}
