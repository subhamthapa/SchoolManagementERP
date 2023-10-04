import { Component, OnInit } from '@angular/core';
import { HomeDataService } from './data-service';
import { GetWebsiteHomeData } from './data-model';
import { WebAppConstants } from '../website.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiHost = WebAppConstants.api_host
  carouselImages: any[] = []
  imageNotes: any[] = []
  demoImages: any[] = []
  header : any = {}
  homePageConfig: any = {}
  loading: boolean = false
  backgroundColor = ""
  constructor(private dataServce: HomeDataService) { }

  ngOnInit(): void {
    this.loading = true
    this.dataServce.getWebsiteHomeData(this)
  }

}
