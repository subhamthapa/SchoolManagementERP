import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAppConstants } from '../website.constants';
import { Utilities } from '../Utilities';

@Injectable({
  providedIn: 'root'
})
export class DataModelManagerService {

  constructor(private httpClient: HttpClient) { }

  public addDataModelServiceObservable(data: any)
  {
    data["platform"] = Utilities.getPlatform()
    return this.httpClient.post(WebAppConstants.addDataModel, data)
  }
  public getDataModelServiceObservable()
  {
    return this.httpClient.get(WebAppConstants.getDataModels, { params: {platform: Utilities.getPlatform()}})
  }
  public postQueryObservable(data: any)
  {
    data["platform"] = Utilities.getPlatform()
    return this.httpClient.post(WebAppConstants.queryDataModels, data)
  }
}
