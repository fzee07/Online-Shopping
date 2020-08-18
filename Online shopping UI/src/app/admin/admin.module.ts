import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { VendorRegComponent } from './vendor-reg/vendor-reg.component';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import {adminRouting} from './admin.routes';
import {MenuActiveDirective} from '../shared/directives/menu-active.directive';

import {SharedModule} from '../shared/modules/shared/shared.module';
@NgModule({
  imports: [
    adminRouting,
    SharedModule,
    CommonModule
  ],
  declarations: [MenuActiveDirective,AdminComponent, HomeComponent, VendorRegComponent, VendorsListComponent, UpdateVendorComponent]
})
export class AdminModule { }
