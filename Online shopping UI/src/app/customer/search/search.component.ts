import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText:string;
  @Output() fnSearch= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  fnFilterProduct(){
    debugger;
    this.fnSearch.emit(this.searchText);
  }

}
