import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAppConstants } from '../website.constants';

@Injectable({
  providedIn: 'root'
})
export class BaseWebsiteService {

  constructor(private httpClient: HttpClient) {}

  public createBaseWebsiteUserObservable(data:any)
  {
    return this.httpClient.post(WebAppConstants.createBaseWebsiteUser, data)
  }
  public createProject(data: any)
  {
    return this.httpClient.post(WebAppConstants.addProject, data)
  }
  public getBaseWebsiteUserDetailObservable()
  {
    return this.httpClient.get(WebAppConstants.getBaseWebsiteUserDetail)
  }
  public updateProfilePic(data: any)
  {
    return this.httpClient.post(WebAppConstants.updateBaseWebsiteUserProfilePic, data)
  }
  public updatePassword(data: any)
  {
    return this.httpClient.post(WebAppConstants.updatePassword, data)
  }
}
