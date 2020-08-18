import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { TileComponent } from './tile/tile.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { OrdersComponent } from './orders/orders.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import {customerRouting} from './customer.routes';
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from '../shared/modules/shared/shared.module'
@NgModule({
  imports: [
    CommonModule,
    customerRouting,
    SharedModule
  ],
  declarations: [CustomerComponent, HomeComponent, SearchComponent, TileComponent, ProductViewComponent, OrdersComponent, CartViewComponent, OrderSuccessComponent, ProfileComponent]
})
export class CustomerModule { }
