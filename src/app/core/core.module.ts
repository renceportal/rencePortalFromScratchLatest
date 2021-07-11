import { CommonModule } from '@angular/common'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core'; 
import { BsDatepickerConfig, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker'; 
import { NzNotificationModule } from 'ng-zorro-antd/notification'; 
import { NzModalModule } from 'ng-zorro-antd/modal'; 
import { AuthInterceptorService } from '@rence/core/interceptors/request.interceptor';

export function getDatepickerConfig(): BsDatepickerConfig { 
  return Object.assign(new BsDatepickerConfig(), { 
    dateInputFormat: 'MMM-DD-YYYY', 
    showWeekNumbers: false, 
    containerClass: 'theme-dark-blue' 
  }); 
} 

export function getDaterangepickerConfig(): BsDatepickerConfig { 
  return Object.assign(new BsDaterangepickerConfig(), { 
    rangeInputFormat: 'MMM-DD-YYYY', 
    dateInputFormat: 'MMM-DD-YYYY', 
    showWeekNumbers: false, 
    containerClass: 'theme-dark-blue', 
    showClearButton: true, 
    rangeSeparator: ' to ' 
  }); 
} 

@NgModule({ 
  imports: [ 
    CommonModule, 
    HttpClientModule, 
    NzModalModule, 
    NzNotificationModule 
  ],
  providers: [ 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true 
    }, 
    { 
      provide: BsDatepickerConfig, 
      useFactory: getDatepickerConfig 
    }, 
    { 
      provide: BsDaterangepickerConfig, 
      useFactory: getDaterangepickerConfig 
    } 
  ], 
  declarations: [] 
}) 

export class CoreModule { } 