import { Component, OnInit } from '@angular/core';
import {ServerCallService} from '../../shared/services/server-call.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any=[];
  totalProducts:any=[];
  constructor(private serverCall:ServerCallService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.fnGetProducts();
    })
  }

  fnGetProducts(){
    this.serverCall.fnGetReq(
      'products/get-all-products',
      (res)=>{
        this.products=res;
        this.totalProducts=res;
      },
      (res)=>{
        this.products=[];
        this.totalProducts=[];
      }
    )
  }


  fnSearch(searchText){
    this.products=   this.totalProducts.filter((o)=>{
            return o.name.toLowerCase().includes(searchText.toLowerCase());
          // return o.name.includes(searchText);

       })
  }

}
