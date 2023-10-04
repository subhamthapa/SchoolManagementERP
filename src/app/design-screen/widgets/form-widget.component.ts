import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { hasToken } from 'src/app/auth-service';

import { Directive, ViewContainerRef } from '@angular/core';
import { DynamicAppService } from '../dynamic-app.service';

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class FromDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'dynamic-form-component',
  template: `<form #dynamicForm
    [className]="base_class"
    (click)="signalParent()"
    (contextmenu)="contextMenu(dynamicForm)"
    [ngStyle]="default_css"
    [style]="customStyle"
    (submit)="submitForm($event)"
  >
    <ng-template subComponent></ng-template>
    <button mat-raised-button color="primary">Submit</button>&nbsp;
    <button mat-raised-button color="accent">Clear</button>
  </form>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, FromDirective, MatButtonModule],
  host: {
    '[class]': 'host_class',
  },
})
export class FormWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes: any = ['editor-component'];
  @ViewChild(FromDirective, { static: true }) override root!: FromDirective;

  remote_object_id = '';

  formData = []

  override attributes = {
    Center: {
      type: 'boolean',
      value: false,
    },
  };
  public constructor(private service: DynamicAppService) {
    super();
    this.widget_name = 'Form';
    this.widget_class = '';
    this.is_container = true;
    this.other_editor_class = ' form-div ';
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
    switch (event) {
      case 'Center':
        if (
          object.customAttributes &&
          object.customAttributes['Center']['value']
        ) {
          this.classList.push('center');
        } else {
          delete this.classList[this.classList.indexOf('center')];
        }
        this.setClass();
        break;
    }
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef;
  }

  createFormData(node: any, data: any)
  {
    node = node.constructor.name == 'ComponentRef' ? node.instance : node
    if (node.is_input_type)
    {
      node.getValue(data)
      return
    }
    for(let child of node.children)
    {
      this.createFormData(child, data)
    }
  }
  public submitForm($event: any) {
    if(this.is_editor_mode)
    {
      return false;
    }
    var formData:any = {}
    this.createFormData(this, formData)
    var data = {
      id: this.remote_object_id,
      data: formData,
      loggedIn: hasToken()
    }
    this.service.postFormData(data).subscribe(
      success =>
      {

      }
      ,
      error =>
      {

      }
    )
    return false;
  }
  public override encodeJsonObject(render = false): void {
    var ret = super.encodeJsonObject(render);
    ret['remote_object_id'] = this.remote_object_id;
    return ret;
  }

  public override decodeJsonObject(jsonObject: any, idMapping: any) {
    var ret = super.decodeJsonObject(jsonObject, idMapping);
    this.remote_object_id = jsonObject['remote_object_id'];
    return ret;
  }
}
