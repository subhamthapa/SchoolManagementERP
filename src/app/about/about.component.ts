import { Component, OnInit } from '@angular/core';
import { DataService } from './data.services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  heading: string = ""
  text: string = ""
  loading: boolean = false
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.loading = true
    this.dataService.getAboutContent(this)
  }

}
