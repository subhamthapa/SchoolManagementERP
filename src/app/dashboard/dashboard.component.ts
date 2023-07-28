import { Component, OnInit } from '@angular/core';
import { Service } from './services';
import { isLoggedIn } from '../auth-service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  showFiller = false;
  username:string = ""
  profilePic: string =""
  isExpanded = false
  constructor(private service: Service, private router: Router) { }

  ngOnInit(): void {
    this.service.getDashboardConfig(this)
    isLoggedIn() ? null : this.router.navigate(['login', {'redirect': encodeURI('dashboard')}])
  }

}
