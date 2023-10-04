import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-website-dashboard',
  templateUrl: './base-website-dashboard.component.html',
  styleUrls: ['./base-website-dashboard.component.css']
})
export class BaseWebsiteDashboardComponent {
  isExpanded = false
  hidden = true
  smallScreen = false
  constructor(private authService: AuthService,private router: Router){}

  ngOnInit()
  {
    if(!this.authService.isLoggedIn())
    {
      this.router.navigate(['/login'])
    }
    this.onResize(null)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(window.innerWidth < 768)
    {
      this.smallScreen = true;
    }
    else
    {
      this.smallScreen = false;
    }
  }

}
