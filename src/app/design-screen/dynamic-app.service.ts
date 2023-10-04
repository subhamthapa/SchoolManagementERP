import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilities } from '../Utilities';
import { WebAppConstants } from '../website.constants';

@Injectable({
  providedIn: 'root'
})
export class DynamicAppService {

  constructor(private httpClient: HttpClient) { }

  public createJsonViewObservable(data: any)
  {
    data["platform"] = Utilities.getPlatform()
    return this.httpClient.post(WebAppConstants.addJsonView, data)
  }
  public getJsonViews()
  {
    return this.httpClient.get(WebAppConstants.getJsonView, { params: {platform: Utilities.getPlatform()}})
  }
  public getJsonViewUsingUrl(url: string)
  {
    return this.httpClient.get(WebAppConstants.getJsonViewUsingUrl, { params: {platform: Utilities.getPlatform(),
    url: url}})
  }
  public getRemoteImageObject(remoteObjectId: string)
  {
    return this.httpClient.get(WebAppConstants.getRemoteImageObject, { params: {platform: Utilities.getPlatform(),
    remote_object_id: remoteObjectId}})
  }
  public purgeJsonView(id: number)
  {
    var data ={
      platform:  Utilities.getPlatform(),
      id: id
    }
    return this.httpClient.post(WebAppConstants.purgeJsonView, data)
  }
  public postFormData(data: any)
  {
    data["platform"] = Utilities.getPlatform()
    return this.httpClient.post(WebAppConstants.postFormData, data)
  }
}
