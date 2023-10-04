import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicAppService } from '../dynamic-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CreateViewComponent } from '../create-view/create-view.component';
import { ErrorHandler } from '../../utilities/error.handler'

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
})
export class DeployComponent {
  public webpageName = '';
  permissions = '';
  url = '';

  public constructor(
    private dynamicAppService: DynamicAppService,
    private snackbar: MatSnackBar,
    private _bottomSheetRef: MatBottomSheetRef<CreateViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    if(data['currentLoadedView'])
    {
      this.url = data['currentLoadedView']['url']
      this.webpageName = data['currentLoadedView']['name']
      this.permissions = data['currentLoadedView']['permission']
    }
  }

  deploy() {
    if(!this.url || !this.permissions || !this.webpageName)
    {
      this.snackbar.open(
        'Please provide all the mandatory fields.',
        'Ok',
        {
          duration: 800,
        }
      );
      return;
    }
    if (this.webpageName && this.webpageName.trim() == '') {
      this.snackbar.open('Please enter webpage name', 'Ok', {
        duration: 800,
      });
      return;
    }
    if (this.permissions && this.permissions.trim() == '') {
      this.snackbar.open(
        'Please choose if the webpage is public or private',
        'Ok',
        {
          duration: 800,
        }
      );
      return;
    }
    if (this.url && this.url.trim() == '') {
      this.snackbar.open('Please enter url', 'Ok', {
        duration: 800,
      });
      return;
    }
    var data: any = {
      "webpage_name":this.webpageName,
      "permissions":this.permissions,
      "url":this.url,
      "json_view": this.data['encoder'].getJsonObject(true)
    }
    if(this.data['currentLoadedView'])
    {
      data["id"] = this.data['currentLoadedView']['id']
    }
    this.dynamicAppService.createJsonViewObservable(data).subscribe(
      success => {
        this._bottomSheetRef.dismiss(success);
      }
      ,
      error =>
      {
        this.snackbar.open(
          ErrorHandler.getErrorTxt(error)
          ,
          'Ok',
          {
            duration: 1000,
          }
        );
      }
    )
    return false;
  }
}
