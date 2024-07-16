import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, exhaustMap, fromEvent, take } from 'rxjs';
import { AuthService, CartService, ProductService } from 'src/app/services';
import { ProductArray, User, Item } from 'src/app/shared/models';
import { PaymentComponent } from 'src/app/modal/payment/payment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  public $product!: Observable<ProductArray>;
  public user!: User | null;
  public review: boolean = false;
  public currentRate = 0;
  public active = 1;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _autService: AuthService,
    private _cartService: CartService,
    private _modalService:NgbModal
  ) {}

  ngOnInit(): void {
    this.$product = this._productService.getProductById(
      this.route.snapshot.paramMap.get('id')
    );

    this._autService.loginUser.subscribe((data) => (this.user = data));
  }

  addReview() {
    this.review = true;
  }

  sum(num: string, input: HTMLInputElement) {
    let value;
    if (num === 'inc') {
      value = Number(input.value) + 1;
      input.value = value.toString();
    } else {
      if (Number(input.value) !== 1) {
        value = Number(input.value) - 1;
        input.value = value.toString();
      }
    }
  }

  openPaymentModal(){
    this._modalService.open(PaymentComponent,{ size: 'xl' })
  }

  addToCart(e: Event, id: string | undefined) {
    let cartItem = { storedItem: id };
    e.target &&
      fromEvent(e?.target, 'click')
        .pipe(take(1),exhaustMap(() => this._cartService.addToCart(cartItem)))
        .subscribe((data) => this._cartService.isAddedToCart.next(true));
  }

}
