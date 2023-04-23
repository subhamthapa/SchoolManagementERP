import { WebAppConstants } from "../website.constants";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../Utilities';
import { SetGeneralConfig } from './models'
import { GeneralConfigComponent } from "./general-config.component";
import { config } from "rxjs";


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
        console.log(data)
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
            }
            ,
            error =>
            {
                console.log(error)
            })
    }

}
