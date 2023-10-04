import { Component } from '@angular/core';
import { SocialService } from '../social.service';
import { ActivatedRoute, Route } from '@angular/router';
import { WebAppConstants } from 'src/app/website.constants';
import { error } from 'jquery';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent {
  static data:any = null
  userData:any = null;
  apiHost = WebAppConstants.api_host;
  constructor(private service: SocialService, private route:ActivatedRoute){}

  ngOnInit()
  {
    this.route.queryParams
      .subscribe(params => {
        if(!AccountInfoComponent.data || AccountInfoComponent.data.username != params['username'])
        {
          this.service.getPersonDetailObservable({username: params['username']}).subscribe(
            success=>{
              this.userData = success
              AccountInfoComponent.data = success
            }
            ,
            error=>
            {

            }
          )
        }
        else
        {
          this.userData = AccountInfoComponent.data
        }
      })
  }
  sendConnectionRequest(username: string)
  {
    this.service.sendConnectionRequest({request_to: username}).subscribe(
      success=>
      {

      }
      ,
      error=>
      {

      }
    )
  }
  cancelReq(username: string)
  {}
}
