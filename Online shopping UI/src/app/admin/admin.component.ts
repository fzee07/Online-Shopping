import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/services/shared.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private shared:SharedService) { }

  ngOnInit() {
  }

  fnLogout(){
    this.shared.fnLogout();
  }

}
