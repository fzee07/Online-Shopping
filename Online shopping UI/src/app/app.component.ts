import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { Router, NavigationEnd } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isShow: boolean = false;
  isShowMask: boolean = false;
  showMsgTimeout: any;
  msg: string = '';
  clr: string = '';
  title = 'osui';
  ngAfterViewInit() {

  }
  constructor(private shared: SharedService, private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let uid=window.sessionStorage.uid;
        let role=window.sessionStorage.getItem('role');
        let path=event.url;
        if(uid && (path == '/login' || path == '/'|| path == '/register'  )){
          this.router.navigateByUrl(role);
        }
        if(path != '/login' && path != '/'&& path != '/register'){
        if(!uid){
          this.router.navigateByUrl('/login');
        }
        let urlArr=path.split('/');
        if(role != urlArr[1]){
          this.router.navigateByUrl(role);
        }
      }
    }
    });
    this.shared.msgSubject && this.shared.msgSubject.subscribe((data: any) => {
      this.isShow = true;
      this.msg = data.msg;
      this.clr = data.clr;
      this.showMsgTimeout = window.setTimeout(() => {
        this.isShow = false;
      }, 10000)
    })
    this.shared.maskSubject.subscribe((data: any) => {
      this.isShowMask = data;
    })

  }

  fnCloseMsg() {
    this.isShow = false;
    clearTimeout(this.showMsgTimeout);
  }
}
