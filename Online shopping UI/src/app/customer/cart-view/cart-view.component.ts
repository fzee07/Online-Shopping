import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service'
import {ServerCallService} from '../../shared/services/server-call.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  orders:any=[];
  timeStamp=new Date().getTime();
  imagePath='';
  constructor(private router:Router,private shared:SharedService,private serverCall:ServerCallService) { 
    this.imagePath=shared.imagePath
      this.fnGetProducts();
  }

  fnGetProducts(){
    this.serverCall.fnGetReq(
      'users/get-user-det?id='+window.sessionStorage.id,
      (res)=>{
         this.orders=res.cart;
      },
      ()=>{
       this.orders=[];
      })
  }

  ngOnInit() {

  }

  fnBuyNow(product){
    this.serverCall.fnPostReq(
      'users/place-order',
      {id:window.sessionStorage.id,product:product},
      (res)=>{
         if(res.ok == 1 && res.n == 1){
           this.router.navigateByUrl('customer/success')
         }
      },
      (res)=>{
          this.shared.setMessage({
            'msg':'Something went wrong',
            'clr':"red"
          })
      }
    )
  }

  fnRemove(product){
    this.serverCall.fnPostReq(
      'users/remove-from-cart',
      {id:window.sessionStorage.id,pid:product._id},
      (res)=>{
         if(res.ok == 1 && res.n == 1){
          this.fnGetProducts();
         }
      },
      (res)=>{
          this.shared.setMessage({
            'msg':'Something went wrong',
            'clr':"red"
          })
      }
    )
  }
}