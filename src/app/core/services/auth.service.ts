import { HttpClient } from "@angular/common/http"; 
import { Injectable } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { BehaviorSubject, Observable } from "rxjs"; 
import { tap } from "rxjs/operators"; 
import { environment } from "@env/environment";
import { User } from "@rence/shared/models";

const APISIGNUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey; 
const APISIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey; 

interface AuthResponseData { 
  idToken: string; 
  email: string; 
  refreshToken: string; 
  expiresIn: string; 
  localId: string; 
  registered?: boolean; 
} 

@Injectable({ 
  providedIn: 'root' 
}) 
export class AuthService { 

  public user = { } as User;
  // loggedIn = false; // OLD 
  private tokenExpirationTimer: any; 
  isLoggedIn$ = new BehaviorSubject<User>(this.user); 
  // isLoggedIn$ = new Subject<User>(); 
  loggedIn = false; 

  constructor(private ar: Router, 
              private httpClient: HttpClient) {} 

  isAuthorized() { 
    const promise = new Promise( 
      (resolve, reject) => { 
        setTimeout(() => { 
          // resolve(this.loggedIn); 
          resolve(this.getAccessToken()); 
        }, 0); 
      } 
    ); 
    return promise; 
  } 

  signup(email: string, password: string): Observable<AuthResponseData> { 
    return this.httpClient.post<AuthResponseData>(`${APISIGNUP}`, { 
      email: email, 
      password: password, 
      returnSecureToken: true 
    }).pipe( 
      tap(resData => { 
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); 
      }) 
    ); 
  } 

  login(email: string, password: string): Observable<AuthResponseData> { 
    return this.httpClient.post<AuthResponseData>(`${APISIGNIN}`, { 
      email: email, 
      password: password, 
      returnSecureToken: true 
    }).pipe( 
      tap(resData => { 
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); 
      }) 
    ); 
  } 

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) { 
    const expirationDate = new Date(new Date().getTime() + expiresIn + 100000); // 5 MINUTES 
    const user = new User( 
      email, 
      userId, 
      token, 
      expirationDate 
    ); 
    localStorage.setItem('userData', JSON.stringify(user)); 
    this.saveAccessToken(token); 
    this.isLoggedIn$.next(user); 
    this.autoLogout(expiresIn + 100000); // 1000 mean 3 seconds! 
    // this.loggedIn = true; 
  } 

  public saveAccessToken(token: string): void { 
    localStorage.setItem('access_token', token); 
  } 

  public getAccessToken(): string { 
    return localStorage.getItem('access_token') || ''; 
  } 

  public removeToken(): void { 
    localStorage.removeItem('access_token'); 
  } 

  public clearToken(): void { 
    localStorage.clear(); 
  }

  autoLogin(): void { 
    // FOR REFRESH 
    // YOU NEED THIS COZ WHEN YOU REFRESH, YOUR CREDENTIALS WILL BE LOST WHICH YOU NEED IN YOUR INTERCEPTOR 
    // THIS WILL FILL YOUR isLoggedIn AGAIN WITH THE SAME CREDENTIALS, ALSO WITH THAT EXPIRATION THAT 
    // IF IT IS STILL GREATER THAN YOUR CURRENT TIME , THEN YOU ARE STILL GOOD TO REFRESH 
    const userData: {  
      email: string; 
      id: string;
      _token: string; 
      _tokenExpirationDate: string; 
    } = JSON.parse(localStorage.getItem('userData') || '{}'); 
    if (!userData) { 
      return; 
    } 

    const loadedUser = new User( 
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationDate) 
    ); 

    if (loadedUser.token) { 
      this.isLoggedIn$.next(loadedUser); 
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
      new Date().getTime(); 
      this.autoLogout(expirationDuration); 
    } else { 
      this.logout(); 
    } 
  } 

  autoLogout(expirationDate: number) { 
    this.tokenExpirationTimer = setTimeout(() => { 
      this.logout(); 
    }, expirationDate); 
  } 

  logout() { 
    // this.loggedIn = false; // OLD 
    // this.loggedIn = false; 
    this.clearToken(); 
    this.ar.navigateByUrl('/'); 
    if (this.tokenExpirationTimer) { 
      clearTimeout(this.tokenExpirationTimer); 
    } 
    this.tokenExpirationTimer = null; 
  } 

} 

  