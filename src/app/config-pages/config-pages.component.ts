import { Component, OnInit } from '@angular/core';
import { Grid } from '../utilities/grid';

@Component({
  selector: 'app-config-pages',
  templateUrl: './config-pages.component.html',
  styleUrls: ['./config-pages.component.css']
})
export class ConfigPagesComponent implements OnInit {
  grid : Grid = new Grid(2)
  constructor() { }

  ngOnInit(): void {
    this.grid.addIntoGrid({"page_name": "Home", "icon": "home", "link": "home-page-config"});
    this.grid.addIntoGrid({"page_name": "About", "icon": "dashboard", "link": "home-page-config"});
    this.grid.addIntoGrid({"page_name": "Admission", "icon": "dashboard", "link": "home-page-config"});
  }

}
