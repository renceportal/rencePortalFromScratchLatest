import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutModule } from '@shared/components/layout/layout.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgBusyModule } from 'ng-busy';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [
    FormControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    LayoutModule,
    AngularSvgIconModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgBusyModule,
    NgSelectModule,
    NzCollapseModule,
    NzModalModule,
    NzSwitchModule,
    NzTabsModule,
    NzTimePickerModule,
    NzTreeModule,
    NzTagModule,
    NzMessageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    FormControlComponent,
    AngularSvgIconModule,
    BsDropdownModule,
    BsDatepickerModule,
    NgBusyModule,
    NgxDatatableModule,
    NgSelectModule,
    NzCollapseModule,
    NzModalModule,
    NzSwitchModule,
    NzTabsModule,
    NzTimePickerModule,
    NzTreeModule,
    NzTagModule
  ],
})
export class SharedModule { }
