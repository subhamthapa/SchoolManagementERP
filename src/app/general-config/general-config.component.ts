import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { WebsiteConfig } from '../config.data-modal';
import { DataService as SocialMediaDataService } from '../website-footer/data-service';
import { FooterData } from '../website-footer/data-model';
import { WebAppConstants } from '../website.constants';
import {
  GeneralConfigAttribute,
  SocialMediaAttributes,
  SetGeneralConfig,
} from './models';
import { Utilities } from '../Utilities';
import { GeneralConfigService } from './service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Grid } from '../utilities/grid';
import { Router, ActivatedRoute } from '@angular/router';

class Data implements WebsiteConfig {
  website_name: string = '';
  platform: string = '';
  navbar_list: [] = [];
  website_theme: string = '';
  navbar_theme: string = '';
  location: any;
}

class SocialMediaData implements FooterData {
  location: any;
  social_media: any[] = [];
}

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.css'],
})
export class GeneralConfigComponent implements OnInit {
  data: Data = new Data();
  deferredData: Data = new Data();
  apiHost = WebAppConstants.api_host;
  grid: Grid = new Grid(2);
  deferredSocialMediaData: FooterData = new SocialMediaData();
  style:any = {
    disabledEditWebsiteName: true,
    disabledWebsiteTheme: true,
    disabledNavbarTheme: true,
    disabledEditSchoolName: true,
    disabledEditAddressLine1: true,
    disabledEditAddressLine2: true,
    disabledEditPinCode: true,
    disabledEditPhoneNo: true,
    disabledEditPhoneNo1: true,
    disabledEditPhoneNo2: true,
    disabledEditEmail: true,
    disabledEditAdditionalInformation: true
  };
  websiteTheme: any[] = [
    { value: 'bg-light', viewValue: 'Light' },
    { value: 'bg-dark', viewValue: 'Dark' },
  ];
  navbarTheme: any[] = [
    { value: 'navbar-light', viewValue: 'Light' },
    { value: 'navbar-dark', viewValue: 'Dark' },
  ];
  socialMedias: any[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'instagram', viewValue: 'Instagram' },
    { value: 'twitter', viewValue: 'Twitter' },
  ];
  flags = {
    addSocialMedia: false,
  };
  deletedSocialMedia: any[] = [];
  selectedSocialMedia: string = '';
  newSocialMediaUrl: string = '';
  loading: boolean = false;
  constructor(
    private configService: ConfigService,
    private socialMediaDataService: SocialMediaDataService,
    private generalService: GeneralConfigService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    localStorage.removeItem('website_configuration');
    var subscription = this.configService.getWebsiteConfigurationData(
      this.data
    );
    if (subscription) {
      subscription.add(() => {
        this.deferredData = Object.create(this.data);
        this.socialMediaDataService.getFooterDataObservable().subscribe(
          (success) => {
            this.deferredData.location = success['location'];
            this.data.location = Object.assign({}, success['location']);
            this.grid.refreshGrid(success['social_media'], { disabled: true });
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      });
    } else {
      this.loading = false;
    }
  }

  close() {
    this.router.navigate(['.'], { relativeTo: this.activeRoute.parent });
  }

  disableAll() {
    this.grid.appyAttributeToAllRows({ disabled: true });
    for(let key in this.style)
    {
      this.style[key] = true
    }
  }

  cancelEdit(key: string) {
    switch (key) {
      case 'website_name':
        this.deferredData.website_name = this.data.website_name;
        break;
      case 'website_theme':
        this.deferredData.website_theme = this.data.website_theme;
        break;
      case 'navbar_theme':
        this.deferredData.navbar_theme = this.data.navbar_theme;
        break;
      case 'school_name':
        this.deferredData.location.school_name = this.data.location.school_name;
        break;
      case 'address_line_1':
        this.deferredData.location.address_line_1 = this.data.location.address_line_1;
        break;
      case 'address_line_2':
        this.deferredData.location.address_line_2 = this.data.location.address_line_2;
        break;
      case 'pin_code':
        this.deferredData.location.pin_code = this.data.location.pin_code;
        break;
      case 'phone_no':
        this.deferredData.location.phone_no = this.data.location.phone_no;
        break;
      case 'phone_no_2':
        this.deferredData.location.phone_no_2 = this.data.location.phone_no_2;
        break;
      case 'phone_no_3':
        this.deferredData.location.phone_no_3 = this.data.location.phone_no_3;
        break;
      case 'email':
        this.deferredData.location.email = this.data.location.email;
        break;
      case 'email':
        this.deferredData.location.email = this.data.location.email;
        break;
      case 'additional_info':
        this.deferredData.location.additional_information = this.data.location.additional_information;
        $('#additional_information').val(this.deferredData.location.additional_information)
        break;

    }
  }
  focusTextArea()
  {
    $(document).ready(() => $('#additional_information').trigger('focus'));
  }
  cancelSocialEdit(column: number, i: number) {
    this.grid.resetDefferedItem(column, i);
  }

  addSocial() {
    this.grid.addIntoGrid({
      id: null,
      url: this.newSocialMediaUrl,
      name: this.selectedSocialMedia,
    });
    this.newSocialMediaUrl = '';
    this.selectedSocialMedia = '';
  }
  cancelAddSocial() {
    this.newSocialMediaUrl = '';
    this.selectedSocialMedia = '';
  }
  deleteSocial(col: number, index: number) {
    this.grid.deleteFromGrid(col, index);
  }
  saveChanges() {
    if (this.deferredData.location.school_name.trim().length == 0)
    {
      this.snackbar.open("School name cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.location.address_line_1.trim().length == 0)
    {
      this.snackbar.open("Address Line 1 cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.location.pin_code.trim().length == 0)
    {
      this.snackbar.open("Pin Code cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.location.phone_no.trim().length == 0)
    {
      this.snackbar.open("Phone No cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.location.email.trim().length == 0)
    {
      this.snackbar.open("Email cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.website_name.trim().length == 0)
    {
      this.snackbar.open("Website name cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.navbar_theme.trim().length == 0)
    {
      this.snackbar.open("Navbar Theme cannot be blank", 'Ok', { duration: 800 });
      return
    }
    if (this.deferredData.website_theme.trim().length == 0)
    {
      this.snackbar.open("Website theme cannot be blank", 'Ok', { duration: 800 });
      return
    }
    var configAttributes: GeneralConfigAttribute = {
      website_name: this.deferredData.website_name,
      navbar_theme: this.deferredData.navbar_theme,
      website_theme: this.deferredData.website_theme,
    };
    var socialMedias: SocialMediaAttributes[] = [];
    var gridData = this.grid.getDefferedColumns();
    for (var col of Object.keys(gridData)) {
      for (var media of gridData[col])
        socialMedias.push({
          id: media.id,
          name: media['name'],
          url: media['url'],
        });
    }
    var location = {
      id: this.deferredData.location.id,
      school_name: this.deferredData.location.school_name,
      address_line_1: this.deferredData.location.address_line_1,
      address_line_2: this.deferredData.location.address_line_2,
      pin_code: this.deferredData.location.pin_code,
      phone_no: this.deferredData.location.phone_no,
      phone_no_2: this.deferredData.location.phone_no_2,
      phone_no_3: this.deferredData.location.phone_no_3,
      email: this.deferredData.location.email,
      additional_information: $("#additional_information").val()
    }
    var generaConfig: SetGeneralConfig = {
      platform: Utilities.getPlatform(),
      social_media: socialMedias,
      attributes: configAttributes,
      deleted_social_media: this.grid.deletedColumns,
      location: location
    };
    this.loading = true;
    this.generalService.setGeneralConfig(generaConfig, this);
  }
  showPopUp(message: string) {
    this.snackbar.open(message, 'Ok', { duration: 800 });
  }

  applySocialMediaChanges() {
    this.grid.applyChanges();
  }
  cancelChanges() {
    $('#additional_information').val(this.data.location.additional_information)
    this.grid.restoreColumns();
  }
}
