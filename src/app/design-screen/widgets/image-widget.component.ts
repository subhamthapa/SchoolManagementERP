import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Directive, ViewContainerRef } from '@angular/core';
import { DynamicAppService } from '../dynamic-app.service';

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class ImageDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'dynamic-image-card-component',
  template: `
    <img
      class="card-img-top"
      [src]="image_base_64"
      [className]="base_class"
      [ngStyle]="default_css"
      alt="Card image"
      *ngIf="image_base_64.length != 0"
      (contextmenu)='contextMenu($event)' [className]="base_class" (click)="signalParent()"
    />
    <div *ngIf="loading">
      <mat-spinner style="left: 40%;margin-top:8%"></mat-spinner>
    </div>
    <div style="padding: 10px;" *ngIf="is_editor_mode">
      <button mat-mini-fab color="primary" (click)="imageInp.click()">
        <mat-icon style="font-size: 20px; vertical-align: center">add</mat-icon>
        <input type="file" #imageInp (change)="openImage($event)" hidden />
      </button>
      &nbsp;
      <button mat-mini-fab color="primary" (click)="reset()">
        <mat-icon style="font-size: 20px; vertical-align: center">refresh</mat-icon>
      </button>
    </div>
    <div class="card-body">
      {{ value }}
      <ng-template subComponent></ng-template>
    </div>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ImageDirective,
    MatProgressSpinnerModule
  ],
  host: {
    '[class]': 'host_class',
  },
})
export class ImageWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes: any = ['editor-component'];
  @ViewChild(ImageDirective, { static: true })
  override root!: ImageDirective;
  image_base_64 = '';
  path = '';
  public static images: any = {};
  remote_object_id = ""
  loading = false

  public constructor(private service: DynamicAppService) {
    super();
    this.widget_name = 'Image';
    this.widget_class = 'img-fluid';
    this.is_container = false;
    this.setDefault();
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef;
  }
  public openImage($event: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.image_base_64 =
        'data:image/png;base64,' + btoa(fileReader.result?.toString() || '');
      ImageWidgetComponent.images[
        this.elementName + '__' + this.uniqueKey
      ] = this.image_base_64;
      this.encodeJsonObject();
      this.owner.signalChanged();
    };
    fileReader.readAsBinaryString($event.target.files[0]);
  }
  public override encodeJsonObject(render = false): void {
    var ret = super.encodeJsonObject(render);
    if (render)
      ret['image_base_64'] =
        ImageWidgetComponent.images[
          this.elementName + '__' + this.uniqueKey
        ] || '';
    ret["remote_object_id"] = this.remote_object_id
    return ret;
  }
  public override decodeJsonObject(jsonObject: any) {
    var ret = super.decodeJsonObject(jsonObject);
    this.remote_object_id = jsonObject['remote_object_id']
    if (jsonObject['remote_object_id'].trim() != "") {
      if (ImageWidgetComponent.images[jsonObject['remote_object_id']]) {
        this.image_base_64 =
          ImageWidgetComponent.images[jsonObject['remote_object_id']];
      } else {
        this.loading = true
        this.service
          .getRemoteImageObject(jsonObject['remote_object_id'])
          .subscribe(
            (success: any) => {
              this.loading = false
              this.image_base_64 = success['image'];
              ImageWidgetComponent.images[jsonObject['remote_object_id']] =
                this.image_base_64;
            },
            (error) => {
              this.loading = false
            }
          );
      }
    }
    else
    {
      this.image_base_64 =
        ImageWidgetComponent.images[
          this.elementName + '__' + this.uniqueKey
        ] || '';
    }
    return ret;
  }
  reset()
  {
    if(this.remote_object_id != "")
      delete ImageWidgetComponent.images['remote_object_id']
    this.image_base_64 = ""
    this.remote_object_id = ""
    ImageWidgetComponent.images[
      this.elementName + '__' + this.uniqueKey
    ] = ""
    this.loading = false
  }
}
