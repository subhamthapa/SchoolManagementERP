import { Component } from '@angular/core';
import { AccountInfo } from '../account-info.model';
import { BaseWebsiteService } from '../base-website/base-website.service';
import { WebAppConstants } from '../website.constants';
import { AuthService } from '../auth-service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Common } from '../common';
import { FormBuilder } from '@angular/forms';
import { error } from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandler } from '../utilities/error.handler';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  loading = false;
  apiHost = WebAppConstants.api_host;
  userDataInfo: any = null;
  showActions = false;
  firstName = '';
  profilePicUrl = '';
  hideUpload = false;
  formGroupImage: any;
  default = false;
  password1 = ""
  password2 = ""
  currentPassword = ""
  passwordError = false
  passwordLengthError = false
  editPassword = false
  constructor(
    private service: BaseWebsiteService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.formGroupImage = this.formBuilder.group({
      image: [''],
    });
    this.loading = true;
    AccountInfo.getBaseWebsiteInfo(service).subscribe(
      (data: any) => {
        this.loading = false;
        this.userDataInfo = data;
        var splitted = data['user_data']['name'].split(' ');
        this.firstName = splitted[0];
        this.profilePicUrl = this.apiHost + data.profile_picture_lg;
        this.default = this.userDataInfo.default;
      },
      (error) => {
        this.snackbar.open(ErrorHandler.getErrorTxt(error), 'Ok', {
          duration: 1000,
        });
        this.loading = false
      }
    );
  }
  logout() {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Question',
        body: 'Do you want to logout ?',
      },
    });
    dialog.afterClosed().subscribe((event: any) => {
      if (event['flag']) {
        this.authService.logout();
        Common.callSubscriber(Common.subscribeToLogOutEvemt);
        this.router.navigate(['']);
      }
    });
  }
  setProfile($event: any) {
    this.hideUpload = true;
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); // read file as data url
      if (this.default) {
        this.default = false;
      }
      this.formGroupImage.get('image').setValue($event.target.files[0]);
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.profilePicUrl = event.target.result;
      };
    }
  }
  cancelUpload() {
    this.hideUpload = false;
    this.default = this.userDataInfo.default
    this.profilePicUrl = this.apiHost + this.userDataInfo.profile_picture_lg;
  }
  uploadProfilePic() {
    this.loading = true;
    const formData = new FormData();
    formData.append('image', this.formGroupImage.get('image').value);
    this.service.updateProfilePic(formData).subscribe(
      (success: any) => {
        this.default = false;
        this.loading = false;
        this.hideUpload = true;
        this.showActions = false
        this.profilePicUrl = this.apiHost + success.profile_picture_lg;
        this.userDataInfo.profile_picture_lg = success.profile_picture_lg;
        this.userDataInfo.profile_picture_sm = success.profile_picture_sm;
      },
      (error) => {
        this.loading = false;
        this.hideUpload = true;
        this.showActions = false
        this.profilePicUrl =
          this.apiHost + this.userDataInfo.profile_picture_lg;
      }
    );
  }
  changePassword()
  {
    if(this.password1.trim() != this.password2.trim())
    {
      this.passwordError = true
      return
    }
    if(this.password1.trim().length < 6)
    {
      this.passwordLengthError = true
      return
    }
    var data = {
      "password": this.password1.trim(),
      "current_password": this.currentPassword
    }
    this.loading = true
    this.service.updatePassword(data).subscribe(
      success=>
      {
        this.snackbar.open("Password Changed Successfully", 'Ok', {
          duration: 1000,
        });
        this.cancelPasswordChange()
        this.loading = false
      },
      error=>
      {
        this.snackbar.open(ErrorHandler.getErrorTxt(error), 'Ok', {
          duration: 1000,
        });
        this.loading = false
      }
    )
  }
  cancelPasswordChange()
  {
    this.passwordError = false
    this.editPassword = false
    this.passwordLengthError = false
    this.password1 = ""
    this.password2 = ""
    this.currentPassword = ""
  }
}
