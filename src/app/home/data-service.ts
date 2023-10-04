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

    public getWebsiteHomeDataObserable()
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
            view.homePageConfig = success.home_page_config
            view.header = success.header
            view.loading = false
            var colors = success.header.background_color.split(",")
            if (colors.length > 1)
            {
              view.backgroundColor = `background-image: linear-gradient(${colors.join(',')})`
            }
            else
            {
              view.backgroundColor = `background-color: ${colors[0]}`

            }
        }
        ,
        error=>
        {
            alert(JSON.stringify(error))

        })
    }
}
