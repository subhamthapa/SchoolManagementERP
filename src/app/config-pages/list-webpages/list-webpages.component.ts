import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { error } from 'jquery';
import { ConfigPagesComponent } from '../config-pages.component';

@Component({
  selector: 'app-list-webpages',
  templateUrl: './list-webpages.component.html',
  styleUrls: ['./list-webpages.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatListModule, MatIconModule],
})
export class ListWebpagesComponent {
  urls: any = [];
  loading: boolean = false;
  public constructor(private _bottomSheetRef: MatBottomSheetRef<ConfigPagesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
  ngOnInit() {
    this.loading = true;
    this.data['service'].getJsonViews().subscribe(
      (success: any) => {
        this.loading = false;
        this.urls = success;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }
  setUrl(url: any)
  {
    this._bottomSheetRef.dismiss(url);
  }
}
