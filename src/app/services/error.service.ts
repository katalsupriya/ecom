import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  handleError(error: HttpErrorResponse){
    if(error?.error?.error?.name =='TokenExpiredError'){
       let date = new Date(1970);
      document.cookie = 'jwt=;expires='+date.toString();
    }
    let errorMessage = {
      message:'',
      status:'',
    };
    if (error.status === 0) {
      errorMessage.message = 'Please check your connection or contact your internet provider!';
    }else if (!error.error.message || !error.error.error) {
      errorMessage.message = error.error.message ?? error.error.error;
    }else{
      errorMessage.message = 'This is unknown error. Please try again later!';
    }
    errorMessage.status = error?.statusText;
    
    console.log(error)
   return throwError(errorMessage);
  }
}
