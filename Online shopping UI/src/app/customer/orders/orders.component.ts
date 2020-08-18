import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service'
import {ServerCallService} from '../../shared/services/server-call.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:any=[];
  timeStamp=new Date().getTime();
  imagePath='';
  constructor(shared:SharedService,serverCall:ServerCallService) { 
    this.imagePath=shared.imagePath
       serverCall.fnGetReq(
         'users/get-user-det?id='+window.sessionStorage.id,
         (res)=>{
            this.orders=res.orders;
         },
         ()=>{
          this.orders=[];
         })
  }

  ngOnInit() {

  }

}
