import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ServerCallService } from '../../services/server-call.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private shared: SharedService, private serverCall: ServerCallService) { }
  dataObj: any = {};
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uid: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  fnLogin() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.serverCall.fnPostReq(
      'users/login-check',
      { data: this.loginForm.value },
      (res: any) => {
        debugger;
        if (res.length == 0) {
          this.shared.setMessage({
            'msg': 'please check u  r ented uid or pwd',
            'clr': 'red'
          });
        } else {
          let userInfo = res.data[0];
          let token = res.token;
          window.sessionStorage.token = token;
          window.sessionStorage.uid = userInfo.uid;
          window.sessionStorage.setItem('role', userInfo.role);
          window.sessionStorage['id'] = userInfo._id;
          this.router.navigateByUrl('/' + userInfo.role);


        }
      }, (res) => {
        debugger;
      })


  }

}
