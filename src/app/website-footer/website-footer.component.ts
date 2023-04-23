import { Component, OnInit } from '@angular/core';
import { DataService } from './data-service';
import { WebAppConstants } from '../website.constants';

@Component({
  selector: 'app-website-footer',
  templateUrl: './website-footer.component.html',
  styleUrls: ['./website-footer.component.css']
})
export class WebsiteFooterComponent implements OnInit {
  address: any = {}
  socialMedia: any[] = []
  apiHost: string = WebAppConstants.api_host
  subscribeEmail: string = ""
  isEmailInvalid = false
  isSubscriptionSuccess = 0
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFooterData(this)

  }

  postSubscribeMessage()
  {
    var regEx = "[a-z-A-Z-0-9]*@[a-z-A-Z-0-9]+\.[a-z-A-Z-0-9]+|[0-9]{9,}"
    if(RegExp(regEx).test(this.subscribeEmail))
    {
      this.isEmailInvalid = false
      this.isSubscriptionSuccess = 0
      this.dataService.postSubscribeToNewsLetter(this.subscribeEmail, this)
    }
    else
    {
      this.isEmailInvalid = true
    }

  }

}
