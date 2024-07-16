import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { RegisterForm,LoginForm, User, Users } from '../shared/models';
import { ErrorService } from './error.service';
import { SearchModel } from '../shared/models/search.model';
import { DeleteResponse } from 'src/app/shared/models';
import { CommonService } from './common.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = 'http://localhost:3100';
public user = new BehaviorSubject<string|undefined|null>(null);
public loginUser = new BehaviorSubject<User|null>(null);
public isDeleted = false;

  constructor(private http: HttpClient,private _errorService: ErrorService,private _commonService: CommonService) { }
 
  register(user:RegisterForm):Observable<RegisterForm>{
    return this.http.post<RegisterForm>(this.url+'/api/register',user).pipe(catchError(this._errorService.handleError))
  }

  currentUser():Observable<any>{
    let token = document.cookie.match(/jwt/)?.input !== undefined ? document.cookie.match(/jwt/)?.input : '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token ? token :''
      })
    }

    return this.http.get(this.url+'/current/user',httpOptions ).pipe(catchError(this._errorService.handleError));
  }

  login(login:LoginForm):Observable<LoginForm>{
    return this.http.post<LoginForm>(this.url+'/api/login',login,{withCredentials:true}).pipe(catchError(this._errorService.handleError))
  }

  getAuthToken() {
    let token = document.cookie.match(/jwt/)?.input !== undefined ? document.cookie.match(/jwt/)?.input : null;
    if(document.cookie.match(/jwt/)?.input?.includes('undefined')){
      return this.user.next(null)
    }
    return this.user.next(token)
  }

  logout() {
    let token = document.cookie.match(/jwt/)?.input !== undefined ? document.cookie.match(/jwt/)?.input : '';
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token ? token :'',
      }),
      withCredentials: true
     };
    return this.http.get(this.url+'/logout',requestOptions).pipe(catchError(this._errorService.handleError))
  }

  getUser(offset=0,keyword?: string | undefined|unknown,filterBy?: string | undefined):Observable<any>{
    keyword = keyword !== undefined?'&keyword='+keyword:'';
     filterBy = filterBy !== undefined?'&filterBy='+filterBy:''
    return this.http.get<any>(this.url+'/student?max=10&skip='+offset+keyword+filterBy).pipe(catchError(this._errorService.handleError))
  }

  getUsers(user:SearchModel):Observable<Users>{
   let params = this._commonService.searchParams(user);
    return this.http.get<Users>(this.url+'/student',{params:new HttpParams({fromObject:params})}).pipe(catchError(this._errorService.handleError))
  }

  getById(id:string|null):Observable<RegisterForm>{
    return this.http.get<User>(this.url+'/api/user/view/'+id)
  }

  delete(id:string|undefined):Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(this.url+'/api/user/delete/'+id)
  }

  updateUserInfo(id:string|undefined,form:RegisterForm):Observable<any>{
    return this.http.patch(this.url+'/api/user/edit/'+id,form);
  }
}
