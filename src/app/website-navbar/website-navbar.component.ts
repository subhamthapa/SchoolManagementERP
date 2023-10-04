import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
  } from '@angular/animations';
import { Utilities } from '../Utilities';

@Component({
  selector: 'app-website-navbar',
  templateUrl: './website-navbar.component.html',
  styleUrls: ['./website-navbar.component.css'],
  animations:[trigger('toggle', [
    state('open', style({
      left: '0px'
    })),
    state('close', style({
      'left': 'calc(100vw/2 * -1)'
    })),
    transition('open => close', [animate('0.2s')]),
    transition('close => open', [animate('0.2s')])
  ])]
})
export class WebsiteNavbarComponent implements OnInit {
  websiteName: string = ""
  navLinks: any[] = []
  navbarBgLg: string = "navbar navbar-expand-sm justify-content-center d-none d-sm-block "
  navbarBgSm: string = "side-nav "
  navbarBg: string = ""
  navbarTheme: string = ""
  showSideNav = false
  homePageUrl = ""
  constructor(private configService: ConfigService) {
    this.homePageUrl =  Utilities.getWebsiteHomePageUrl()
  }

  ngOnInit(): void {
    var config = this.configService.getWebsiteConfiguration(this)
  }

}
