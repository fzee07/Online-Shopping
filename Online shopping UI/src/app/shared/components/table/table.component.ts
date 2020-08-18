import { Component, OnInit,Input, Output,EventEmitter} from '@angular/core';
import {SharedService} from '../../services/shared.service'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers;
  @Input() keys;
  @Input() data;
  @Output() editInfo=new EventEmitter<any>();
  @Output() deleteInfo=new EventEmitter<any>();
  timeStamp = (new Date()).getTime();
  @Input() hasImage;
  imagePath:string='';
  dataObj:any={};
  isShowModal:boolean=false;

  constructor(private shared:SharedService) {
    debugger;
      this.imagePath=this.shared.imagePath;
   }

  ngOnInit() {
  }

  fnEdit(dataObj){
     this.editInfo.emit(dataObj);
  }

  fnDelete(dataObj){
    this.isShowModal=true;
    this.dataObj=dataObj
  }

  fnSendData(data){
    this.isShowModal=false;
      if(data){
        this.deleteInfo.emit(this.dataObj);
      }
  }

}
