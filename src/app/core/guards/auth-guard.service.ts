import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router"; 
import { Observable } from "rxjs"; 
import { AuthService } from "../services"; 

@Injectable({ 
  providedIn: 'root' 
}) 

export class AuthGuard implements CanActivate, CanActivateChild { 

  constructor(private as: AuthService, 
              private router: Router) { 
  } 

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
    if (this.as.getAccessToken()) { 
      return true; 
    }
    this.router.navigate(['/']);
    return false;
    // // OTHER WAY 
    // // return this.as.isAuthenticated() // CHANGE IT FOR CHECKING TOKEN COZ IT IS FOR AUTHORIZATION 
    // return this.as.isAuthorized() 
    //   .then( 
    //     (authenticated: string) => { 
    //       if (authenticated) { 
    //         console.log(authenticated); 
    //         // !!authenticated it means if this data 
    //         return true; 
    //       } else { 
    //         this.router.navigateByUrl('/unauthorized'); 
    //       } 
    //     } 
    // );      
  } 

  canActivateChild(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
    return this.canActivate(route, state); 
  } 

} 