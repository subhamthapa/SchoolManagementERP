import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebAppConstants } from "../website.constants";
import { Utilities } from "../Utilities";
import { DashboardConfig } from "./data-model";
import { DashboardComponent } from "./dashboard.component";


@Injectable({
    providedIn: 'root'
  })
export class Service
{
    constructor(private httpClient: HttpClient)
    {

    }
    public getDashboardConfigObeservable()
    {
        return this.httpClient.get<DashboardConfig>(WebAppConstants.get_dashboard_config,
            { params: {platform: Utilities.getPlatform()}})
    }
    public getDashboardConfig(view: DashboardComponent)
    {
        this.getDashboardConfigObeservable().subscribe(
            success=>
            {
                view.username = success.username
                if (success.default)
                {
                  view.profilePic = '';
                }
                else
                {
                  view.profilePic = WebAppConstants.api_host + success.profile_picture_sm
                }
            }
            ,
            error=>
            {

            }
        )
    }
}
