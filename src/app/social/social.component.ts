import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SocialService } from './social.service';
import { WebAppConstants } from '../website.constants';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  searchKey = ""
  users:any = []
  apiHost = WebAppConstants.api_host;
  connectionRequests:any = []

  constructor(private service:SocialService)
  {
  }
  ngOnInit()
  {
    this.getConnectionRequest();
  }

  getConnectionRequest()
  {
    this.service.getConnectionRequestObservable().subscribe(
      success=>
      {
        this.connectionRequests = success
      }
    )
  }

  search()
  {
    if(this.searchKey.trim() == "")
    {
      this.users = []
      return
    }
    this.service.searchUserObservable({search_key: this.searchKey}).subscribe(
      success=>
      {
        this.users = success
      }
      ,
      error=>
      {

      }
    )
  }
}
