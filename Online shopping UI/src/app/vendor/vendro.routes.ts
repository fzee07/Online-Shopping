import {Routes,RouterModule} from '@angular/router';
import {VendorComponent} from './vendor.component'
import {HomeComponent} from './home/home.component';
import { AddProductComponent} from './add-product/add-product.component';
import {ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent} from './update-product/update-product.component';


const routes:Routes=[
    {
        path:'',
        component:VendorComponent,
        children:[
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent},
            {path:'add-product', component:AddProductComponent},
            {path:'products-list',component:ProductListComponent},
            {path:'update-product/:id',component:UpdateProductComponent}
        ]

    }
]

export const vendorRouting=RouterModule.forChild(routes);