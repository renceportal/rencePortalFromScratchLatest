import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http"; 
import { Injectable } from "@angular/core"; 
import { concatMap, take } from "rxjs/operators"; 
import { AuthService } from "../services"; 

@Injectable() 
export class AuthInterceptorService implements HttpInterceptor { 

  constructor(private authservice: AuthService) { } 

  intercept(req: HttpRequest<any>, next: HttpHandler) { 
    return this.authservice.isLoggedIn$.pipe( 
      take(1), 
      concatMap(user => { 
        if (!user) { 
          return next.handle(req); 
        } 
        const token = this.authservice.getAccessToken(); // I stored the token in the local storage so  
        // I can get it whenever I do have a new request to the API 
        const modifiedReq = req.clone({ 
          params: new HttpParams().set('auth', token) 
        }); 
        return next.handle(modifiedReq); 
      }) 
    ) 
  } 

} 