import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() fnSendData= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  fnOk(){
    this.fnSendData.emit(true);
  }

  fnCancel(){
    this.fnSendData.emit(false);
  }

}
