import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMenuActive]'
})
export class MenuActiveDirective {

  constructor(private eleRef: ElementRef) {
    debugger;
    window.setTimeout(()=>{
      debugger;
      let path = window.location.hash;
    let _ele=null;
    switch (path) {
      case '#/admin/home':
         _ele=document.querySelector('.menu>a:first-child')
        break;
      case '#/admin/vendor-reg':
          _ele=document.querySelector('.menu>a:nth-child(2)')

        break;
      case '#/admin/vendors-list':
          _ele=document.querySelector('[href="#/admin/vendors-list"]')
        break;
    }
    _ele && _ele.classList.add('menu-active');
    
    },1000);
    this.eleRef.nativeElement.addEventListener('click', (e) => {
      debugger;
      if (e.target.tagName == 'A') {
        let activeEle = document.querySelector('.menu>.menu-active');
        if (activeEle != null) {
          activeEle.classList.remove('menu-active');
        }
        let targetEle = e.target;
        targetEle.classList.add('menu-active');
      }
    })
  }

}
