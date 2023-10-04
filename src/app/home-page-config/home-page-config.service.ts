import { Injectable } from '@angular/core';
import { WebAppConstants } from "../website.constants"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilities } from '../Utilities';


@Injectable({
  providedIn: 'root'
})
export class HomePageConfigService {

    constructor(private httpClient: HttpClient){}
    public uploadCarouselImageObservable(data: any)
    {
      data.append("platform", Utilities.getPlatform())
      return this.httpClient.post(WebAppConstants.uploadCarouselImage, data);
    }
    public deleteCarouselImageObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.post(WebAppConstants.deleteCarouselImage, data);
    }
    public saveImageNoteObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.post(WebAppConstants.saveImageNote, data);
    }
    public deleteImageNoteObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.post(WebAppConstants.deleteImageNote, data);
    }
    public addImageNoteObservable(data: FormData)
    {
      data.append("platform", Utilities.getPlatform())
      return this.httpClient.post(WebAppConstants.addImageNote, data);
    }
    public addDemoImageObservable(data: FormData)
    {
      data.append("platform", Utilities.getPlatform())
      return this.httpClient.post(WebAppConstants.addDemoImage, data);
    }
    public deleteDemoImageObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.post(WebAppConstants.deleteDemoImage, data);
    }
    public updateWebsiteHeaderObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.post(WebAppConstants.updateWebsiteHeader, data);
    }
    public updateHomePageConfigObservable(data: any)
    {
      data["platform"] = Utilities.getPlatform()
      return this.httpClient.put(WebAppConstants.updateWebsiteConfig, data);
    }
}


