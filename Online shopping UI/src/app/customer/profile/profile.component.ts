import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service'
import { ServerCallService } from '../../shared/services/server-call.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDet: any = {};
  isEdit: boolean = false;
  constructor(private router: Router, private shared: SharedService, private serverCall: ServerCallService) {
    this.serverCall.fnGetReq(
      'users/get-user-det?id=' + window.sessionStorage.id,
      (res) => {
        this.userDet = res;
      },
      () => {
        this.userDet = {};
      })
  }
  fnEdit() {
    this.isEdit = true;
  }
  fnCancel() {
    this.isEdit = false;
  }

  fnUpdate() {
    this.serverCall.fnPostReq(
      'users/update-customer',
      this.userDet,
      (res) => {
        if (res.ok == 1 && res.n == 1) {
          this.isEdit=false
          this.shared.setMessage({
            'msg': 'Successfully udpated',
            'clr': 'green'
          })
        }
      },
      (res) => {
        this.shared.setMessage({
          'msg': 'Not updated..try again',
          'clr': 'red'
        })
      }

    )
  }
  ngOnInit() {
  }

}
