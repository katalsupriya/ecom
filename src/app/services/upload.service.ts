import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = 'http://localhost:3100/upload';
  constructor(private http: HttpClient,private _errorService: ErrorService) { }

  uploadImage(image:FormData):Observable<any>{
    return this.http.post(this.url,image,{
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this._errorService.handleError))
  }


  getImage():Observable<any>{
    return this.http.get(this.url).pipe(catchError(this._errorService.handleError))
  }

}
