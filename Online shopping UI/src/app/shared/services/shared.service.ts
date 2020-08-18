import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  perPage:number=3;
  imagePath:string='http://localhost:2020/images/'
  msgSubject=new Subject();
  maskSubject=new Subject();
  
  constructor() { }

  setMessage(data){
    this.msgSubject.next(data);;
  }

  fnLogout(){
    sessionStorage.clear();
  }

  fnCheckForImage(fileName){
      let fileExt=fileName.split('.').pop();
      let isImage=false;
      if(fileExt == 'jpg' || fileExt == 'jpeg'){
          isImage=true;
      }

      return {
        'isImage':isImage,
        'ext':fileExt
      }
     
  }
}
