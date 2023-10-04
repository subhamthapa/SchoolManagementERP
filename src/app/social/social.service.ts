import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAppConstants } from '../website.constants';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private httpClient: HttpClient) { }

  public searchUserObservable(data: any){
    return this.httpClient.get(WebAppConstants.searchUser, {params: data})
  }
  public getPersonDetailObservable(data: any){
    return this.httpClient.get(WebAppConstants.getPersonDetail, {params: data})
  }
  public sendConnectionRequest(data: any){
    return this.httpClient.post(WebAppConstants.sendConnectionRequest, data)
  }
  public getConnectionRequestObservable(){
    return this.httpClient.get(WebAppConstants.getConnectionRequests)
  }
}
