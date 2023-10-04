import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-website-config',
  templateUrl: './website-config.component.html',
  styleUrls: ['./website-config.component.css'],
})
export class WebsiteConfigComponent implements OnInit {
  displayApp = false;
  smallScreen = false;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.smallScreen =
      this.deviceService.isMobile() || this.deviceService.isTablet();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.smallScreen =
      this.deviceService.isMobile() || this.deviceService.isTablet();
  }
}
