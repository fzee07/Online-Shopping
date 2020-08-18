import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service'
import { ServerCallService } from '../../shared/services/server-call.service'

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  prodObj: any = {};
  imagePath = '';
  timeStamp = new Date().getTime();
  constructor(private router: Router, private shared: SharedService, private serverCall: ServerCallService) {
    let product = window.sessionStorage.product;

    this.imagePath = this.shared.imagePath;
    if (product) {
      this.prodObj = JSON.parse(product);
    } else {
      this.router.navigateByUrl('customer/home');
    }
  }

  fnPlaceOrder() {
    this.serverCall.fnPostReq(
      'users/place-order',
      { id: window.sessionStorage.id, product: this.prodObj },
      (res) => {
        if (res.ok == 1 && res.n == 1) {
          this.router.navigateByUrl('customer/success')
        }
      },
      (res) => {
        this.shared.setMessage({
          'msg': 'Something went wrong',
          'clr': "red"
        })
      }
    )
  }

  fnAddToCart() {
    this.serverCall.fnPostReq(
      'users/add-to-cart',
      { id: window.sessionStorage.id, product: this.prodObj },
      (res) => {
        if (res.ok == 1 && res.n == 1) {
          this.router.navigateByUrl('customer/cart')
        }
      },
      (res) => {
        this.shared.setMessage({
          'msg': 'Something went wrong',
          'clr': "red"
        })
      }
    )
  }
  ngOnInit() {
  }

}
