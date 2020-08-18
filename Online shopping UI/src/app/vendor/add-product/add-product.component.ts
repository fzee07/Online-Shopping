import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ServerCallService} from '../../shared/services/server-call.service';
import {SharedService} from '../../shared/services/shared.service'
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  dataObj:any={}
  public uploader: FileUploader = new FileUploader({url: "http://localhost:2020/products/fileUpload", itemAlias: 'photo'});
  @ViewChild('file',null) file: ElementRef;
  
  constructor(private serverCall:ServerCallService,private shared:SharedService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      debugger;
       file.withCredentials = false; 
      };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   debugger;
    // };
  }



  fnAddProduct(){
    debugger;
    if(this.uploader.queue.length == 0){
      alert('please uload photo');
      return;
    }

    let imgInfoObj=this.shared.fnCheckForImage(this.uploader.queue[0]._file.name)
    if(!imgInfoObj.isImage){
      alert('please upload imeage only');
      this.uploader.queue.pop();
      return;
    }
      this.dataObj.vid=window.sessionStorage.id;
      this.serverCall.fnPostReq(
        'products/create-product',
        {'data':this.dataObj},
        (res:any)=>{
           if(Object.keys(res)){
            this.uploader.queue[0].file.name=res._id+'.'+ imgInfoObj.ext;
            this.uploader.queue[0].upload();
            this.uploader.queue.pop();
            this.dataObj={};
            this.file.nativeElement.value="";
            this.shared.setMessage({
              'msg': 'Added successfully',
              'clr': 'green'
            })
           }
           
        },
        (res)=>{
          debugger;
        }
      )

  }
}
