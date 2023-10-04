import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CreateProjectComponent } from '../baseWebsiteOverview/create-project/create-project.component';
import { OverviewService } from './overview.service';

@Component({
  selector: 'app-base-website-overview',
  templateUrl: './base-website-overview.component.html',
  styleUrls: ['./base-website-overview.component.css']
})
export class BaseWebsiteOverviewComponent {
  createProjectRef = {} as MatBottomSheetRef<CreateProjectComponent>;
  projects:any = []
  constructor(private _bottomSheet: MatBottomSheet, private overviewService: OverviewService) {}

  createProject() {
    this._bottomSheet.open(CreateProjectComponent).afterDismissed().subscribe(
      data=>
      {
        if (!data) return;
        this.projects.push(data)
      }
    );
  }
  ngOnInit()
  {
    this.overviewService.getDeployedProjects().subscribe(
      success=>
      {
        this.projects = success
      }
      ,
      error=>
      {

      }
    )
  }
}
