
import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {ServerCallService} from  '../../shared/services/server-call.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  perPage:number=0;
  headers:any=['ID','Name','Cost', 'Description'];
  data:any=[];
  totalData:any=[];
  totalPages:number=0;
  keys:any=['_id','name','cost','desc']
  isShowPagination:boolean=false;


  constructor(private router:Router,private shared:SharedService, private serverCall:ServerCallService) { }

  ngOnInit() {
    this.perPage=this.shared.perPage;
    
    setTimeout(()=>{
      this.fnGetProducts();
    })
    
  }

  fnGetProducts(){
      this.serverCall.fnGetReq(
          'products/get-my-products?vid='+window.sessionStorage.id,
          (res)=>{
            debugger;
             this.data=res.slice(0,this.perPage);
             this.totalData=res;
             if(this.totalData.length > this.perPage){
               this.isShowPagination=true;
               this.totalPages=Math.ceil(this.totalData.length/this.perPage);
             }
          },
          ()=>{
            this.data=[];
            this.totalData=[];
          }
      )
  }
  fnCurrData(data){
    this.data=data;
  }

  fnEditInfo(productObj){
    debugger;
    this.router.navigateByUrl('vendor/update-product/'+productObj._id);
  }


  fnDeleteInfo(productObj){
    this.serverCall.fnGetReq(
      'products/delete-product?id='+productObj._id,
      (res)=>{
        if(res.ok == 1 && res.n == 1){
          this.shared.setMessage({
            'msg':'Deleted successfully',
            'clr':'green'
          });
          this.fnGetProducts();
        }
      },
      (res)=>{

      }
    )
  }

}
