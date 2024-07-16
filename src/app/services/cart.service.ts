import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Cart, Item} from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:3100';
  public isAddedToCart:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient, private _errorService: ErrorService) {}

  addToCart(cart: Item | undefined): Observable<Item> {
    return this.http
      .post<Item>(this.url + '/cart', cart)
      .pipe(catchError(this._errorService.handleError));
  }

 getCartItems(): Observable<Cart> {
    return this.http
      .get<Cart>(this.url + '/cart')
      .pipe(catchError(this._errorService.handleError));
  }


}
