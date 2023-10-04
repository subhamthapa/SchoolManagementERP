import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebAppConstants } from './website.constants';
import { WebsiteConfig } from './config.data-modal';
import { Utilities } from './Utilities';
import { WebsiteNavbarComponent } from './website-navbar/website-navbar.component';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient, private titleService:Title) {}

  public getWebsiteConfigurationObserable() {
    return this.httpClient.get<WebsiteConfig>(
      WebAppConstants.get_website_config,
      { params: { platform: Utilities.getPlatform() } }
    );
  }
  public getWebsiteRefreshedObserable(last_refreshed: string) {
    return this.httpClient.get<WebsiteConfig>(
      WebAppConstants.getConfigChangeStatus,
      {
        params: {
          platform: Utilities.getPlatform(),
          last_refreshed: last_refreshed,
        },
      }
    );
  }
  public getWebsiteConfiguration(view: WebsiteNavbarComponent) {
    var cache: any = localStorage.getItem('website_configuration')
    if (!cache || cache['platform'] != Utilities.getPlatform()) {
      try {
        this.getWebsiteConfigurationObserable().subscribe(
          (success: WebsiteConfig) => {
            this.titleService.setTitle(success['website_name'])
            console.log(success);
            localStorage.setItem(
              'website_configuration',
              JSON.stringify(success)
            );
            localStorage.setItem("platform", Utilities.getPlatform())
            view.navLinks = success['navbar_list'];
            view.websiteName = success['website_name'];
            view.navbarBg = success['website_theme'];
            view.navbarTheme = success['navbar_theme'];
          },
          (error) => {
            alert(error);
          }
        );
      } catch (Error) {
        alert(Error);
      }
    } else {
      var config = JSON.parse(
        localStorage.getItem('website_configuration') || '{}'
      );
      this.getWebsiteRefreshedObserable(config['last_refreshed']).subscribe(
        (success) => {
          console.log(success);
        }
      );
      view.websiteName = config['website_name'];
      view.navLinks = config['navbar_list'];
      view.navbarBg = config['website_theme'];
      view.navbarTheme = config['navbar_theme'];
    }
  }
  public getWebsiteConfigurationData(data: WebsiteConfig) {
    if (!localStorage.getItem('website_configuration')) {
      try {
        return this.getWebsiteConfigurationObserable().subscribe(
          (success: WebsiteConfig) => {
            localStorage.setItem(
              'website_configuration',
              JSON.stringify(success)
            );
            data.navbar_list = success['navbar_list'];
            data.website_name = success['website_name'];
            data.website_theme = success['website_theme'];
            data.navbar_theme = success['navbar_theme'];
          },
          (error) => {
            alert(error);
          }
        );
      } catch (Error) {
        alert(Error);
      }
    } else {
      var config = JSON.parse(
        localStorage.getItem('website_configuration') || '{}'
      );
      data.website_name = config['website_name'];
      data.navbar_list = config['navbar_list'];
      data.website_theme = config['website_theme'];
      data.navbar_theme = config['navbar_theme'];
    }
    return null;
  }
  public addDynamicWebpageOnNavbar(data: any) {
    data['platform'] = Utilities.getPlatform();
    return this.httpClient.post(WebAppConstants.addDynamicPageOnNavbar, data);
  }
  public getNavbarPages() {
    return this.httpClient.get<WebsiteConfig>(
      WebAppConstants.getDynamicPageOnNavbar,
      { params: { platform: Utilities.getPlatform() } }
    );
  }
}
