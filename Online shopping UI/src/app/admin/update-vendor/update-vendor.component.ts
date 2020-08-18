import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerCallService } from '../../shared/services/server-call.service';
import { SharedService } from '../../shared/services/shared.service'
@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
  userObj: any = {};
  vid: string = '';
  constructor(private router: Router, private activateRouter: ActivatedRoute, private serverCall: ServerCallService, private shared: SharedService) { }

  ngOnInit() {
    this.activateRouter.paramMap.subscribe((data: any) => {
      debugger;
      this.vid = data.params.id;
      this.serverCall.fnGetReq(
        'users/get-user-det?id=' + this.vid,
        (res) => {
          debugger;
          this.userObj = res;
        },
        () => {
          this.userObj = {};
        }
      )
    })
  }

  fnUpdate() {
    this.serverCall.fnPostReq(
      'users/update-vendor',
      this.userObj,
      (res) => {
        if (res.ok == 1 && res.n == 1) {
          this.shared.setMessage({
            'msg': 'Updated successfully',
            'clr': 'green'
          })
          this.router.navigateByUrl('admin/vendors-list');
        }
      },
      (res) => {

      }
    )
  }

}
