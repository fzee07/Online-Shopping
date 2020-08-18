import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { SharedService } from '../../shared/services/shared.service'
import { ServerCallService } from '../../shared/services/server-call.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productObj: any = {};
  imagePath: string;
  timeStamp=new Date().getTime();
  public uploader: FileUploader = new FileUploader({url: "http://localhost:2020/products/fileUpload", itemAlias: 'photo'});
  constructor(private router:Router,private shared: SharedService, private activatedRoute: ActivatedRoute, private serverCall: ServerCallService) {
    this.imagePath = this.shared.imagePath;
    this.activatedRoute.paramMap.subscribe((data: any) => {
      debugger;
      this.serverCall.fnGetReq(
        'products/get-product-by-id?id=' + data.params.id,
        (res) => {
          this.productObj = res;
        },
        () => {
          this.productObj = {};

        }
      )
    })
  }

 ngOnInit(){
  this.uploader.onAfterAddingFile = (file) => {
    debugger;
     file.withCredentials = false; 
    };
 }
  fnUpdateProduct() {
    let imgInfoObj:any={};
    if (this.uploader.queue.length == 1) {
      imgInfoObj = this.shared.fnCheckForImage(this.uploader.queue[0]._file.name)
      if (!imgInfoObj.isImage) {
        alert('please upload imeage only');
        this.uploader.queue.pop();
        return;
      }
    }
    this.serverCall.fnPostReq(
      'products/update-product',
       this.productObj ,
      (res: any) => {
        if(res.ok ==1 && res.n == 1){
           if(this.uploader.queue.length == 1){
              this.uploader.queue[0].file.name = this.productObj._id + '.' + imgInfoObj.ext;
              this.uploader.queue[0].upload();
              this.uploader.queue.pop();
           }

           this.shared.setMessage({
            'msg': 'Updated successfully',
            'clr': 'green'
          })
         this.router.navigateByUrl('vendor/products-list');

        }

      },
      (res) => {
        debugger;
      }
    )
  }

 

}
