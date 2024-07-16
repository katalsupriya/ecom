import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { catchError, filter, map, Observable, tap } from 'rxjs';
interface productArray{
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage:number,
  rating: number,
  stock: number,
  brand:  string,
  category:  string,
  thumbnail: string,
  images: string[],
}
interface Product{
  products: productArray[]
  total: number,
  skip: number,
  limit: number,
  
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
private url = 'https://dummyjson.com/products';
constructor(private http:HttpClient,private errorService:ErrorService) { 

}

 getNews():Observable<Product> {
  return this.http.get<Product>(this.url).pipe(catchError(this.errorService.handleError));
 }

 test(){
  return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(catchError(this.errorService.handleError))
 }

}
