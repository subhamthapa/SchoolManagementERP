import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-website',
  templateUrl: './base-website.component.html',
  styleUrls: ['./base-website.component.css']
})
export class BaseWebsiteComponent {
  constructor(private titleService:Title, private authService:AuthService,private router:Router) {
    this.titleService.setTitle("No Pen and Paper");
  }
  ngOnInit()
  {
    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['/dashboard']);
    }
  }
}
