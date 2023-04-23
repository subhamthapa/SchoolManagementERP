import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service'
import { WebsiteConfig } from '../config.data-modal';
import { DataService as SocialMediaDataService } from '../website-footer/data-service'
import { FooterData } from '../website-footer/data-model'
import { WebAppConstants } from '../website.constants'
import { GeneralConfigAttribute, SocialMediaAttributes, SetGeneralConfig } from './models'
import { Utilities } from '../Utilities';
import { GeneralConfigService } from './service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';


class Data implements WebsiteConfig
{
    website_name: string = ""
    platform: string = ""
    navbar_list: [] = []
    website_theme: string = ""
    navbar_theme: string = ""
}

class SocialMediaData implements FooterData
{
  location: any
  social_media: any[] = []
}


@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.css']
})

export class GeneralConfigComponent implements OnInit {
  data: Data = new Data
  deferredData: Data = new Data
  apiHost = WebAppConstants.api_host
  socialMediaColumns:any = {
    "one": [],
    "two": []
  }
  deferredSocialMediaColumns:any = {
    "one": [],
    "two": []
  }
  deferredSocialMediaData: FooterData = new SocialMediaData
  style = {
    "disabledEditWebsiteName": true,
    "disabledWebsiteTheme": true,
    "disabledNavbarTheme": true,
  }
  websiteTheme: any[] = [
    {value: 'bg-light', viewValue: 'Light'},
    {value: 'bg-dark', viewValue: 'Dark'},
  ];
  navbarTheme: any[] = [
    {value: 'navbar-light', viewValue: 'Light'},
    {value: 'navbar-dark', viewValue: 'Dark'},
  ];
  socialMedias: any[] = [
    {value: 'facebook', viewValue: 'Facebook'},
    {value: 'instagram', viewValue: 'Instagram'},
    {value: 'twitter', viewValue: 'Twitter'},
  ];
  flags = {
    "addSocialMedia": false
  }
  selectedSocialMedia: string = ""
  newSocialMediaUrl:string = ""
  loading: boolean = false
  constructor(private configService: ConfigService,
    private socialMediaDataService: SocialMediaDataService, private generalService:GeneralConfigService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true
    localStorage.removeItem("website_configuration")
    var subscription = this.configService.getWebsiteConfigurationData(this.data)
    if (subscription)
    {
      subscription.add(()=>{
        this.deferredData = Object.create(this.data)
        this.socialMediaDataService.getFooterDataObservable().subscribe(
          success=>{
            for(var i=0; i < success["social_media"].length; i++)
            {
              if(i%2 == 0)
              {
                success["social_media"][i]["disabled"] = true
                this.socialMediaColumns["one"].push(success["social_media"][i])
              }
              else
              {
                success["social_media"][i]["disabled"] = true
                this.socialMediaColumns["two"].push(success["social_media"][i])
              }
            }
            this.deepCopy(this.deferredSocialMediaColumns, this.socialMediaColumns)
            this.loading = false
          }
          ,
          error=>
          {
            this.loading = false
          }
        )
      })
    }
    else
    {
      this.loading = false
    }
  }
  private deepCopy(object_a: any, object_b:any)
  {
    for(let item of object_b["one"])
      object_a["one"].push(Object.create(item))
    for(let item of object_b["two"])
      object_a["two"].push(Object.create(item))


  }

  disableAll()
  {
    for(var media of this.deferredSocialMediaColumns['one'])
    {
      media.disabled = true
    }
    for(var media of this.deferredSocialMediaColumns['two'])
    {
      media.disabled = true
    }
  }

  cancelEdit(key:string)
  {
    switch(key)
    {
      case "website_name": this.deferredData.website_name = this.data.website_name
        break
      case "website_theme": this.deferredData.website_theme = this.data.website_theme
        break
      case "navbar_theme": this.deferredData.navbar_theme = this.data.navbar_theme
        break
    }
  }
  cancelSocialEdit(column: string, i:number)
  {
    this.deferredSocialMediaColumns[column][i]['url'] = this.socialMediaColumns[column][i]['url']
  }

  addSocial()
  {
    if(this.deferredSocialMediaColumns["one"].length > this.deferredSocialMediaColumns["two"].length)
    {
      this.deferredSocialMediaColumns["two"].push({
        url: this.newSocialMediaUrl,
        name: this.selectedSocialMedia
      })
    }
    else
    {
      this.deferredSocialMediaColumns["one"].push({
        url: this.newSocialMediaUrl,
        name: this.selectedSocialMedia
      })
    }
    this.newSocialMediaUrl = ""
    this.selectedSocialMedia = ""
  }
  cancelAddSocial()
  {
    this.newSocialMediaUrl = ""
    this.selectedSocialMedia = ""
  }
  deleteSocial(col:string, index:number)
  {
    if(col=="one")
    {
      if(this.deferredSocialMediaColumns["one"].length == 1 && this.deferredSocialMediaColumns["two"].length != 0)
      {
        this.deferredSocialMediaColumns["one"].splice(index, 1)
        this.deferredSocialMediaColumns["one"].push(this.deferredSocialMediaColumns["two"][0])
        this.deferredSocialMediaColumns["two"].splice(index, 1)
      }
      else
      {
        this.deferredSocialMediaColumns["one"].splice(index, 1)
      }
    }
    else
    {
      this.deferredSocialMediaColumns["two"].splice(index, 1)
    }
  }
  saveChanges()
  {
    var configAttributes: GeneralConfigAttribute = {
      website_name : this.deferredData.website_name,
      navbar_theme : this.deferredData.navbar_theme,
      website_theme: this.deferredData.website_theme
    }
    var socialMedias: SocialMediaAttributes[] = []
    for(var media of this.deferredSocialMediaColumns['one'])
      socialMedias.push({
        id: media.id,
        name: media['name'],
        url: media['url']
      })
    for(var media of this.deferredSocialMediaColumns['two'])
      socialMedias.push({
        id: media.id,
        name: media['name'],
        url: media['url']
      })
    var generaConfig: SetGeneralConfig = {
      platform: Utilities.getPlatform(),
      social_media: socialMedias,
      attributes: configAttributes
    }
    this.loading = true
    this.generalService.setGeneralConfig(generaConfig, this)
  }
  showPopUp(message: string)
  {
    this.snackbar.open(message, "kjk")
  }

}
