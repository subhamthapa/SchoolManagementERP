import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PlatformModule,
    CommonModule,
    FormsModule
  ],
})
export class FileDialogComponent {
  path = ""
  constructor(private _bottomSheetRef: MatBottomSheetRef)
  {
  }
  save()
  {
    this._bottomSheetRef.dismiss(this.path);
  }
}
