import { WebAppConstants } from "../website.constants";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../Utilities';
import { GetWebsiteHomeData } from "./data-model";
import { HomeComponent } from "./home.component";

@Injectable({
    providedIn: 'root'
  })
export class HomeDataService
{
    constructor(private httpClient: HttpClient)
    {}

    private getWebsiteHomeDataObserable()
    {
        return this.httpClient.get<GetWebsiteHomeData>(WebAppConstants.get_website_home_data, 
            { params: {platform: Utilities.getPlatform()}})
    }
    
    public getWebsiteHomeData(view: HomeComponent)
    {
        this.getWebsiteHomeDataObserable().subscribe(success=>
        {
            view.carouselImages = success.carousel_images
            view.imageNotes = success.image_notes
            view.demoImages = success.demo_images
            view.loading = false
        }
        ,
        error=>
        {
            alert(JSON.stringify(error))
            
        })
    }
}
