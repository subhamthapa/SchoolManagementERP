import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FooterData } from "./data-model";
import { WebAppConstants } from "../website.constants";
import { Utilities } from "../Utilities"; 
import { WebsiteFooterComponent } from "./website-footer.component";

@Injectable({
    providedIn: 'root'
  })
export class DataService
{
    constructor(private httpClient: HttpClient)
    {
       
    }
    public getFooterDataObservable()
    {
        return this.httpClient.get<FooterData>(WebAppConstants.get_website_footer_data, 
            { params: {platform: Utilities.getPlatform()}})
    }

    public getFooterData(view: WebsiteFooterComponent)
    {
        this.getFooterDataObservable().subscribe(success => {
            view.address = success.location
            view.socialMedia = success.social_media
        },
        error=>
        {
            console.log(error)
        })
    }
    private postSubscribeToNewsLetterObservable(emailPhone: string)
    {   
        return this.httpClient.post(WebAppConstants.post_subscribe_to_news_letter, {email_phone: emailPhone, platform: Utilities.getPlatform()})
    }
    public postSubscribeToNewsLetter(emailPhone: string, view: WebsiteFooterComponent)
    {
        this.postSubscribeToNewsLetterObservable(emailPhone).subscribe(
            success => {
                view.isEmailInvalid = false
                view.isSubscriptionSuccess = 1
            }
            ,
            error =>
            {
                view.isSubscriptionSuccess = 2
            }
        )
    }
}