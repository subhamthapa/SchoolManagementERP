import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAppConstants } from '../website.constants';
import { Utilities } from '../Utilities';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(private httpClient: HttpClient) {}

  public getDeployedProjects() {
    return this.httpClient.get(WebAppConstants.getProjects);
  }
}
