import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {ServerCallService} from  '../../shared/services/server-call.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.css']
})
export class VendorsListComponent implements OnInit {
  perPage:number=0;
  headers:any=['ID','User Name','Password', 'Email ', 'Phone','Role'];
  data:any=[];
  totalData:any=[];
  totalPages:number=0;
  
  keys:any=['_id','uid','pwd','email','phone','role']
  isShowPagination:boolean=false;
  constructor(private router:Router,private shared:SharedService, private serverCall:ServerCallService, private changeDect:ChangeDetectorRef) { }

  ngOnInit() {
    this.perPage=this.shared.perPage;
    window.setTimeout(()=>{
    this.fnGetVendors();
       
    })
  }

fnGetVendors(){
  this.serverCall.fnGetReq(
    'users/get-vendors',
    (res:any)=>{
       this.data=res.slice(0,this.perPage);
       this.totalData=res;
       if(this.totalData.length > this.perPage){
            this.isShowPagination=true;
            this.totalPages=Math.ceil(this.totalData.length/this.perPage)
       }
    },
    (res)=>{
       this.data=[];
       this.totalData=[];
       this.isShowPagination=false;
    })
}
   
  fnCurrData(data){
      this.data=data;
  }

  fnEditInfo(userObj){
    debugger;
    this.router.navigateByUrl('admin/vendor-update/'+userObj._id)
  }
  fnDeleteInfo(userObj){
    debugger;
    this.serverCall.fnGetReq(
      'users/delete-vendor?id='+userObj._id,
      (res)=>{
         if(res.ok == 1 && res.n == 1){
           this.fnGetVendors();
          this.shared.setMessage({
            'msg': 'Deleted successfully',
            'clr': 'green'
          })
         }
      },
      ()=>{

      })
  }

}
