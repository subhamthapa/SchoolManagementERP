import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BaseWebsiteOverviewComponent } from 'src/app/base-website-overview/base-website-overview.component';
import { BaseWebsiteService } from 'src/app/base-website/base-website.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  projectName = '';
  platform = '';
  isDarkTheme = false;
  errorMessage = '';
  constructor(
    private service: BaseWebsiteService,
    private _bottomSheetRef: MatBottomSheetRef<BaseWebsiteOverviewComponent>
  ) {}
  createProject_() {
    this.errorMessage = '';
    var data = {
      project: this.projectName,
      platform: this.platform,
      dark_theme: this.isDarkTheme,
    };
    this.service.createProject(data).subscribe(
      (success) => {
        this._bottomSheetRef.dismiss(success);
      },
      (error) => {
        if (error.status == 403) {
          this.errorMessage = error.error['error'];
        }
      }
    );
  }
}
