import { WebAppConstants } from "../website.constants";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../Utilities';
import { SetGeneralConfig } from './models'
import { GeneralConfigComponent } from "./general-config.component";
import { config } from "rxjs";
import { FooterData } from '../website-footer/data-model'

interface ConfigReturn
{
  status:  boolean
  social_media: FooterData
}

@Injectable({
    providedIn: 'root'
  })
export class GeneralConfigService
{
    constructor(private httpClient: HttpClient)
    {}

    public setGeneralConfigObservable(data: SetGeneralConfig)
    {
        data.platform = Utilities.getPlatform()
        return this.httpClient.post(WebAppConstants.set_general_config, data)
    }

    public setGeneralConfig(data: SetGeneralConfig, view: GeneralConfigComponent)
    {
        this.setGeneralConfigObservable(data).subscribe(
            success =>
            {
                view.loading = false
                view.disableAll()
                view.showPopUp("Changes saved.")
                view.deletedSocialMedia = []
                view.grid.updateAndApplyIntoGrid((<FooterData>success)["social_media"], {"disabled": true})
            }
            ,
            error =>
            {
                console.log(error)
            })
    }

}
