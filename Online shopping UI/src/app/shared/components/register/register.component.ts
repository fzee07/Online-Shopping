import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service'
import { ServerCallService } from '../../services/server-call.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() role;
  dataObj: any = {
    'uid': ''
  };
  constructor(public serverCall: ServerCallService, public shared: SharedService) { }

  ngOnInit() {
  }

  fnReg() {
    if (this.role) {
      this.dataObj.role = this.role;
    } else {
      this.dataObj.role = 'customer';
    }
    this.serverCall.fnPostReq(
      window.location.hash == '#/register'?'users/custmer-reg':'users/user-reg',
      { data: this.dataObj },
      (res) => {
        let { insertedCount, ok, n } = res
        if (insertedCount == 1 && ok == 1 && n == 1) {
          this.dataObj = {};
          this.shared.setMessage({
            'msg': 'Registed successfully',
            'clr': 'green'
          })
        }
      },
      (res) => {
        this.shared.setMessage({
          'msg': 'Something wentwrong',
          'clr': 'red'
        })
      })
  }

}
