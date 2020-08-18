import {RouterModule,Routes} from '@angular/router';
import {RegisterComponent} from './shared/components/register/register.component'
import {LoginComponent} from './shared/components/login/login.component'
const routes:Routes=[
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
      path:'admin',
      loadChildren:'./admin/admin.module#AdminModule'

    },
    {
        path:'vendor',
        loadChildren:'./vendor/vendor.module#VendorModule'
    },
    {
        path:'customer',
        loadChildren:'./customer/customer.module#CustomerModule'
    }

]

export const appRouting=RouterModule.forRoot(routes,{useHash:true})