import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import {AddedProduct, Product, ProductArray, Query } from '../shared/models';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3100';
  constructor(private http: HttpClient, private _errorService: ErrorService) {}


  getProducts(payload?:any): Observable<Product> {
    return this.http
      .get<Product>(this.url+'/products',{params:new HttpParams({ fromObject: payload})})
      .pipe(catchError(this._errorService.handleError));
  }


  getProductById(id: string|null): Observable<ProductArray> {
    return this.http.get<ProductArray>(this.url+'/products/'+id).pipe(catchError(this._errorService.handleError))
  }

  addProducts(product:ProductArray): Observable<AddedProduct> {
    return this.http
      .post<AddedProduct>(this.url+'/products',product)
      .pipe(catchError(this._errorService.handleError));
  }





}
