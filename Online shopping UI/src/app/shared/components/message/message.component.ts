import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 @Input() msg ;
 @Input() clr;
 @Output() fnCloseMsg= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
   

  fnClose(){
    this.fnCloseMsg.emit();
  }

}
