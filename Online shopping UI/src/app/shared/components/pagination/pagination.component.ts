import { Component, OnInit, Input, Output,EventEmitter,DoCheck } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalData;
  @Input() perPage ;
  @Input() totalPages;
  @Output() fnCurrData=new EventEmitter<any>();
  goTo:string;
  currPage:number=1;

  constructor() { }

  // ngDoCheck(){
  //    if(this.totalData.length > this.perPage){
  //       let currData=this.totalData.slice(0,this.perPage);
  //       this.isShow=true;
  //       this.totalPages=Math.ceil(this.totalData.length/this.perPage)
  //       this.fnCurrData.emit(currData);
  //     }
  // }

  ngOnInit() {
  }
  
 
  fnGoTo(){
  this.currPage=Number(this.goTo);
  this.fnPrepareData();
  }

  fnPre(){
    this.currPage=this.currPage-1;
    this.fnPrepareData();
  }

  fnNext(){
    this.currPage=this.currPage+1;
    this.fnPrepareData();
  }

  fnPrepareData(){
    let end=this.currPage*this.perPage;
    let start=end-this.perPage;
    let currData=this.totalData.slice(start,end);
    this.fnCurrData.emit(currData);
  }

}
