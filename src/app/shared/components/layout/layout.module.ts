import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SecureLayoutComponent } from './base/secure-layout.component';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse'; 

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SecureLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzCollapseModule
  ]
})
export class LayoutModule { }
