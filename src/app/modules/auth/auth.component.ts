import { Component, OnInit } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { Observable, Subscription } from 'rxjs'; 
import { NzNotificationService } from "ng-zorro-antd/notification"; 
import { AuthService } from '@rence/core/services';

@Component({ 
  selector: 'app-auth', 
  templateUrl: './auth.component.html', 
  styleUrls: ['./auth.component.scss'] 
}) 

export class AuthComponent implements OnInit { 
  form!: FormGroup; 
  isLoginMode = true; 
  busy!: Subscription; 

  constructor(private as: AuthService, 
              private fb: FormBuilder, 
              private notification: NzNotificationService, 
              private route: Router) { 
  } 

  ngOnInit(): void { 
    this.buildForm(); 

    if (this.as.getAccessToken()) { 
      this.route.navigateByUrl('/dashboard'); 
    } 
  } 

  onSwitchMode() { 
    this.isLoginMode = !this.isLoginMode; 
  } 

  buildForm(): void { 
    this.form = this.fb.group({ 
      email: [ null, [Validators.required, Validators.email] ], 
      password: [ null, [Validators.required, Validators.minLength(6)] ] 
    }) 
  } 

  submit(): void { 
    if (!this.form.invalid) { 
      const form = this.form.getRawValue(); 

      let autObs: Observable<any>; 
      let notifMessage: string; 

      if (this.isLoginMode) { 
        notifMessage = 'Login'; 
        autObs = this.as.login(form.email, form.password) 
      } else { 
        notifMessage = 'Signup'; 
        autObs = this.as.signup(form.email, form.password) 
      } 
      this.busy = autObs.subscribe((results) => { 
        this.notification.success(`${notifMessage} has been successful.`, ``); 
        this.reset(); 
        this.route.navigateByUrl('/dashboard'); 
      }, error => { 
        this.notification.error(`${notifMessage} has been denied.`, `${error?.error?.error?.message}`); 
      }) 
    } else { 
      this.form?.markAllAsTouched(); 
    } 
  } 

  reset(): void { 
    this.email.reset(); 
    this.password.reset(); 
  } 

  get email(): AbstractControl { 
    return this.form.get('email')!; 
  } 

  get password(): AbstractControl { 
    return this.form.get('password')!; 
  } 

} 