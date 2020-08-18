import {Routes,RouterModule} from '@angular/router';
import {CustomerComponent} from './customer.component';
import { HomeComponent } from './home/home.component';
import {OrdersComponent} from './orders/orders.component';
import {CartViewComponent} from './cart-view/cart-view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {ProfileComponent} from './profile/profile.component'
const routes:Routes=[
    {
        path:'',
        component:CustomerComponent,
        children:[
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'home', component:HomeComponent},
            {path:'orders', component:OrdersComponent},
            {path:'cart', component:CartViewComponent},

            {path:'profile', component:ProfileComponent},
            {path:'view-product', component:ProductViewComponent},
            {path:'success',component:OrderSuccessComponent}

        ]
    }
]


export const customerRouting=RouterModule.forChild(routes);