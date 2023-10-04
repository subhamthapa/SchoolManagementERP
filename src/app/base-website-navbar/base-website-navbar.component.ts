import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-website-navbar',
  templateUrl: './base-website-navbar.component.html',
  styleUrls: ['./base-website-navbar.component.css']
})
export class BaseWebsiteNavbarComponent {
  showHeader = true;
  baseNavbarHeight = 350
  isLogin = false;
  showSideNav = false

  constructor(router: Router)
  {
    if (router.url.indexOf('signup') != -1)
    {
      this.showHeader = false;
      this.baseNavbarHeight = 80
    }
    if (router.url.indexOf('login') != -1)
    {
      this.isLogin = true;
    }
  }

}
