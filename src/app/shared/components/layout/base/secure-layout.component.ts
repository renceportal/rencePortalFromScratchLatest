
import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '@rence/core/services';
import { IdleSessionTimeout } from "idle-session-timeout"; 
import { NzModalService } from 'ng-zorro-antd/modal'; 

@Component({ 
  selector: 'app-secure-layout', 
  templateUrl: './secure-layout.component.html' 
}) 

export class SecureLayoutComponent implements OnInit { 
  idleState = 'Not started.'; 
  timedOut = false; 
  title = 'angular-idle-timeout'; 
  session: any; 
  setTimeoutVar: any; 

  constructor(
               private authService: AuthService, 
               private modal: NzModalService 
             ) { 
    if (this.authService.getAccessToken()) { 
      this.idleTimeoutStart(); 
    } 
  }
  
  idleTimeoutStart(): void { 
    // angular session timeout 
    // time out in 5 min on inactivity 
    // let session = new IdleSessionTimeout(5 * 60 * 1000); 
    this.session = new IdleSessionTimeout(1 * 5 * 1000); 
    this.session.onTimeOut = () => { 
      // here you can call your server to log out the user 
      console.log("timeOut"); 
      this.actionConfirmation(); 
    }; 
    //optional 
    this.session.onTimeLeftChange = (timeLeft: any) => { 
      // this will notify you  each second about the time left before the timeout 
      console.log(`${timeLeft} ms left`); 
    }; 
    this.session.start();
    // can be manually reset. 

    this.session.reset(); 
    // Note:when the session is expired, it's automatically disposed. 
    // To reset the counter for expired session use start method. 
    // returns time left before time out 
    // let timeLeft = this.session.getTimeLeft(); 
  } 

  idleTimeoutStart10Seconds(): void { 
    this.setTimeoutVar = setTimeout(() => { 
      this.idleManualDispose(); 
      this.authService.logout(); 
    }, 10000); 
  } 

  idleManualDispose(): void { 
    // to dispose the session 
    this.session.dispose(); 
    this.modal.ngOnDestroy(); 
  } 

  ngOnInit(): void { } 

  actionConfirmation(): void { 
    this.idleTimeoutStart10Seconds(); 
    this.modal.confirm({ 
      nzTitle: `Hello, are you still there?`, 
      nzContent: `You seem busy. For your security, we'll automatically log you out in 10 more seconds`, 
      nzOkText: 'KEEP ME LOGGED IN', 
      nzCancelText: 'LOG ME OUT', 

      nzOnOk: () => { 
        this.idleTimeoutStart(); 
        clearTimeout(this.setTimeoutVar); 
      }, 

      nzOnCancel: () => { 
        this.authService.logout(); 
        this.idleManualDispose(); 
        clearTimeout(this.setTimeoutVar); 
      }, 
    }); 
  } 

  ngOnDestroy(): void { 
    this.idleManualDispose(); 
    clearTimeout(this.setTimeoutVar); 
  } 

} 