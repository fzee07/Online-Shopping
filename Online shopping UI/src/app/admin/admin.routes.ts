import {RouterModule,Routes} from '@angular/router';
import {AdminComponent} from './admin.component'
import {HomeComponent} from './home/home.component';
import {UpdateVendorComponent} from './update-vendor/update-vendor.component'
import {VendorRegComponent} from './vendor-reg/vendor-reg.component'
import {VendorsListComponent} from './vendors-list/vendors-list.component'
const routes:Routes=[
    {
        path:'',
        component:AdminComponent,
        children:[
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent},
            {path:'vendor-reg',component:VendorRegComponent},
            {path:'vendors-list',component:VendorsListComponent},
            {path:'vendor-update/:id',component:UpdateVendorComponent}
        ]
    }
]

export const adminRouting=RouterModule.forChild(routes);