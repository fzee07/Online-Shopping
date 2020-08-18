import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import {vendorRouting} from './vendro.routes';
import {SharedModule} from '../shared/modules/shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    vendorRouting,
    SharedModule,
    FileUploadModule
  ],
  declarations: [VendorComponent, HomeComponent, AddProductComponent, ProductListComponent, UpdateProductComponent]
})
export class VendorModule { }
