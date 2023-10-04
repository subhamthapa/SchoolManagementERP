import { Component, OnInit } from '@angular/core';
import { Grid } from '../utilities/grid';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ListWebpagesComponent } from './list-webpages/list-webpages.component';
import { DynamicAppService } from '../design-screen/dynamic-app.service';
import { ConfigService } from '../config.service';
import { Utilities } from '../Utilities';

@Component({
  selector: 'app-config-pages',
  templateUrl: './config-pages.component.html',
  styleUrls: ['./config-pages.component.css'],
})
export class ConfigPagesComponent implements OnInit {
  grid: Grid = new Grid(2);
  includeWebpage = false;
  url = '';
  appName = '';
  loading = false;
  listWebpagesRef = {} as MatBottomSheetRef<ListWebpagesComponent>;
  constructor(
    private route: Router,
    private _bottomSheet: MatBottomSheet,
    private dynamicAppService: DynamicAppService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.grid.addIntoGrid({
      page_name: 'Home',
      icon: 'home',
      link: 'home-page-config',
    });
    this.configService.getNavbarPages().subscribe(
      (success:any)=>
      {
        for(let page of success)
        {
          this.grid.addIntoGrid({
            page_name: page['app_name'],
            icon: 'web_asset',
            link: page['url'],
          });
        }
      }
      ,
      error=>
      {

      }
    )
  }

  createWebPage() {
    this.route.navigate([Utilities.getWebsitebaseUrl() + '/design-screen']);
  }
  openWebPagesList() {
    const config: MatBottomSheetConfig = {
      data: {
        service: this.dynamicAppService,
      },
    };
    this.listWebpagesRef = this._bottomSheet.open(
      ListWebpagesComponent,
      config
    );
    this.listWebpagesRef.afterDismissed().subscribe((data) => {
      this.url = data['url'];
      this.appName = data['name'];
    });
  }
  saveDynamicUrl() {
    this.includeWebpage = false;
    this.loading = true;
    var data = {
      url_routing: this.url,
      app_name: this.appName,
    };
    this.configService.addDynamicWebpageOnNavbar(data).subscribe(
      (success: any) => {
        this.grid.addIntoGrid({
          page_name: success['app_name'],
          icon: 'web_asset',
          link: success['url'],
        });
        this.loading = false
      },
      (error) => {this.loading = false}
    );
  }
}
