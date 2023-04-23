import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { About } from "./data-model";
import { WebAppConstants } from "../website.constants";
import { Utilities } from "../Utilities"; 
import {AboutComponent } from "./about.component";

@Injectable({
    providedIn: 'root'
  })
export class DataService
{
    constructor(private httpClient: HttpClient)
    {
       
    }
    private getAboutContentObservable()
    {
        return this.httpClient.get<About>(WebAppConstants.get_about_content, { params: {platform: Utilities.getPlatform()}})
    }
    public getAboutContent(view: AboutComponent)
    {
        this.getAboutContentObservable().subscribe(
            success => {
                view.heading = success.heading
                view.text = success.text
                view.loading = false
            }
            ,
            error =>
            {
                
            }
        )
    }
}