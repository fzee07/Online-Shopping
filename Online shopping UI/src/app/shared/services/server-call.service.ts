import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service'
@Injectable({
  providedIn: 'root'
})
export class ServerCallService {
  baseUrl: string = "http://localhost:2020/"
  constructor(private http: HttpClient, private shared: SharedService) { }

  fnGetReq(url, scb, ecb) {
    this.shared.maskSubject.next(true);
    return this.http.get(this.baseUrl + url)
      .subscribe((res) => {
        this.shared.maskSubject.next(false);
        scb(res);
      }, (res) => {
        this.shared.maskSubject.next(false);
        ecb(res);
      })
  }

  fnPostReq(url, data, scb, ecb) {
    this.shared.maskSubject.next(true);
    return this.http.post(this.baseUrl + url, data)
      .subscribe((res) => {
        this.shared.maskSubject.next(false);
        scb(res);
      }, (res) => {
        this.shared.maskSubject.next(false);
        ecb(res);
      })
  }
}
