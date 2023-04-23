import { Component, OnInit } from '@angular/core';
import { Service } from './services';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  showFiller = false;
  username:string = ""
  profilePic: string =""
  constructor(private service: Service, private authService:AuthService) { }

  ngOnInit(): void {
    this.service.getDashboardConfig(this)
    this.authService.checkAuthority('dashboard')
  }

}
