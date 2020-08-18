import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/services/shared.service'
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private shared:SharedService) { }

  ngOnInit() {
  }

  fnLogout(){
    this.shared.fnLogout();
  }

}
