import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() products;
  timeStamp=new Date().getTime();
  imagePath='';
  constructor(private shared:SharedService,private router:Router) { 
    this.imagePath=this.shared.imagePath
  }

  ngOnInit() {
  }

  fnClickProduct(prodObj){
    window.sessionStorage.setItem('product',JSON.stringify(prodObj));
    this.router.navigateByUrl('/customer/view-product')
  }

}
