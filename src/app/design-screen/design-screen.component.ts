import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-screen',
  templateUrl: './design-screen.component.html',
  styleUrls: ['./design-screen.component.css']
})
export class DesignScreenComponent implements OnInit {
  isExpanded = false
  constructor() { }

  ngOnInit(): void {
  }
  disableRightClick()
  {
    return false
  }
}
